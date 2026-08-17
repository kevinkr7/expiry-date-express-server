const productDao = require('../dao/productDao');

const productService = {
    addProduct: async (userId, productData) => {
        return await productDao.createProduct({
            userId,
            ...productData
        });
    },

    getProducts: async (userId, searchParams) => {
        const { page = 1, limit = 20, search, expiryWithinMonths } = searchParams;
        const skip = (page - 1) * limit;
        
        const filter = {};
        
        // Handle search by title or UPC
        if (search) {
            // Using a simple $or for title regex and exact UPC match
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { upc: search }
            ];
        }

        // Handle expiry date filter
        if (expiryWithinMonths) {
            const months = parseInt(expiryWithinMonths, 10);
            if (!isNaN(months)) {
                const targetDate = new Date();
                targetDate.setMonth(targetDate.getMonth() + months);
                filter.expiryDate = { $lte: targetDate };
            }
        }

        const { products, totalCount } = await productDao.getProducts(userId, filter, skip, Number(limit));
        
        return {
            products,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: Number(page),
                limit: Number(limit)
            }
        };
    },

    updateProduct: async (productId, userId, updateData) => {
        const product = await productDao.updateProduct(productId, userId, updateData);
        if (!product) {
            const error = new Error('Product not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }
        return product;
    },

    deleteProduct: async (productId, userId) => {
        const product = await productDao.deleteProduct(productId, userId);
        if (!product) {
            const error = new Error('Product not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }
        return product;
    }
};

module.exports = productService;
