const { validationResult } = require('express-validator');
const productService = require('../services/productService');

const productController = {
    addProduct: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userId = request.user._id;
            const product = await productService.addProduct(userId, request.body);
            return response.status(201).json({
                message: 'Product added successfully',
                product
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    },

    getProducts: async (request, response) => {
        try {
            const userId = request.user._id;
            const result = await productService.getProducts(userId, request.query);
            return response.status(200).json(result);
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    },

    updateProduct: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const userId = request.user._id;
            const productId = request.params.id;
            const product = await productService.updateProduct(productId, userId, request.body);
            return response.status(200).json({
                message: 'Product updated successfully',
                product
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    },

    deleteProduct: async (request, response) => {
        try {
            const userId = request.user._id;
            const productId = request.params.id;
            await productService.deleteProduct(productId, userId);
            return response.status(200).json({
                message: 'Product deleted successfully'
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    }
};

module.exports = productController;
