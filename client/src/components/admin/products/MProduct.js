import React, { useState,useContext,useEffect } from 'react';
import { getAllProduct, deleteProduct } from "./FetchApi";
import { Table, Button, Space } from 'antd';
import { ProductContext } from "./index";
import index from '../../shop/page';

const ProductList = () => {

    const { data, dispatch } = useContext(ProductContext);
    const { products } = data;
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([
        { id: 1, name: 'Product 1', company: 'Company 1', details: 'Product details', image: 'product.jpg', status: 'Active', quantity: 10, type: 'Type 1', discount: 10, addedDate: '2023-06-18', updatedDate: '2023-06-18' },
        { id: 2, name: 'Product 1', company: 'Company 1', details: 'Product details', image: 'product.jpg', status: 'Active', quantity: 10, type: 'Type 1', discount: 10, addedDate: '2023-06-18', updatedDate: '2023-06-18' },
        { id: 3, name: 'Product 1', company: 'Company 1', details: 'Product details', image: 'product.jpg', status: 'Active', quantity: 10, type: 'Type 1', discount: 10, addedDate: '2023-06-18', updatedDate: '2023-06-18' },
        // Danh sách các sản phẩm khác...
      ]);
    console.log(products)
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: 'pName', },
    { title: 'Công ty', dataIndex: 'pCompany',  },
    { title: 'Chi tiết', dataIndex: 'pDetails', },
    { title: 'Hình ảnh', dataIndex: 'pImages',  },
    { title: 'Trạng thái', dataIndex: 'pStatus', },
    { title: 'Số lượng', dataIndex: 'pQuantity',  },
    { title: 'Loại', dataIndex: 'pCategogy', },
    { title: 'Khuyến mại (%)', dataIndex: 'pOffer', },
    { title: 'Ngày thêm', dataIndex: 'createdAt',  },
    { title: 'Ngày cập nhật', dataIndex: 'updatedAt', },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Button onClick={() => handleDelete(record)}>Xóa</Button>
        </Space>
      ),
    },
  ];

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

  const handleEdit = (record) => {
    // Xử lý logic sửa sản phẩm
    console.log('Sửa sản phẩm:', record);
  };

  const handleDelete = (record) => {
    // Xử lý logic xóa sản phẩm
    // setProduct(products.filter((product) => product.id !== record.id));
  };

  return (
    <div>
      <h1>Quản lý sản phẩm</h1>
      <Table dataSource={products}  columns={columns} />
    </div>
  );
};

export default ProductList;