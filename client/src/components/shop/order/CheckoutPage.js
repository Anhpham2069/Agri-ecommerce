import React, { Fragment, useState,useEffect } from "react";
import Layout from "../layout";
import { CheckoutComponent } from "./CheckoutProducts";
import { getProvince } from "./FetchApi"; 

const CheckoutPage = (props) => {
  const [province,setProvince] = useState([])
  useEffect(()=>{

    const fetchDataProvince = async ()=>{
      let response = await getProvince()
      if(response.status===200){
        setProvince(response?.data.results)
      }
    }
    fetchDataProvince()
  },[])
  console.log(Array.isArray(province)); 
  return (
    <Fragment>
      <Layout children={<CheckoutComponent options={province}/>} />
    </Fragment>
  );
};

export default CheckoutPage;
