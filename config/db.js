const mongoose = require('mongoose');
const config = require('../node_modules/config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDBConnected...');
    //console.log(db);
  } catch (err) {
    console.log(JSON.stringify(err));
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

//pass in the default variable = database url to connect
//pass in options to get rid of deprecation warnings
//https://mongoosejs.com/docs/deprecations.html
//try catch connection error
//node.process.exit
//nodemon keeps crashing
