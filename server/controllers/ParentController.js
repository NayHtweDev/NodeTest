const Parent = require('../models/parent');
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

const getParentData = () => {
    const jsonData = fs.readFileSync('./data/parents.json')
    // console.log("SSS"+jsonData);
    if(jsonData != ''){
        return JSON.parse(jsonData)
    }
    return [];
}

const saveParentData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('./data/parents.json', stringifyData)
}
module.exports = {

    async getParentProduct(req, res) {
        const parents = await getParentData();
        res.send({
            data : parents,
        })
    },

    async addParentProduct(req, res){
        
        const id = Math.random().toString();
        const title = req.body.title;
        const parent = new Parent(id, title);
        
        const existParents = await getParentData();

        //append the user data
        existParents.push(parent)

        //save the new user data
        const parent_data = await saveParentData(existParents)

        res.send({success: true, msg: 'Parent Product data added successfully'})
    },

    async getEditParentProduct(req, res){

        const existParents = await getParentData();
        const parentId = req.params.parentId;
        const parent = existParents.find( p => p.id === parentId )
        
        res.send({
            success: true,
            data : parent,
        })
    },

    async postEditParentProduct(req, res){

        const userData = req.body;
        const existParents = await getParentData();
      
        const findExist = existParents.find( p => p.id === userData.id )
        // console.log(findExist);

        const id = findExist.id;
        const title = userData.title;
        

        const updatedProduct = new Parent(
                id,
                title
        );

        updatedProduct.save();

        res.send({
            success: true,
            data : updatedProduct,
        })
    },

    async postDeleteParentProduct(req, res){

        const userData = req.body;
        // const existParents = await getParentData();
      
        // const findExist = existParents.find( p => p.id === userData.id )
        Parent.deleteById(userData.id);
        res.send({
            success: true,
            message : "Deleted Sucessfully",
        }) 

    }
}