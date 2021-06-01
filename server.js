const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const knex = require('knex')
const cors = require('cors');

const register=require('./controllers/register')
const signin=require('./controllers/signin')
const profile=require('./controllers/profile')
const image=require('./controllers/image')
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart-brain'
  }
});



const app=express()

app.use(express.json());
app.use(cors())



app.get('/',(req,res)=>{
	res.send(db.select('*').from('users'));
})

app.post('/signin',(req,res)=>{ signin.handlesignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{ register.handleregister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{ profile.handleprofile(req,res,db)})

app.put('/image',(req,res)=>{ image.handleimage(req,res,db)})

app.post('/imageurl',(req,res)=>{ image.handleapi(req,res)})



// Load hash from your password DB.



app.listen(3000,()=>{
	console.log('app is running on port 3000');
});

/*
/-->res=this is working
/signin-->POST=success/fail
/register-->POST=user
/profile/:userId-->GET = user
/image-->PUT-->user

*/