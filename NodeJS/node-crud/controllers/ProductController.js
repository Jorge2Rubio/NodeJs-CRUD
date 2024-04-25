const Product = require('../models/Product');

const productController = {};


//list employees, arrow func
productController.list = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("../views/product/index", { products });
    }catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Interval server error");
    }
};


//show employees
productController.show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            
            return res.status(404).send("Product not found");
            
        }

        res.render("../views/product/show", { product });
    }catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Interval server error");
    }
};

productController.create = (req, res) => {
    res.render("../views/product/create");
};

productController.save = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            updated_at: Date.now() // Set updated_at to current timestamp
        });
        await product.save();
        console.log("Successfully created an product.");
        res.redirect("/products/show/" + product._id);
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(error => error.message);
            return res.status(400).render("../views/product/create", { errors: validationErrors });
        }
        res.status(500).send("Internal server error");
    }
};

productController.edit = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send("Product not found");
        }
        res.render("../views/product/edit", { product });
    }catch (err){
        console.log("Error: ", err);
        res.status(500).send("Internal Server Error");
    }
};

productController.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/products/show/" + product._id);
    } catch (err) {
        console.error(err);
        res.status(400).render("../views/product/edit", { product: req.body, error: "Failed to update product: " + err.message });
    }
};

productController.delete = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).send("Product not found");
        }

        console.log("Product deleted!");
        res.redirect("/products");
    }catch (err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = productController;