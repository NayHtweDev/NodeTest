const Product = require('../models/product');
const fs = require('fs');
const { json } = require('body-parser');
const isAuth = require('../middleware/is-auth');


const getUserData = () => {
    const jsonData = fs.readFileSync('./data/users.json')
    // console.log("SSS"+jsonData);
    if(jsonData != ''){
        return JSON.parse(jsonData)
    }
    return [];
}



const getProductData = () => {
    const jsonData = fs.readFileSync('./data/products.json')
    // console.log("SSS"+jsonData);
    if(jsonData != ''){
        return JSON.parse(jsonData)
    }
    return [];
}

const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('./data/products.json', stringifyData)
}


module.exports = {

    async getProduct(req, res) {
        const products = await getProductData();
        res.send({
            data : products,
        })
    },




    async addProduct(req, res){
        
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
        
          const id = Math.random().toString();
          const title = req.body.title;
          const imageUrl = "http://localhost:3000/uploads/" +req.file.originalname;
          const price = req.body.price;
          const description = req.body.description;
          const parent_id = req.body.parent_id;
          const product = new Product(id, title, imageUrl, description, price, parent_id);
          
          const existProducts = await getProductData();

          //append the user data
          existProducts.push(product)
  
          //save the new user data
          const parent_data = await saveProductData(existProducts)

        res.send({success: true, msg: 'Product data added successfully'})

    },



    async getEditProduct(req, res){
        
        const existParents = await getProductData();
        const parentId = req.params.parentId;
        const product = existParents.find( p => p.id === parentId )
        
        res.send({
            success: true,
            data : product,
        })
    },

    async postEditProduct(req, res){

        const userData = req.body;
        const existProducts = await getProductData();
      
        const findExist = existProducts.find( p => p.id === userData.id )
        console.log(findExist);
        
        if(req.file == undefined){
            const image = findExist.imageUrl;
            const id = findExist.id;
            const title = userData.title;
            const imageUrl = image;
            const price = userData.price;
            const description = userData.description;
            const parent_id = userData.parent_id;
        
        
            const updatedProduct = new Product(
                id,
                title,
                imageUrl,
                description,
                price,
                parent_id
            );
            updatedProduct.save();

            res.send({
                success: true,
                data : updatedProduct,
            })
        }else{

        const image = "http://localhost:3000/uploads/" +req.file.originalname;
        
        const id = findExist.id;
        const title = userData.title;
        const imageUrl = image;
        const price = userData.price;
        const description = userData.description;
        const parent_id = userData.parent_id;
        
        
        const updatedProduct = new Product(
            id,
            title,
            imageUrl,
            description,
            price,
            parent_id
        );

        updatedProduct.save();

        res.send({
            success: true,
            data : updatedProduct,
        })
    }
    },

    async postDeleteProduct(req, res){

        const userData = req.body;
        
        Product.deleteById(userData.id);
        res.send({
            success: true,
            message : "Deleted Sucessfully",
        }) 

    }
}