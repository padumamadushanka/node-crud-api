const express = require("express");
const router = express.Router();

const {
    create,productById,read,remove,update,getProducts
} = require("../controllers/product");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.get("/products/all", getProducts);
router.post('/product/create/:userId', create);
router.delete(
    "/product/:productId",
    remove
);
router.put(
    "/product/:productId",
    update
);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;