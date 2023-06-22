export const getAllProduct = async () => {
    try {
      let res = await axios.get(`${apiURL}/api/product/all-product`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };