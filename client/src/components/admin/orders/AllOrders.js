import React, { Fragment, useContext, useEffect,useState } from "react";
import moment from "moment";
import 'moment/locale/vi';
import {faPrint} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExclamationCircleFilled,SearchOutlined } from '@ant-design/icons';

import Loading from "../loading/LoadingComponent"
import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFOrder from './PDFOrder';
import { message } from 'antd';
import { Table, Tag, Button, Modal, Space } from 'antd';

import "./style.css"


const apiURL = process.env.REACT_APP_API_URL;
const { confirm } = Modal;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  const [searchResults, setSearchResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setSearchResults(orders);
  }, [orders])

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = searchResults && searchResults.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(searchResults && searchResults.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  

  console.log(currentProducts)
  // console.log(orders.allProduct&&orders.allProduct.map(item=>item))
  const Filter = (e) =>{
    setSearchResults(orders.filter(a=>(a.transactionId.toLowerCase().includes(e.target.value)
     || a.status.toLowerCase().includes(e.target.value)
     || a.createdAt.toLowerCase().includes(e.target.value)
   )))
  }
//   const [products, setProducts] = useState([])

//   const fetchData = () => {
//     fetch("http://localhost:8000/api/order/get-all-orders")
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         setProducts(data)
//       })
//   }
//   console.log(products)

// useEffect(() => {
//   fetchData()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

 
  useEffect(() => {
    fetchData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loading />
      </div>
    );
  }
  return (
    <Fragment>
      <div className="oder-title-wraper col-span-1 overflow-auto bg-white shadow-lg p-4">
      <div className="seacrh-product">
            <input type="text"className="input-search-product" placeholder="Tìm kiếm...."
              onChange={(e)=>Filter(e)}
            />
            <span className="search-icon-product">
                <SearchOutlined style={{fontSize:"1.4rem"}}/>
              </span>
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Sản Phẩm</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Thành tiền</th>
              <th className="px-4 py-2 border">Mã giao dịch</th>
              <th className="px-4 py-2 border">Khách hàng</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Số điện thoại</th>
              <th className="px-4 py-2 border">Địa chỉ</th>
              <th className="px-4 py-2 border">Ngày đặt hàng</th>
              <th className="px-4 py-2 border">Cập nhật</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody className="item-product-container">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((item, i) => {
                return (
                  <>
                  <CategoryTable
                    key={i}
                    order={item}
                    editOrder={(oId, type, status) =>
                      editOrderReq(oId, type, status, dispatch)
                    }
                  />
                          {totalPages > 1 && (
                            <div className='page-number'>
                              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (pageNumber) => (
                                  <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                  >
                                    {pageNumber}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                  </>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {orders && orders.length} order found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);
console.log(order)
  const showDeleteConfirm = () => {
    confirm({
      title: 'Bạn chắc chắn muốn xóa sản phẩm này chứ',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        deleteOrderReq(order._id, dispatch)
        message.success('Xóa đơn hàng thành công!');
        
      },
      onCancel() {
        console.log('Cancel');
        message.error('Xóa đơn hàng thất bại!');
      },
    });
  };
console.log(order)
  return (
    <Fragment>
      <tr className="oder-admin-wraper border-b">
      
        <td className="w-48 hover:bg-gray-200 p-2 flex space-y-1">
          {order.allProduct.map((product, i) => {
            return (
              <span className="block flex items-center space-x-2" key={i}>
                <img
                  className="w-8 h-8 object-cover object-center"
                  src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                  alt="productImage"
                />
                <span>{product.id.pName}</span>
              </span>
            );
          })}
          <span className="flex"> <p>x</p>&#160;{order.amount}</span>
        </td>     
        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {order.status === "Chưa được xử lý" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Đã thanh toán" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Đã xử lý" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Đang giao" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Đã giao" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Hủy đơn hàng" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>
        {order.status === "Đã thanh toán" ? 
        <td className="hover:bg-gray-200 p-2 text-center">0<sup> &#8363;</sup></td> 
        : 
        <td className="hover:bg-gray-200 p-2 text-center">{order.total.toLocaleString()}<sup> &#8363;</sup></td>
        }
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.transactionId}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.user.name}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.user.email}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1">
              <PDFDownloadLink document={<PDFOrder order={order} />} fileName={order.user.name + order.phone}>
            {({ blob, url, loading, error }) =>
              loading ? 'Đang tạo tệp PDF...' : <FontAwesomeIcon icon={faPrint} size="lg"/>
            }
          </PDFDownloadLink>
          </span>
          <span
            onClick={(e) => editOrder(order._id, true, order.status)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => showDeleteConfirm()}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;
