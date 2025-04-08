const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    
    lowercase: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true, 
  }, 
  productPrice: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    required: true
  }
})



const OrderModel = new mongoose.model('selledItems', UserSchema);
module.exports = OrderModel;