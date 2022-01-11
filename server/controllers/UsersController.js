const User = require('../models/User');
const bcrypt = require("bcrypt");

async function index(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json({ message: error });
    }
  }

  async function store(request, response) {
      User.findOne({
        email: request.body.email
      }).then(user => {
        if (user) {
           return response.status(400).json({
             email: 'Email already exist'
           });
        }
        else{
          const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            post: request.body.post,
            password: request.body.password
          });
          
          try {
           bcrypt.genSalt(10, (err, salt) => {
             if (err) {
               console.error('there was in error', err);
             } else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) {
                    console.error('there was in error', err);
                  }else{
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                      return response.status(200).send(user);
                    })
                  }
                })
             }
           });
          } catch (error) {
            response.status(400).send(error);
          }
        }
      })
  }

  async function edit(request, response) {
    try {
      const user = await User.findById(request.params.id);
      response.json(user);
    } catch (error) {
      response.json({message: error});
    }

  }
 
  async function update(request, response) {
    try {
      const user = {
        name: request.body.name,
        email: request.body.email,
        post: request.body.post
      };
  
      const updatedProduct = await User.findByIdAndUpdate(
        { _id: request.params.id },
        user
      );
       response.json(updatedProduct);
    } catch (error) {
       response.status(400).json({message: error});
    }

  }
  
  async function destroy(request, response) {
    
    try {
       const user = await User.findByIdAndRemove(request.params.id);
       response.json(user);
    } catch (error) {
      response.status(400).json({message: error})
    }

    
  }

  module.exports = {
    index,
    store,
    edit,
    update,
    destroy
  }
  