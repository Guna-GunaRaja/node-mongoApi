const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModels');

// db connection
const db = mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', (err, db)=>{
  if(err){
    console.log(err)
  }
  console.log('mongoose connected');
}); 

// app initialization

const app = express();
app.use(express.json());

// paginate, select, search api

app.get('/', (req, res) =>{
  res.send('Working')
});

app.get('/users', async (req, res) => {

  const {users = false, page = 1, limit = 5, keys = false} = req.query;
  const search = req.query.search
  const sendUsers = User.find();
  const searchResult = await User.find({name: {$regex: RegExp('^'+search+'.*', 'i')}}).exec()

  limitedUsers = await sendUsers.limit(limit * 1).skip((page-1)*limit)
  obj = limitedUsers[0]

  allKeys = [];
  for (i in obj){
    allKeys.push(i)
  }
  
  try{
    if(users){
      res.status(200).json({Total: limitedUsers.length, limitedUsers})
    } 
    if (search !== undefined){
      res.status(200).json({Total: searchResult.length, 'Search Results': searchResult})
    }
    if (keys){
        res.status(200).json({'All Keys': allKeys})
    }
    if(!users && search === undefined && !keys){
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
  }


})


app.listen(3001, console.log('Server started'));
