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

router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var config = require('config');
    var dateFormat = require('dateformat');

    
    var tmnCode = config.get('vnp_TmnCode');
    var secretKey = config.get('vnp_HashSecret');
    var vnpUrl = config.get('vnp_Url');
    var returnUrl = config.get('vnp_ReturnUrl');

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});


module.exports = router;