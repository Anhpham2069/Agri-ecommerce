import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;



export const createOrder = async ({orderData}) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const vnpayOrder = async ({data}) => {
  try {
    let res = await axios.post(`${apiURL}/api/vnpay/create_payment_url`,data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

