const { validationResult } = require('express-validator');
const authService = require('../services/authService');

const authController = {
    register: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = request.body;
            const user = await authService.register(name, email, password);
            return response.status(201).json({
                message: 'User registered successfully',
                user,
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    },

    login: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = request.body;
            const { token, user } = await authService.login(email, password);

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            return response.status(200).json({
                message: 'User authenticated',
                user,
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return response.status(statusCode).json({ message: error.message });
        }
    },

    logout: (request, response) => {
        // Clear the JWT cookie by setting the same options used during login
        // and expiring it immediately (maxAge: 0 / expires in the past)
        response.clearCookie('jwtToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return response.status(200).json({ message: 'Logged out successfully' });
    },
};

module.exports = authController;
