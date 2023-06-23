

import React, { Fragment } from 'react';
import Layout from '../layout';
import "./style.css"
import { PostDetails } from '..';

const PostPge = () => {
  return (
    <Fragment>
       <Layout children={<PostDetails />} />
    </Fragment>
  );
};

export default PostPge;