const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        // check for all fields
        const { name, description, quantity, user_id } = fields;

        if (!name || !description || !quantity || !user_id  ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);
        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.product);
};


exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        let product = req.product;
        product = _.extend(product, fields);

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.getProducts = (req, res) => {
  const products = Product.find()
    .select("_id name description ")
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => console.log(err));
};