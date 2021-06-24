const Product = require('../models/product');

const ProductDao = {
    getProductsAsPerDomain : productDomain => {
        return Product.find(productDomain);
    },
    getProduct : productObj => {
        return Product.findOne(productObj);
    },    
    saveProduct : productObj => {
        const newProduct = new Product(productObj);
        return newProduct.save();
    },
    deleteProduct : productObj => {
        return Product.findOneAndDelete(productObj);
    },
    updateProduct : productObj => {
        return productObj.save();
    }
};

module.exports = ProductDao;