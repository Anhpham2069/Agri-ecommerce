import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PDFOrder = ({ order }) => {
    console.log(order)
    return(
    
    <Document>
    <Page style={styles.container}>
      <Text style={styles.title}>Thông tin đơn hàng</Text>
      <Text style={styles.text}>Mã đơn hàng: {order.transactionId}</Text>
      <Text style={styles.text}>Ngày đặt hàng: {order.createdAt}</Text>
      <Text style={styles.text}>Khách hàng: {order.user.name}</Text>
      <Text style={styles.text}>Số điện thoại: {order.phone}</Text>
      <Text style={styles.text}>Địa chỉ: {order.address}</Text>
      <Text style={styles.title}>Sản phẩm: {order.allProduct?.map((product, index) => (
        <Text key={index} style={styles.text}>
          {product.pName}
        </Text>
      ))}</Text>
    
  
      <Text style={styles.text}>Tổng giá trị đơn hàng: {order.amount}</Text>
    </Page>
    </Document>
    )
  
}
  

export default PDFOrder;