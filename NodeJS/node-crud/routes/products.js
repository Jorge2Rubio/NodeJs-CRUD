// Require Express and create a router
const express = require('express');
const router = express.Router();

// Require the Employee controller
const productController = require("../controllers/ProductController.js");

// Define routes for CRUD operations

// Get all employees
router.get('/', productController.list);

// Get single employee by id
router.get('/show/:id', productController.show);

// Create employee
router.get('/create', productController.create);

// Save employee
router.post('/save', productController.save);

// Edit employee
router.get('/edit/:id', productController.edit);

// Update employee
router.post('/update/:id', productController.update);

// Delete employee
router.post('/delete/:id', productController.delete);

// Export router as a module
module.exports = router;