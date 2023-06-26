import React, { Fragment } from 'react';
import Layout from '../layout';
import "./style.css"
import RescueProduct  from './rescueProduct';

const RescuePage = () => {
  return (
    <Fragment>
       <Layout children={<RescueProduct />} />
    </Fragment>
  );
};

export default RescuePage;