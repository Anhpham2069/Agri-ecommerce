const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/pay', (req, res) => {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const tmnCode = 'WNJ22JR2'; 
    const secretKey = 'GWPHAMJZIIGPAFWAOJBKNFMNDROOUZMX';
    const url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3000/order/return'; // URL to return to after successful payment

    const date = new Date();

    var createDate = date.getFullYear().toString().substr(2, 2) + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + 'T' + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);

    const orderId = ('order' + createDate + '.' + Math.random().toString().substr(2, 2)).toUpperCase();
    const amount = req.body.amount;
    const orderInfo = 'Thanh toán đơn hàng';

    var secureHash = secretKey + 'vnp_Amount=' + amount * 100 * 100 + '&vnp_Command=pay' + '&vnp_CreateDate=' + createDate + '&vnp_CurrCode=VND' + '&vnp_IpAddr=' + ipAddr.split(',')[0] + '&vnp_Locale=vn' + '&vnp_OrderInfo=' + orderInfo + '&vnp_OrderType=200000' + '&vnp_ReturnUrl=' + returnUrl + '&vnp_TmnCode=' + tmnCode + '&vnp_TxnRef=' + orderId + '&vnp_Version=2.0.0';
    secureHash = crypto.createHash('sha256').update(secureHash, 'utf8').digest('hex');

    var querystring = require('querystring');
    var query = querystring.stringify({
        'vnp_Amount': amount * 100 * 100,
        'vnp_Command': 'pay',
        'vnp_CreateDate': createDate,
        'vnp_CurrCode': 'VND',
        'vnp_IpAddr': ipAddr.split(',')[0],
        'vnp_Locale': 'vn',
        'vnp_OrderInfo': orderInfo,
        'vnp_OrderType': '200000',
        'vnp_ReturnUrl': returnUrl,
        'vnp_TmnCode': tmnCode,
        'vnp_TxnRef': orderId,
        'vnp_Version': '2.0.0',
        'vnp_SecureHashType': 'SHA256',
        'vnp_SecureHash': secureHash
    });

    var paymentUrl = url + '?' + query;
    console.log(paymentUrl);
    res.status(200).json({url: paymentUrl});
});

module.exports = router;