import React, { Fragment } from "react";
import Layout from "../layout";
import CheckoutSuccess from "./checkoutSuccess";


const CheckoutSuccessPage = (props) => {
    return (
      <Fragment>
        <Layout children={<CheckoutSuccess />} />
      </Fragment>
    );
  };
export default CheckoutSuccessPage