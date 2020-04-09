const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route 	GET api/profile/me
//@desc 	single auth user profile
//@access	 private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']); //populate == sql joins

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' }); //json uses object
    }

    res.json(profile);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);

    res.status(500).send('server error');
  }
});

//@route 	GET api/profile
//@desc 	create or update profile
//@access	 private

router.post(
  '/',
  [
    auth, // executes them together?
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //validates
    const errors = validationResult(req); //why not req.body?
    if (!errors.isEmpty()) {
      //why noy if(errors) to check if not empty?
      return res.status(400).json({ errors: errors.array() });
    }

    //
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
      //education is separate
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id; //checks if the field exists
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (skills) profileFields.skills = skills; //.split(',').map(skill => skill.trim());
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    //console.log(profileFields.skills);
    //res.send('hello');

    profileFields.social = {}; //no const here because profileFields already declared
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    //console.log(profileFields.social.youtube);
    //res.send('hello');

    try {
      //updates
      let profile = await Profile.findOne({ user: req.user.id }); //instance of single entry //because Profile references User:_id
      //console.log(profile);
      if (profile) {
        //not empty
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        // console.log('api', profile);
        return res.json(profile);
      }

      //creates
      profile = new Profile(profileFields);
      await profile.save(); //saves the instance
      //console.log(profile);
      return res.json(profile);
    } catch (error) {
      // console.log(JSON.stringify(error));
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route 	GET api/profile
//@desc 	all profiles
//@access	 public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route 	GET api/profile/user/:user_id
//@desc 	GET profiles by user id
//@access	 public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }) //req.params => /:id in
      .populate('user', ['name', 'avatar']);

    //console.log(profile);

    if (!profile) return res.status(400).json({ msg: 'profile not found' });

    res.json(profile);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      //prevents this from going into server error
      return res.status(400).json({ msg: 'profile not found' });
    }

    return res.status(500).send('server error');
  }
});

//@route 	DELETE api/profile
//@desc 	DELETE user profile post
//@access	 private

router.delete('/:_id', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id }); //findOneAndDelete
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    //remove user posts
    await Post.deleteMany({ user: req.user.id });
    res.json('user removed'); //what happens if you pass a string to json instead of object fields
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message); //is error.message automatically generated?
    res.send('server error');
  }
});

//@route 	UPDATE api/profile/experience
//@desc 	update experience
//@access	 private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'start date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //how come can chain together?
    }

    const {
      //field
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      //new entry
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id }); //from token

      profile.experience.unshift(newExp); //experience is an array in Profile//unshift adds to the 1st entry

      await profile.save();
      //console.log(profile.experience);

      return res.json(profile);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.error(error.message);
      res.send('server error');
    }
  }
);

//@route 	DELETE api/profile/experience/:id
//@desc 	DELETE experience
//@access	 private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }); //findOneAndDelete

    //console.log(profile);

    const removeIndex = profile.experience
      .map(experience => experience.id) //returns an array with the mongoose id//why is it simply .id and not _id
      .indexOf(req.params.exp_id); //chain can also means work on the same object // labels the array items position
    // console.log(profile.experience.map(experience => experience.id));

    // console.log(removeIndex);

    profile.experience.splice(removeIndex, 1); //args: [position],[how many to remove], [how many to add]

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message); //is error.message automatically generated?
    res.send('server error');
  }
});

//@route 	UPDATE api/profile/education
//@desc 	update education
//@access	 private

router.put(
  '/education',
  [
    auth,
    [
      check('fieldofstudy', 'field of study is required')
        .not()
        .isEmpty(),
      check('school', 'school is required')
        .not()
        .isEmpty(),
      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('from', 'start date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      //field
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      //assign new fields
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id }); //from token
      profile.education.unshift(newEdu); //experience is an array//unshift adds to the 1st entry

      await profile.save();
      //console.log(profile.experience);
      return res.json(profile);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.error(error.message);
      res.send('server error');
    }
  }
);

//@route 	DELETE api/profile/education/:id
//@desc 	DELETE education
//@access	 private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }); //findOneAndDelete

    //console.log(profile);

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.exp_id); //maps user id into array item id//can chain method to map?

    // console.log(removeIndex);

    profile.education.splice(removeIndex, 1); //(position,how many to remove, how many to add)

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    res.send('server error');
  }
});

//@route 	GET api/profile/github/:username
//@desc 	GET github repos
//@access	 public
router.get('/github/:username', (req, res) => {
  try {
    console.log('api responded');
    //request within a request? middle ware?
    //const githubClientId = config.get('githubClientId');
    //const githubSecret = config.get('githubSecret');
    const option = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(option, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode != 200) {
        return res.status(404).json({ msg: 'no github profile found' });
      }
      res.json(JSON.parse(body));
    });
    // console.log(option.uri);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    res.send('server error');
  }
});

module.exports = router;

//split is not a function
//console log on browser, res.data.skills is already an array
