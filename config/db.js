const mongoose =require('mongoose');
const config=require('config');
const db=config.get('mongoURI');
mongoose.connect(db)