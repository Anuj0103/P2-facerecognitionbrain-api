<<<<<<< HEAD
const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json('Wrong inputs..');
  }
  else {
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {

      trx.insert({
        hash: hash,
        email: email
      })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
      .catch(err => res.status(400).json('Unable to register...'))
  }
}
module.exports = {
  handleRegister: handleRegister,
};
=======
const handleregister=(req,res,db,bcrypt)=>{
	const {email,name,password}=req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission');
	}
	const hash=bcrypt.hashSync(password);
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email

		})
		.into('login')
		.returning('email')
		.then(loginemail=>{
			return trx('users')
			.returning('*')
			.insert({
				email:loginemail[0],
				name:name,
				joined:new Date()
			}).then(user=>{
				res.json(user[0]);
			})
			
			})
		.then(trx.commit)
		.catch(trx.rollback)
		})
	   .catch(err=>res.status(400).json('uanble to register'))
}
module.exports={
	handleregister:handleregister
};
>>>>>>> 3ad872ada3426b0de35fefd26cc160de3abb5ab4
