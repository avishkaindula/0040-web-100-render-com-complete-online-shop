const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    // params. is an object containing parameter values parsed from the URL path.
    // For example if you have the route /user/:name , then the "name" from the URL path wil be available as req.params.name
    // I think this req.params.id is something we extract from href on product-item.ejs
    // <a class="btn btn-alt" href="/admin/products/<%= product.id %>">View & Edit</a>
    // In admin.routes.js the URL of the route is set as router.get("/products/:id", adminController.getUpdateProduct);
    // As the request for that route is sent through the href we created on product-item.ejs file,
    // the value of /:id will be replaced by /<%= product.id %> of that href="/admin/products/<%= product.id %>
    // So the value of /<%= product.id %> will be assigned to /:id
    // So req.params.id will extract the id of <%= product.id %> as it's value.

    // console.log(req.params);
    // result => { id: '63871ef86bd907f36cd3fc99' }
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  // res.redirect("/admin/products");
  // as we're sending a Ajax request, we cannot redirect like this.
  // because redirecting like this will lead to a page reload and we
  // don't wanna do that. Instead we need to send a request in .json format.
  res.json({ message: "Deleted product!" });
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
