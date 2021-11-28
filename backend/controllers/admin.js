const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  req.user.createProduct(
    { 
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    category: category
  })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/add-product');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({where:{id:prodId}})
 .then( products => {
    if (!products[0]) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: products[0]
    });
  });
};


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
   product.title= updatedTitle,
   product.imageUrl= updatedImageUrl,
   product.description= updatedDesc,
   product.price= updatedPrice
   return product.save()
  }).then(result=>{console.log(`updated product`);
  res.redirect('/admin/products');})
 .catch(err=>{console.log(err)})
  
  
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  }).catch(err=>console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 Product.findByPk(prodId).then(product => {
   product.destroy();
 }).then(()=>{
  res.redirect('/admin/products');
 }).catch((err)=>console.log(err))
  
};
