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

export const editCategory = async (oId, status) => {
  let data = { oId: oId, status: status };
  console.log(data);
  try {
    let res = await axios.post(`${apiURL}/api/order/update-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};



export const getProvince = () => new Promise(async (resolve,reject)=>{
  try {
    const response = await axios({
      method: "get",
      url: "https://vapi.vnappmob.com/api/province/",
    })
    resolve(response)
  } catch (error) {
    reject(error);
  }
})

export const getProvinceDistrict = (provinceId) => new Promise(async (resolve,reject)=>{
  try {
    const response = await axios({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
    })
    resolve(response)
  } catch (error) {
    reject(error);
  }
})
export const getProvinceWard = (districtId) => new Promise(async (resolve,reject)=>{
  try {
    const response = await axios({
      method: "get",
      url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
    })
    resolve(response)
  } catch (error) {
    reject(error);
  }
})

