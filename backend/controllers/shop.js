const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json({products})
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
  .getCart()
  .then(cart=>{
   return cart
   .getProducts()
   .then(products => {
     res.status(200).json({
       success: true,
       products:products
     })
    // res.render('shop/cart', {
    //   path: '/cart',
    //   pageTitle: 'Your Cart',
    //   products: products
    // });
   })
  }).catch(err => res.status(500).send.json({success:false, message:err}))
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
      
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity=1
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart
    return cart.getProducts({where: { id: prodId}})
  }).then(products => {
   let product;
   
  
   if (product) {
     let oldQuantity = product.cartItem.quantity
     newQuantity=oldQuantity +1
     return product
   }
  
   return Product.findByPk(prodId)
   
  
  }).then(product=>{
    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
  })
  .then(()=>res.status(200).json({success:true,message:'succesfully added the product'}))
  
  .catch(err => {res.status(500).json({success:false,message:`err occured`})})
};




exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id: prodId}})
  }).then(products=>{
    const product=products[0]
    return product.cartItem.destroy()
  }).then(()=>{
    res.redirect('/cart');
  })
  .catch(err => {console.log(err);})
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
