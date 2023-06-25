const express = require('express');
const router = express.Router();
const querystring = require('querystring')
const crypto = require('crypto');
const transactionModel = require('../models/transaction');

router.post('/pay', (req, res) => {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var tmnCode = 'Y5AMLPS3'; // Thay bằng tmnCode của bạn
    var secretKey = 'OANIEFEOBOWSAVEWFIHVIZPFFTOPLJRB'; // Thay bằng secretKey của bạn
    var url = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'http://localhost:3000/';

    const date = new Date();

    var createDate = date.getFullYear().toString().substr(2, 2) + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + 'T' + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);

    const orderId = ('order' + createDate + '.' + Math.random().toString().substr(2, 2)).toUpperCase();
    const amount = req.body.amount;
    const orderInfo = 'Thanh toán đơn hàng';


    var secureHash = secretKey + 'vnp_Amount=' + amount * 100 + 
    '&vnp_Command=pay' + '&vnp_CreateDate=' + createDate + 
    '&vnp_CurrCode=VND' + '&vnp_IpAddr=' + ipAddr.split(',')[0] +
     '&vnp_Locale=vn' + '&vnp_OrderInfo=' + orderInfo + 
     '&vnp_OrderType=10' + '&vnp_ReturnUrl=' + returnUrl + 
     '&vnp_TmnCode=' + tmnCode + '&vnp_TxnRef=' + orderId + 
     '&vnp_Version=2.1.0';
    secureHash = crypto.createHash('sha256').update(secureHash, 'utf8').digest('hex');

    var querystring = require('querystring');
    var query = querystring.stringify({
        'vnp_Amount': amount * 100,
        'vnp_Command': 'pay',
        'vnp_CreateDate': createDate,
        'vnp_CurrCode': 'VND',
        'vnp_IpAddr': ipAddr.split(',')[0],
        'vnp_Locale': 'vn',
        'vnp_OrderInfo': orderInfo,
        'vnp_OrderType': '10',
        'vnp_ReturnUrl': returnUrl,
        'vnp_TmnCode': tmnCode,
        'vnp_TxnRef': orderId,
        'vnp_Version': '2.1.0',
        'vnp_SecureHashType': 'SHA256',
        'vnp_SecureHash': secureHash
    });

    var paymentUrl = url + '?' + query;
    console.log(paymentUrl);
    res.status(200).json({url: paymentUrl});
});
function sortObject(o) {
  var sorted = {}, key, a = [];

  for (key in o) {
      if (o.hasOwnProperty(key)) {
          a.push(key);
      }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
  }
  return sorted;
}


// router.post('/pay', function (req, res, next) {

//     const vnp_TmnCode = 'Y5AMLPS3';
//     const vnp_HashSecret = 'OANIEFEOBOWSAVEWFIHVIZPFFTOPLJRB';
//     const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
//     const returnUrl = 'http://localhost:3000/vnpay_return'; // URL người dùng sẽ được đưa đến sau khi hoàn thành giao dịch

//     const date = new Date();
//     const orderId = 'node' + date.getTime(); // ID đơn hàng, cần là duy nhất cho mỗi giao dịch
//     const amount = req.body.amount; // Số tiền cần thanh toán, đơn vị là VND
//     const orderInfo = req.body.orderInfo; // Thông tin về đơn hàng
//     const orderType = 'billpayment'; // Loại hình giao dịch
//     const locale = 'vn'; // Ngôn ngữ của trang thanh toán
//     const currCode = 'VND'; // Mã tiền tệ

//     let vnp_Params = {};
//     vnp_Params['vnp_Version'] = '2.0.0';
//     vnp_Params['vnp_Command'] = 'pay';
//     vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
//     vnp_Params['vnp_Locale'] = locale;
//     vnp_Params['vnp_CurrCode'] = currCode;
//     vnp_Params['vnp_TxnRef'] = orderId;
//     vnp_Params['vnp_OrderInfo'] = orderInfo;
//     vnp_Params['vnp_OrderType'] = orderType;
//     vnp_Params['vnp_Amount'] = amount * 100;
//     vnp_Params['vnp_ReturnUrl'] = returnUrl;
//     vnp_Params['vnp_IpAddr'] = req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

//     // Sắp xếp dữ liệu theo key
//     vnp_Params = sortObject(vnp_Params);

//     // Tạo chuỗi dữ liệu và mã hóa SHA256
//     const signData = vnp_HashSecret + querystring.stringify(vnp_Params, { encode: false });
//     const secureHash = crypto.createHash('sha256').update(signData).digest('hex');

//     // Thêm dữ liệu mã hóa vào danh sách request
//     vnp_Params['vnp_SecureHashType'] = 'SHA256';
//     vnp_Params['vnp_SecureHash'] = secureHash;

