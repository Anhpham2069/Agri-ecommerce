import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import { Tooltip } from 'antd';
import moment from "moment";
import { ProductContext } from "./index";
import "./style.css"
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 
{ faMagnifyingGlass } 
from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Space } from 'antd';
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const { confirm } = Modal;


const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;
  const [query,setQuery] = useState()
  // const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    setSearchResults(products);
  }, [products])
  console.log(searchResults)

  // const searchProducts = () => {
  //   const results = products & products.filter((item) =>
  //     item.pName.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setSearchResults(results);
  // };


// useEffect(()=>{
//   const fetchDataSearch = async () =>{
//     let res = await axios.get(`http://localhost:8000/api/product/search?q=${query}`)
//     setQuery(res.data)
//   }
//   fetchDataSearch()
// },[])

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
 
  };
  

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch product context */
  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };
  const Filter = (e) =>{
    setSearchResults(products.filter(a=>a.pName.toLowerCase().includes(e.target.value)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
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
    );
  }

  return (
    <Fragment>
      <div className="title-table col-span-1 overflow-auto bg-white shadow-lg p-4 text-sm">
        <div className="seacrh-product">
            <input type="text"className="input-search-product" placeholder="Nhập tên sản phẩm...."
              onChange={(e)=>Filter(e)}
            />
            <span className="search-icon-product">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
              </span>
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Sản phẩm</th>
              <th className="px-4 py-2 border">Công ty</th>
              <th className="px-4 py-2 border">Chi tiết</th>
              <th className="px-4 py-2 border">Hình ảnh</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Số lượng</th>
              <th className="px-4 py-2 border">Loại</th>
              <th className="px-4 py-2 border">Khuyến mại (%)</th>
              <th className="px-4 py-2 border">Ngày thêm</th>
              <th className="px-4 py-2 border">Ngày cập nhật</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    category={item.pCategory}
                    editProduct={(pId, product, type) =>
                      editProduct(pId, product, type)
                    }
                    deleteProduct={(pId) => deleteProductReq(pId)}
                    key={key}
                    index={key}
                  />
                  );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Tổng số sản phẩm {products && products.length}
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct,index,category }) => {
 
  const showDeleteConfirm = () => {
    confirm({
      title: 'Bạn chắc chắn muốn xóa sản phẩm này chứ',
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        deleteProduct(product._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const info = () => {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>{product.pDescription}</p>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <Fragment >
      <tr className="table-container text-xs " >
        <td className="p-2 text-left">
          {index+1}
        </td>
        <Tooltip title={product.pName} color="green" placement="right">
          <td className="p-2 text-left">
            {product.pName.length > 15
              ? product.pName.substring(0, 15) + "..."
              : product.pName}
          </td>
        </Tooltip>
        <td className="p-2 text-left">
          {product.pCompany}
        </td> 
        <td className="Description p-2 text-left" onClick={info}>
          {/* <Tooltip title={product.pDescription} color="green" placement="right"> */}
            {product.pDescription.slice(0, 15)}...
          {/* </Tooltip> */}
        </td>
        <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={`${apiURL}/uploads/products/${product.pImages[0]}`}
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">
          {product.pStatus === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.pStatus}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {product.pStatus}
            </span>
          )}
        </td>
        <td className="p-2 text-center">{product.pQuantity}</td>
        <td className="p-2 text-center">{product.pCategory.cName}</td>
        <td className="p-2 text-center">{product.pOffer}</td>
        <td className="p-2 text-center">
          {moment(product.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(product.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editProduct(product._id, product, true)}
            className="cursor-pointer rounded-lg p-2 mx-1"
          >
           <button className="Btn-edit">Edit 
            <svg className="svg" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
          </button>
          </span>
          <span
            // onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer rounded-lg p-2 mx-1"
          >
            {/* <Button onClick={showDeleteConfirm} type="dashed">
                Delete
            </Button> */}
            <button className="btn-delete"
            onClick={showDeleteConfirm}
            >
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 20 20" height="25" width="25">
                  <path fill="#6361D9" d="M8.78842 5.03866C8.86656 4.96052
                  8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329
                    4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 
                    5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 
                    5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776
                    3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 
                    3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496
                      13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25
                      6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023
                        14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333
                        16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176
                          15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579
                          7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939
                            5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536
                            14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771
                              12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833
                              12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175
                                14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972
                                14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                                  clipRule="evenodd" fillRule="evenodd">
                                  </path>
                </svg>
              </button>
            {/* <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg> */}
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;
