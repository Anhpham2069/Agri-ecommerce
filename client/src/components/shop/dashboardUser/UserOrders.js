import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";
import { Table, Button, Space } from 'antd';
import "./style.css"
const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr>
          <th className="px-10 py-2 border">Sản phẩm</th>
          <th className="px-4 py-2 border">trạng thái</th>
          <th className="px-4 py-2 border">Tổng</th>
          <th className="px-4 py-2 border">Số điện thoại</th>
          <th className="px-4 py-2 border">Địa chỉ</th>
          <th className="px-4 py-2 border">Giao dịch Id</th>
          <th className="px-4 py-2 border">Thanh toán</th>
          <th className="px-4 py-2 border">Xử lý</th>
          <th className="px-4 py-2 border">Hành động</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order }) => {
  return (
    <Fragment>
      <tr className="oder-item-container border-b">
        <td className="oder-item hover:bg-gray-200 p-2 flex space-y-1">
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
          <span><p>x</p>{order.amount}</span>
        </td>
        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {order.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.total.toLocaleString()}<sup> &#8363;</sup></td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.transactionId}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
        <Button type="primary" danger ghost>
          Hủy đơn
        </Button>
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  console.log(orders)
  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  // const columns = [
  //   {
  //     title: 'Sản phẩm',
  //     dataIndex: "a",
  //     key: 'product',
  //   },
  //   {
  //     title: 'Trạng thái',
  //     dataIndex: 'status',
  //     key: 'status',
  //   },
  //   {
  //     title: 'Tổng',
  //     dataIndex: 'total',
  //     key: 'total',
  //   },
  //   {
  //     title: 'Số điện thoại',
  //     dataIndex: 'phone',
  //     key: 'phone',
  //   },
  //   {
  //     title: 'Địa chỉ',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: 'Giao dịch Id',
  //     dataIndex: 'transactionId',
  //     key: 'transactionId',
  //   },
  //   {
  //     title: 'Thanh toán',
  //     dataIndex: 'createdAt',
  //     key: 'payment',
  //   },
  //   {
  //     title: 'Xử lý',
  //     dataIndex: 'updatedAt',
  //     key: 'processing',
  //   },
  //   {
  //     title: 'Hành động',
  //     dataIndex: 'action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space>
  //         <Button type="primary" danger ghost>Hủy đơn</Button>
  //       </Space>
  //     ),
  //   },
  // ];
  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center py-24">
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
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Đơn hàng
          </div>
          <hr />
          <div className="overflow-auto bg-white shadow-lg p-4">
            <table className="table-auto border w-full my-2">
              <TableHeader />
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((item, i) => {
                    return <TableBody key={i} order={item} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-xl text-center font-semibold py-8"
                    >
                      Không có đơn hàng nào hiện tại
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <Table dataSource={orders} columns={columns} /> */}
            <div className="text-sm text-gray-600 mt-2">
              Tổng {orders && orders.length} đơn hàng
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;
