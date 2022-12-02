const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.get("/products/:id", adminController.getUpdateProduct);
// :id will give a dynamic routes for different products.

router.post("/products/:id", imageUploadMiddleware, adminController.updateProduct);
// We're not deleting old images when replacing them with new ones while updating products.
// Instead we keep those old image files to. Keeping those image files might be helpful in the future.
// Even if we uploaded the same image we uploaded before, that image will be assigned a new name and stored
// separately without replacing the old one.

router.delete("/products/:id", adminController.deleteProduct)
// delete, patch, put are available via Ajax / JS-driven Http requests.
// So here, instead of submitting a form when deleting, we can handle it via 
// front-end JavaScript code and send a Ajax request and then manually update the dom.
// after we got a success response.

module.exports = router;
