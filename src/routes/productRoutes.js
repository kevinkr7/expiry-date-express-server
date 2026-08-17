const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ─── Middleware ───────────────────────────────────────────────────────────────
// Protect all routes in this router
router.use(authMiddleware);

// ─── Validators ───────────────────────────────────────────────────────────────
const addProductValidators = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isNumeric().withMessage('Amount must be a number').optional(),
    body('expiryDate').isISO8601().withMessage('A valid expiry date is required')
];

const updateProductValidators = [
    body('title').trim().notEmpty().withMessage('Title is required').optional(),
    body('amount').isNumeric().withMessage('Amount must be a number').optional(),
    body('expiryDate').isISO8601().withMessage('A valid expiry date is required').optional()
];

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - expiryDate
 *             properties:
 *               upc:
 *                 type: string
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Product added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', addProductValidators, productController.addProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products (Dashboard)
 *     description: Retrieve products with pagination, search, and filtering.
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 20)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or UPC
 *       - in: query
 *         name: expiryWithinMonths
 *         schema:
 *           type: integer
 *         description: Filter products expiring within X months
 *     responses:
 *       200:
 *         description: List of products and pagination metadata
 *       401:
 *         description: Unauthorized
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               upc:
 *                 type: string
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found or unauthorized
 */
router.put('/:id', updateProductValidators, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found or unauthorized
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
