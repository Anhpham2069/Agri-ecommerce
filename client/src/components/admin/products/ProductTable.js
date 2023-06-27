import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import { Tooltip } from 'antd';
import moment from "moment";
import 'moment/locale/vi';
import { ProductContext } from "./index";
import Loading from "../loading/LoadingComponent"
import "./style.css"
import { ExclamationCircleFilled,FireOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 
{ faMagnifyingGlass } 
from '@fortawesome/free-solid-svg-icons'
import { Table, Tag, Button, Modal, Space } from 'antd';
import { message } from 'antd';
import {
  DeleteTwoTone,EditTwoTone
} from '@ant-design/icons';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = searchResults && searchResults.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(searchResults && searchResults.length / itemsPerPage);
  console.log(searchResults)
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
    setSearchResults(products.filter(a=>(a.pName.toLowerCase().includes(e.target.value) || a.pCategory.cName.toLowerCase().includes(e.target.value))))
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 mt-40">
        <Loading />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="title-table-container col-span-1 overflow-auto bg-white shadow-lg p-4 text-sm">
        <div className="seacrh-product">
            <input type="text"className="input-search-product" placeholder="Nhập tên sản phẩm...."
              onChange={(e)=>Filter(e)}
            />
            <span className="search-icon-product">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>
              </span>
        </div>
        <table className=" table-auto border w-full my-2">
          <thead>
            <tr className="title-table">
              <th className="title-table-detail">STT</th>
              
              <th className="title-table-detail">Sản phẩm</th>
              <th className="title-table-detail">Công ty</th>
              <th className="title-table-detail">Chi tiết</th>
              <th className="title-table-detail">Hình ảnh</th>
              <th className="title-table-detail">Trạng thái</th>
              <th className="title-table-detail">Số lượng</th>
              <th className="title-table-detail">Loại</th>
              <th className="title-table-detail">Khuyến mại (%)</th>
              <th className="title-table-detail">Ngày thêm</th>
              <th className="title-table-detail">Ngày cập nhật</th>
              <th className="title-table-detail">Hành động</th>
            </tr>
          </thead>
          <tbody className="item-product-container">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((item, key) => {
                return (
                  <>  
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
        message.success('Xóa sản phẩm thành công!');

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const info = () => {
    Modal.info({
      title: 'Chi tiiết',
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
        {product.pHashtag==="Giải cứu" ? 
          <td className="p-2 text-red-500 text-left">
            {product.pName.length > 15
              ? product.pName.substring(0, 15) + "..."
              : product.pName} <FireOutlined />
          </td>:
       
          <td className="p-2 text-left">
          {product.pName.length > 15
            ? product.pName.substring(0, 15) + "..."
            : product.pName}
        </td>
        }
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
        {product.pQuantity>0 ? 
        <td className="p-2 text-center">{product.pQuantity}</td>
        :
        <td className="p-2 text-center text-red-500">Hết hàng</td>
        }
       
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
           <button className="Btn-edit">
            <EditTwoTone twoToneColor="#eb2f96" style={{fontSize:"1.2rem"}}/>
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
        
                <DeleteTwoTone twoToneColor={"#fc4949"} style={{fontSize:"1.2rem"}}/>
              
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
