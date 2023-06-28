import React from 'react';
import { Document, Page, Text, View, StyleSheet,} from '@react-pdf/renderer';
import {Font} from "@react-pdf/renderer"
import forntF from "../../../images/font/Roboto-Regular.ttf"


// Font.register({ family: 'Roboto', src: forntF });


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    // fontFamily: 'Roboto',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    // fontFamily: 'Roboto',
  },
});

const PDFOrder = ({ order }) => (

    <Document>
      <Page style={styles.container}>
        <Text style={styles.title}>Info oder</Text>
        <Text style={styles.text}>Oder ID:&#160;&#160;&#160; {order.transactionId}</Text>
        <Text style={styles.text}>Oder date: &#160;&#160;&#160;{order.createdAt}</Text>
        <Text style={styles.text}>Customer:&#160;&#160;&#160; {order.user.name}</Text>
        <Text style={styles.text}>Phone: &#160;&#160;&#160;&#160;&#160;{order.phone}</Text>
        <Text style={styles.text}>Addrees: &#160;&#160;&#160;{order.address}</Text>
        <Text style={styles.title}>Product: &#160;&#160;&#160;&#160;{order.allProduct?.map((product, index) => (
          <Text key={index} style={styles.text}>
            {product.id.pName}
          </Text>
        ))}</Text>
      {order.status === "Đã thanh toán"? 
      
      <Text style={styles.text}>Total cost: &#160;&#160;&#160;&#160;&#160;&#160;&#160;0 VND</Text>
      :
      <Text style={styles.text}>Total cost: &#160;&#160;&#160;&#160;&#160;&#160;&#160;{order.total.toLocaleString()}VND</Text>
      }
    
      </Page>
    </Document>
)

  

export default PDFOrder;