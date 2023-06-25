const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  transactionStatus: String, // 'pending', 'successful', 'failed'
  transactionDate: Date,
  responseCode: String,
});

const transactionModel = mongoose.model('transaction', transactionSchema);

module.exports = transactionModel;
