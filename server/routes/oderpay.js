const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post('/createOrder', async (req, res)  =>  {
    // req.body should contain all the necessary information
    let { allProduct, user, amount, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: "Order created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
});
router.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching the order.' });
        });
});

router.put('/order/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedOrder => {
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the order.' });
        });
});

router.delete('/order/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(() => res.json({ message: 'Order successfully deleted' }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the order.' });
        });
});


module.exports = router;