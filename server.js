const express = require('express');
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get('/', (req, res) => res.send('api running'));

app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));

//dependencies not installed correctly - brcrypt instead of bcrypt js 
//reinstall the dependencies 
//npm run server = run server, ctrl C = close server. nodemon is the watcher for the dev server

//imports
//initialise app
//connect database
//?
//mount json parser 
//mount routes
//get a port for the web server to listen to