import React, { Fragment, useEffect, useContext, useState,useRef} from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity,totalCost,clearCart } from "../partials/Mixins";
import axios from "axios"
import { cartListProduct } from "../partials/FetchApi";
import { fetchData } from "./Action";
import { vnpayOrder,editCategory,getProvince,getProvinceDistrict,getProvinceWard } from "./FetchApi"; 
import { Alert, Space } from 'antd';
import { message } from 'antd';
import { Skeleton } from 'antd';
import "./style.css"

const apiURL = process.env.REACT_APP_API_URL;


const isValidPhoneNumber = (phoneNumber) => {
  const phonePattern = /^0[0-9]{9}$/;
  return phonePattern.test(phoneNumber);
};

export const CheckoutComponent = ({options}) => {
  const inputRef = useRef();
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);


  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [status,setStatus] = "Đã thanh toán"


const [provinces, setProvinces] = useState([]);
const [province, setProvince] = useState();
const [districts, setDistricts] = useState();
const [district, setDistrict] = useState();
const [wards, setWards] = useState();
const [ward, setWard] = useState();
const [submittedValues, setSubmittedValues] = useState(null);
const [phoneError, setPhoneError] = useState('');

const handlePhoneChange = (e) => {
  const value = e.target.value;
  setPhone(value);

  // Kiểm tra định dạng số điện thoại
  if (!isValidPhoneNumber(value)) {
    setPhoneError('Số điện thoại không hợp lệ');
  } else {
    setPhoneError('');
  }
};
const handleSubmitAdress = (event) => {
  event.preventDefault();
  if(!province){
    message.warning("vui lòng điền tỉnh/thảnh thố của bạn")
  }else if(!district){
    message.warning("vui lòng điền huyện của bạn")
  }else if(!addressDetail){
    message.warning("vui lòng điền địa chỉ chi tiết")
  }
  else{
    setAddress(
     addressDetail +","+
      districts?.find(i=>i.district_id===district)?.district_name+","+ 
      provinces?.find(i=>i.province_id===province)?.province_name,
    );
  }
};
  // const [isLoading,setIsLoading]  = useState(false)
  console.log(address)
  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
  });
  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const costValue = totalCost();
  const qtyyy = () => {
    let product = 0;
    let carts = JSON.parse(localStorage.getItem("cart"));
    console.log(carts)
    carts.forEach((item) => {
        product = item.quantitiy;
    });
    return product;
  };

  useEffect(()=>{

    const fetchDataProvince = async ()=>{
      let response = await getProvince()
      if(response.status===200){
        setProvinces(response?.data.results)
      }
    }
    fetchDataProvince()
  },[])
  useEffect(()=>{

    const fetchProvinceDistrict = async ()=>{
      let response = await getProvinceDistrict(province)
      if(response.status===200){
        setDistricts(response?.data.results)
      }
    }
     province && fetchProvinceDistrict(province)
  },[province])

  useEffect(()=>{
    const fetchProvinceWard = async ()=>{
      let response = await getProvinceWard(district)
      console.log(response)
      if(response.status===200){
        setWards(response?.data.results)
      }
    }
     district && fetchProvinceWard(district)
  },[district])