//     // Chuyển hướng người dùng đến VNPay
//     res.redirect(vnp_Url + '?' + querystring.stringify(vnp_Params));
// });

// 

router.get('/create_payment_url', function(req, res, next) {
    
  var ipAddr = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  var tmnCode = 'Y5AMLPS3'; // Thay bằng tmnCode của bạn
  var secretKey = 'OANIEFEOBOWSAVEWFIHVIZPFFTOPLJRB'; // Thay bằng secretKey của bạn
  var vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = 'http://localhost:3000/vnpay_return';
  
  var date = new Date();
  const dateFormat = require('dateformat');
  var createDate = dateFormat(date, 'yyyymmddHHmmss');
  var orderId = dateFormat(date, 'HHmmss');
  var amount = '10000';
  var bankCode = 'NCB';
  
  var secureHash = secretKey + tmnCode + amount + orderId + returnUrl + createDate;
  
  secureHash = crypto.createHash('sha256').update(secureHash).digest('hex');
  
  var querystring = require('querystring');
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang phong ngu';
  vnp_Params['vnp_OrderType'] = 'billpayment';
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_BankCode'] = bankCode;
  vnp_Params['vnp_SecureHashType'] = 'SHA256';
  vnp_Params['vnp_SecureHash'] = secureHash;
  
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
  
//   res.status(200).json({ code: '00', data: vnpUrl })

    // Lưu giao dịch
    const transaction = new transactionModel({
        orderId,
        amount,
        transactionStatus: 'pending',
        transactionDate: date,
      });
      transaction.save(function(err) {
        if (err) return next(err);
        res.status(200).json({ code: '00', data: vnpUrl });
      });
});


router.get('/vnpay_return', function(req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
  
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
  
    vnp_Params = sortObject(vnp_Params);
  
    var secretKey = 'OANIEFEOBOWSAVEWFIHVIZPFFTOPLJRB'; // Thay bằng secretKey của bạn
    var tmnCode = 'Y5AMLPS3'; // Thay bằng tmnCode của bạn
  
    var signData = secretKey + querystring.stringify(vnp_Params);
  
    var checkSum = crypto.createHash('sha256').update(signData).digest('hex');
  
    if (secureHash === checkSum) {
      // Cập nhật trạng thái giao dịch
      transactionModel.findOneAndUpdate(
        { orderId: vnp_Params['vnp_TxnRef'] },
        { 
          transactionStatus: 'successful', 
          responseCode: vnp_Params['vnp_ResponseCode'] 
        },
        function(err) {
          if (err) return next(err);
          res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
        }
      );
    } else {
      transactionModel.findOneAndUpdate(
        { orderId: vnp_Params['vnp_TxnRef'] },
        { 
          transactionStatus: 'failed', 
          responseCode: vnp_Params['vnp_ResponseCode'] 
        },
        function(err) {
          if (err) return next(err);
          res.render('error', { code: '97' });
        }
      );
    }
  });







// router.get('/vnpay_return', function(req, res, next) {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params['vnp_SecureHash'];
  
//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];
    
//     vnp_Params = sortObject(vnp_Params);
  
//     var secretKey = 'OANIEFEOBOWSAVEWFIHVIZPFFTOPLJRB'; // Thay bằng secretKey của bạn
//     var tmnCode = 'Y5AMLPS3'; // Thay bằng tmnCode của bạn
  
//     var signData = secretKey + querystring.stringify(vnp_Params, { encode: true });
    
//     var checkSum = crypto.createHash('sha256').update(signData).digest('hex');
    
//     if(secureHash === checkSum){
//       // Xử lý khi thanh toán thành công
//       // Lưu lại & Kiểm tra tình trạng thanh toán trong database
//       res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
//     } else {
//       res.render('error', { code: '97' })
//     }
    
//   if (secureHash === checkSum) {
//     // Cập nhật trạng thái giao dịch
//     transactionModel.findOneAndUpdate(
//       { orderId: vnp_Params['vnp_TxnRef'] },
//       { 
//         transactionStatus: 'successful', 
//         responseCode: vnp_Params['vnp_ResponseCode'] 
//       },
//       function(err) {
//         if (err) return next(err);
//         res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
//       }
//     );
//   } else {
//     transactionModel.findOneAndUpdate(
//       { orderId: vnp_Params['vnp_TxnRef'] },
//       { 
//         transactionStatus: 'failed', 
//         responseCode: vnp_Params['vnp_ResponseCode'] 
//       },
//       function(err) {
//         if (err) return next(err);
//         res.render('error', { code: '97' });
//       }
//     );
//   }
//   });

module.exports = router;