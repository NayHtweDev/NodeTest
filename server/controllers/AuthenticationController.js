const User = require('../models/user');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { json } = require('body-parser');

const getUserData = () => {
    const jsonData = fs.readFileSync('./data/users.json')
    // console.log("SSS"+jsonData);
    if(jsonData != ''){
        return JSON.parse(jsonData)
    }
    return [];
}

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('./data/users.json', stringifyData)
}

module.exports = {
    
    async register(req, res) {

        //get the existing user data
        const existUsers = await getUserData();
        
        //get the new user data from post request
        const userData = req.body;

        userData.id = Math.random().toString();
        
        //check if the userData fields are missing
        if (userData.name == null || userData.phone == null || userData.password == null) {
            return res.status(401).send({error: true, msg: 'User data missing'})
        }
    
        //check if the username exist already
        const findExist = existUsers.find( user => user.name === userData.name )
        if (findExist) {
            return res.status(409).send({error: true, msg: 'username already exist'})
        }
        
        var bcrypt_password = bcrypt.hashSync(userData.password,10);
        userData.password = bcrypt_password;

        var buf = crypto.randomInt(100000, 999999);
        var token = buf.toString();
        userData.token = token;

        
        //append the user data
        existUsers.push(userData)

        //save the new user data
        const user = await saveUserData(existUsers)
        
        res.send({success: true, msg: 'User data added successfully',data: userData})

    },

    async login(req, res){

        const existUsers = await getUserData();
        console.log(existUsers);

        const userData = req.body;

        const findExist = existUsers.find( user => user.email === userData.email )
        console.log(findExist);
        
        if (!findExist) {
            return res.status(403).send({
                error: 'Incorrect login information.'
            })
        }

        const passwordCheck = bcrypt.compareSync(userData.password, findExist.password);
        
        if (!passwordCheck) {
            return res.status(403).send({
                error: 'Incorrect Password information.'
            })
        }

        const check_token = existUsers.find(user => user.token == null);

        if(check_token){
            var buf = crypto.randomInt(100000, 999999);
            
            const id = findExist.id;
            const name = findExist.name;
            const password = findExist.password;
            const phone = findExist.phone;
            const email = findExist.email;
            const token = buf.toString();

            const updatedProduct = new User(
            id,
            name,
            phone,
            email,
            password,
            token
            );

            updatedProduct.save();

            res.send({
                success: true,
                msg: 'Login successfully',
                data : updatedProduct,
            })
        }



        res.send({
            success: true,
            msg: 'Login successfully',
            data : findExist,
        })
    },

    async logout(req, res){

        const userData = req.body;
        const existUsers = await getUserData();
        // console.log(existUsers);

        const findExist = existUsers.find( user => user.id === userData.id )
        // console.log(findExist);

        const id = findExist.id;
        const name = findExist.name;
        const password = findExist.password;
        const phone = findExist.phone;
        const email = findExist.email;
        const token = null;

        const updatedProduct = new User(
        id,
        name,
        phone,
        email,
        password,
        token
        );

        updatedProduct.save();

        res.send({
            success: true,
            msg: 'Logout successfully',
        })
    }
}