console.log(wards)

  const handleSubmit = async (event) => {
    if(!address){
      message.warning("vui lòng điền địa chỉ của bạn")
    }else if(!phone){
      message.warning("vui lòng điền số điện thoại của bạn")
    }else{

      event.preventDefault();
      const order = {
        allProduct: data.cartProduct.map(item => ({ id: item._id, quantitiy: item.pQuantity })),
        user: JSON.parse(localStorage.getItem("jwt")).user._id,
        total:  costValue,
        transactionId : Math.floor(Math.random() * 1000),
        address,
        phone,
        amount: qtyyy(),
        status: "Chưa được xử lý"
      };
      const qty = {
        productId: data.cartProduct.map(item => item._id ),
        quantity:  data.cartProduct.map(item => (item.pQuantity-qtyyy() )),
      }
      console.log(qty)
      try {
        const response = await axios.post('http://localhost:8000/api/order/create-order', order);
        // Handle success
        const responseQty = await axios.post('http://localhost:8000/api/product/update-qty-product',qty )
        console.log('Order created', response.data);
        console.log(responseQty);
        message.success('Đặt hàng thành công!');
        // clearCart()
        setTimeout(() => {
          history.push('/'); // Thay thế '/success-page' bằng URL của trang thành công thực tế
        }, 1000);
  
      } catch (error) {
        console.error('An error occurred while creating the order:', error);
      }
    }
  };
  const createPaymentUrl = async () => {
    try {
      const response = await axios.post(`${apiURL}/api/vnpay/create_payment_url`, {
        amount: costValue,
        bankCode: '',
        language: '',
      });
      const vnpUrl = response.data.data;
      // Xử lý vnpUrl
      // Ví dụ: chuyển hướng đến URL vnpUrl
      window.location.href = vnpUrl;
    } catch (error) {
      console.error('Lỗi khi gọi API create_payment_url:', error);
    }
  };
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

  const handleSubmitVNPay = async (event) => {
    event.preventDefault();
    if(!address){
      message.warning("vui lòng điền địa chỉ của bạn")
    }else if(!phone){
      message.warning("vui lòng điền số điện thoại của bạn")
    }else{
        const order = {
          allProduct: data.cartProduct.map(item => ({ id: item._id, quantitiy: item.pQuantity })),
          user: JSON.parse(localStorage.getItem("jwt")).user._id,
          total:  costValue,
          transactionId : Math.floor(Math.random() * 1000),
          address,
          phone,
          amount: qtyyy(),
          status: "Đã thanh toán"
        };
        const qty = {
          productId: data.cartProduct.map(item => item._id ),
          quantity:  data.cartProduct.map(item => (item.pQuantity-qtyyy() )),
    
        }
        
      
        // const paymentUrlResponse = await axios.post(`${apiURL}/api/vnpay/create_payment_url`, dataOder);
        // try {
        //   // const response = await axios.post(`${apiURL}/api/order/create-order`, order);
        //   // Handle success
        //   // Create payment URL with orderId
        
        //   // let response = await axios.get("http://localhost:8000/api/vnpayment/create_payment_url");
        //   // if(response){
        //   //   const url = response.data;
        //   //   window.open(url, '_blank');
        //   // }
        //   console.log(paymentUrlResponse)
        //   const paymentUrl = paymentUrlResponse.data;
        //   console.log(paymentUrl.data)
        //   window.location.href = paymentUrl.data;
        //   // const responseQty = await axios.post('http://localhost:8000/api/product/update-qty-product',qty )
        //   // Redirect user to payment page
        // } catch (error) {
        //   console.error('An error occurred while creating the order:', error);
        // }
        const response = await axios.post(`${apiURL}/api/order/create-order`,order);
        
          await createPaymentUrl()
          const responseQty = await axios.post('http://localhost:8000/api/product/update-qty-product',qty )
        // }
        // else{
        //   console.log("thanh toan thất bại")
        // }
    
        
    
      
    
    
     
    }
  };




  if (data.loading) {
    return (
      <div className="flex cols items-center justify-center h-screen">
         <Skeleton
      avatar
      paragraph={{
        rows: 4,
      }}
    />
        {/* Please wait untill finish */}
      </div>
     
    );
  }
  return (
    <Fragment>
      <section className="oder-wraper">
        <div className="text-2xl mx-2">Order</div>
        {/* Product List */}
        <div className="checkout-container">
          <div className="checkoutproducts-wraper">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            {state.clientToken !== null ? (
              <Fragment>
                <div
                  onBlur={(e) => setState({ ...state, error: false })}
                  className="p-4 md:p-8"
                >
                  {state.error ? (
                    <div className="bg-red-200 py-2 px-4 rounded">
                      {state.error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col py-2">
                    <label htmlFor="address" className="pb-2">
                      Địa chỉ
                    </label>
                    <form onSubmit={handleSubmitAdress} className="form-address">
                   
                        <select 
                          
                          id="province"
                          className="province"
                          value={province}
                          onChange={(e)=>setProvince(e.target.value)}
                        >
                          <option label="--Chọn Tỉnh/Thành phố--"></option>
                          {provinces?.map((item)=>(
                            <option 
                              value={item.province_id}
                              key={item.province_id}>
                                
                              {item.province_name}
                              
                              </option>
                          ))}
                        </select>
                        <select 
                          className="district"
                          value={district}
                          onChange={(e)=>setDistrict(e.target.value)}
                        >
                           <option label="--Chọn Quận/Huyện--"></option>
                          {districts?.map((item)=>(
                            <option 
                       
                              value={item.district_id}
                              key={item.district_id}>{item.district_name}</option>
                          ))}
                        </select>
                        <input
                          className="address-detail"
                          value={
                          addressDetail
                          }
                          onChange={(e) =>
                            setAddressDetail(e.target.value)
                            // setState({
                            //   ...state,
                            //   address: e.target.value,
                            //   error: false,
                            // })
                          }
                          type="text"
                          id="address"
                          placeholder="Địa chỉ chi tiết..."
                        />
                      <button className="submit-address" type="submit" >
                        Xác nhận địa chỉ
                      </button>

                    </form>
                    <input value={address} type="text"className="addrres-confirm" />
                 
                  </div>
                  <div className="flex flex-col py-2 mb-2">
                    <label htmlFor="phone" className="pb-2">
                      Số điện thoại
                    </label>
                    <input
                      value={phone}
                      onChange={handlePhoneChange}
                      type="number"
                      id="phone"
                      className="border px-4 py-2"
                      placeholder="+84 "
                    />
                    {phoneError && <p className="text-red-500">{phoneError}</p>}
                  </div>
             
                  <div
                    onClick={(e) =>         
                      handleSubmit(e)
                    }
                    className="oder-btn-cod w-full px-4 py-4 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#303031" }}
                  >
                    Thanh toán khi nhận hàng
                  </div>
                  <div
                    onClick={(e) =>         
                      handleSubmitVNPay(e)
                    }
                    className="oder-btn-online w-full px-4 py-4 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#303031" }}
                  >
                    Thanh toán online
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="flex items-center justify-center py-12">
                <svg
                  className="w-12 h-12 animate-spin text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="oder-product-container ">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="oder-product"
              >
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="oder-product-img"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt="wishListproduct"
                  />
                  <div className="oder-product-details">
                    <div className="oder-product-name">
                      {product.pName}
                    </div>
                    <div className="oder-product-qty">
                      Số lượng: {quantity(product._id)}
                    </div>
                    <div className="oder-product-price">
                      Giá: {product.pPrice.toLocaleString()}{" "} <sup> &#8363;</sup>
                    </div>
                  </div>
                    <div className="oder-product-total">
                    {subTotal(product._id, product.pPrice)} <sup> &#8363;</sup>
                  </div>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
      <div className="total-cost">Thành tiền: {totalCost().toLocaleString()} <sup> &#8363;</sup></div>
    </Fragment>
  );
};
export default CheckoutProducts;










