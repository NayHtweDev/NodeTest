const express = require('express');

const path = require('path');

const router = express.Router();

const ParentController = require("../controllers/ParentController");

const isAuth = require('../middleware/is-auth');


//Parent product
router.get('/api/parent-products', ParentController.getParentProduct);

router.post('/api/add-parent-products', isAuth, ParentController.addParentProduct);

router.get('/api/edit-parent-product/:parentId', isAuth, ParentController.getEditParentProduct);

router.post('/api/edit-parent-product', isAuth, ParentController.postEditParentProduct);

router.post('/api/delete-parent-product', isAuth, ParentController.postDeleteParentProduct);

module.exports = router;