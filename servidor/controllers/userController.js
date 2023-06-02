const jwt = require('jsonwebtoken');

const User = require("../models/User");
const config = require('../config/global');

exports.crearUsuario = async (req, res) => {

    try {
        
        const { username, email, password } = req.body;
        const user = new User(
            {
               username,
               email,
               password
            } 
         );

        
        user.password = await user.encryptPassword(user.password)
        await user.save();

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        //res.json({message: 'Received'})
        res.json({auth: true, token})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password)
}