// import React, { Fragment, useEffect, useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { LayoutContext } from "../layout";
// import { subTotal, quantity,totalCost  } from "../partials/Mixins";
// import axios from "axios";
// import { cartListProduct } from "../partials/FetchApi";
// import { getBrainTreeToken, getPaymentProcess,createOrder } from "./FetchApi";
// import { fetchData, fetchbrainTree, pay } from "./Action";
// import DropIn from "braintree-web-drop-in-react";
// import "./style.css"

// const apiURL = process.env.REACT_APP_API_URL;

// export const CheckoutComponent = (props) => {
//   const history = useHistory();
//   const { data, dispatch } = useContext(LayoutContext);

//   const [paymentUrl, setPaymentUrl] = useState('');

  
//   const [state, setState] = useState({
//     address: "",
//     phone: "",
//     error: false,
//     success: false,
//     clientToken: null,
//     // instance: {},
//   });
// console.log(state)
//   useEffect(() => {
//     fetchData(cartListProduct, dispatch);
//     fetchbrainTree(getBrainTreeToken, setState);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleCreatePayment = async () => {
//     try {
//       const response = await axios.post(`${apiURL}/api/vnpay/create_payment_url`, {
//         amount: 100,
//         address: state.address,
//         phone: state.phone,
//         // Các thông tin khác
//       });
  
