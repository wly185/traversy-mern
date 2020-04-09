const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//@route 	POST api/post
//@desc 	create a post
//@access	private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); //express-validator
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //instantiates an array//json format
    }
    try {
      const user = await User.findById(req.user.id).select('-password'); //mongoose

      const newPost = new Post({
        text: req.body.text, //from the input
        name: user.name, //user is from the database //the user id is from the token
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save(); //always remember to save

      res.json(post); //res.json means the client side can render

      //console.log(post);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.error(error.message); //error prototype object
      res.status(500).send('server error');
    }
  }
);

//@route 	GET api/post
//@desc 	get all posts
//@access	private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find() //mongoose // == find all entries in the model
      .sort({ date: -1 }); //javascript array prototype method
    res.json(posts);
    // console.log('api responded');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route 	GET api/post/:id
//@desc 	GET post by ID
//@access	private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.json(post);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'profile not found' });
    }
    res.status(500).send('server error');
  }
});

//@route 	DELETE api/post/:id
//@desc 	DELETE post by ID
//@access	private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //express req.params object. :id == id

    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorised' });
    }
    await post.remove();
    res.json({ msg: 'post removed' });
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    res.status(500).send('server error');
  }
});

//@route 	PUT api/post/like/:id
//@desc  like a post
//@access	private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() == req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    res.send('server error');
  }
});

//@route 	PUT api/post/like/:id
//@desc  unlike a post
//@access	private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      (post.likes.filter(
        like => like.user.toString() == req.user.id
      ).length = 0)
    ) {
      return res.status(400).json({ msg: 'post has not yet been liked' });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    res.send('server error');
  }
});

//@route 	POST api/post/comment
//@desc 	create a comment
//@access	private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); //express-validator
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);
      //console.log(user);
      //console.log(post);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);

      //console.log(post);
    } catch (error) {
      console.log(JSON.stringify(error));
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route 	DELETE api/post/comment/:id/:comment_id
//@desc 	DELETE comment by ID
//@access	private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //console.log(req.params.id);

    const comment = post.comments.find(
      comment => comment.id == req.params.comment_id
    );

    // console.log(comment.id);
    //console.log(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ msg: 'comment not found' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorised' });
    }
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'comment not found' });
    }
    res.status(500).send('server error');
  }
});

module.exports = router;
