const User = require('../models/user');
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

module.exports = (req, res, next) => {
    
    const userData = req.body;
   
    if(!userData.token){
        
        return res.send({
            error: 'Auth Failed'
        })
    }
    
    const existUsers =  getUserData();

    const check_token = existUsers.find(user => user.token == userData.token);

    if (!check_token) {
        return res.send({
            error: 'Auth Failed'
        });
    }
    next();
}