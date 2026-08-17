const Product = require('../models/product');

const productDao = {
    createProduct: async (productData) => {
        const product = new Product(productData);
        return await product.save();
    },

    getProducts: async (userId, filter = {}, skip = 0, limit = 20) => {
        // Build the query object
        const query = { userId, ...filter };
        
        const products = await Product.find(query)
            .sort({ expiryDate: 1 }) // Closest expiry dates first
            .skip(skip)
            .limit(limit);
        
        const totalCount = await Product.countDocuments(query);
        
        return { products, totalCount };
    },

    updateProduct: async (productId, userId, updateData) => {
        return await Product.findOneAndUpdate(
            { _id: productId, userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
    },

    deleteProduct: async (productId, userId) => {
        return await Product.findOneAndDelete({ _id: productId, userId });
    }
};

module.exports = productDao;
