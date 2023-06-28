import React from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Button, Space } from 'antd';

const apiURL = process.env.REACT_APP_API_URL;
const CheckoutSuccess = () => {
    const history = useHistory()

    
    const vnpayReturn = async () => {
        try {
          const response = await axios.get(`${apiURL}/api/vnpay/vnpay_return`);
          const code = response.data.code;
          console.log(response)
          // Xử lý code trả về từ API vnpay_return
          // Ví dụ: hiển thị thông báo thành công hoặc thất bại
          if (code === '00') {
            alert('Thanh toán thành công');
          } else {
            alert('Thanh toán thất bại');
          }
        } catch (error) {
          console.error('Lỗi khi gọi API vnpay_return:', error);
        }
      };
      const handleContiniueShopping  = async () =>{
        await vnpayReturn()

        history.push('/')
      }


  return (
    <div className='checkoutSuccess-contaienr'>
    <p>
        Thanh toán thành công đơn hàng

    </p>
        <Space wrap>
        
            <Button onClick={handleContiniueShopping} size='large'>Tiếp tục mua sắm</Button>
    
        </Space>
    </div>
  )
}
export default CheckoutSuccess

