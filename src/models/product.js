const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    upc: { 
        type: String, 
        required: false,
        trim: true
    },
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    amount: { 
        type: Number, 
        required: true, 
        default: 1,
        min: 0
    },
    expiryDate: { 
        type: Date, 
        required: true 
    }
}, { timestamps: true });

// Indexes to support Dashboard use-cases
productSchema.index({ userId: 1, expiryDate: 1 }); // For Dashboard sorting/filtering
productSchema.index({ userId: 1, upc: 1 }); // For scanning/searching by UPC
productSchema.index({ userId: 1, title: 'text' }); // Text search index for title

module.exports = mongoose.model('Product', productSchema);