//       if (response.data.paymentUrl) {
//         setPaymentUrl(response.data.paymentUrl);
//         console.log(response.data.paymentUrl)
//       } else {
//         throw new Error('Failed to create payment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   if (data.loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <svg
//           className="w-12 h-12 animate-spin text-gray-600"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//           ></path>
//         </svg>
//         xin vui lòng đợi trong dây lát
//       </div>
//     );
//   }
//   return (
//     <Fragment>
//       <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
//         <div className="text-2xl mx-2">Đơn Hàng</div>
//         {/* Product List */}
//         <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
//           <div className="md:w-1/2">
//             <CheckoutProducts products={data.cartProduct} />
//           </div>
//           <div className="w-full order-first md:order-last md:w-1/2">
//             {state.clientToken !== null ? (
//               <Fragment>
//                 <div
//                   onBlur={(e) => setState({ ...state, error: false })}
//                   className="p-4 md:p-8"
//                 >
//                   {state.error ? (
//                     <div className="bg-red-200 py-2 px-4 rounded">
//                       {state.error}
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                   <div className="flex flex-col py-2">
//                     <label htmlFor="address" className="pb-2">
//                       Địa chỉ
//                     </label>
//                     <input
//                       value={state.address}
//                       onChange={(e) =>
//                         setState({
//                           ...state,
//                           address: e.target.value,
//                           error: false,
//                         })
//                       }
//                       type="text"
//                       id="address"
//                       className="border px-4 py-2"
//                       placeholder="Address..."
//                     />
//                   </div>
//                   <div className="flex flex-col py-2 mb-2">
//                     <label htmlFor="phone" className="pb-2">
//                       Số điện thoại
//                     </label>
//                     <input
//                       value={state.phone}
//                       onChange={(e) =>
//                         setState({
//                           ...state,
//                           phone: e.target.value,
//                           error: false,
//                         })
//                       }
//                       type="number"
//                       id="phone"
//                       className="border px-4 py-2"
//                       placeholder="+84"
//                     />
//                   </div>
//                   <div>
//                       <button onClick={handleCreatePayment}>Create Payment</button>
//                       {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}
//                     </div>
//                   <DropIn
//                     options={{
//                       authorization: state.clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => (state.instance = instance)}
//                   />
                   
//                   <div
//                     onClick={(e) =>
//                       pay(
//                         data,
//                         dispatch,
//                         state,
//                         setState,
//                         getPaymentProcess,
//                         // createOrder,
//                         totalCost,
//                         history
//                       )
//                     }
//                     className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
//                     style={{ background: "#303031" }}
//                   >
//                     Pay now
//                   </div>
                 
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="flex items-center justify-center py-12">
//                 <svg
//                   className="w-12 h-12 animate-spin text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                   ></path>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </Fragment>
//   );
// };

// const CheckoutProducts = ({ products }) => {
//   const history = useHistory();

//   return (
//     <Fragment>
//       <div className="oder-product-container ">
//         {products !== null && products.length > 0 ? (
//           products.map((product, index) => {
//             return (
//               <div
//                 key={index}
//                 className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
//               >
//                 <div className="md:flex md:items-center md:space-x-4">
//                   <img
//                     onClick={(e) => history.push(`/products/${product._id}`)}
//                     className="cursor-pointer md:h-10 md:w-10 object-cover object-center"
//                     src={`${apiURL}/uploads/products/${product.pImages[0]}`}
//                     alt="wishListproduct"
//                   />
//                   <div className="name text-lg md:ml-6 truncate">
//                     {product.pName}
//                   </div>
//                   <div className="md:ml-6 font-semibold text-gray-600 text-sm">
//                     Giá:{product.pPrice}{" "} <sup> &#8363;</sup>
//                   </div>
//                   <div className="md:ml-6 font-semibold text-gray-600 text-sm">
//                     Số lượng:{quantity(product._id)}
//                   </div>
//                   <div className="font-semibold text-gray-600 text-sm">
//                     Tổng tiền:{subTotal(product._id, product.pPrice)} <sup> &#8363;</sup>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div>No product found for checkout</div>
//         )}
//       </div>
//     </Fragment>
//   );
// };

// export default CheckoutProducts;
