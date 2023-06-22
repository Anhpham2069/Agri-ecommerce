export const isWish = (id, wList) => {
  if (wList !== null && wList.includes(id) === true) {
    return true;
  }
  return false;
};

export const isWishReq = (e, id, setWlist) => {
  let list = localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];
  if (list.length > 0) {
    if (list.includes(id) !== true) {
      list.push(id);
      localStorage.setItem("wishList", JSON.stringify(list));
      setWlist(list);
    }
  } else {
    list.push(id);
    localStorage.setItem("wishList", JSON.stringify(list));
    setWlist(list);
  }
};

export const unWishReq = (e, id, setWlist) => {
  let list = localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];
  if (list.length > 0) {
    if (list.includes(id) === true) {
      list.splice(list.indexOf(id), 1);
      localStorage.setItem("wishList", JSON.stringify(list));
      setWlist(list);
    }
  }
};

export const nextSlide = (totalImg, slide, setSlide) => {
  if (slide === totalImg - 1) {
    setSlide(0);
  } else if (slide < totalImg) {
    setSlide(slide + 1);
  }
};

export const prevSlide = (totalImg, slide, setSlide) => {
  if (slide === 0) {
    setSlide(totalImg - 1);
  } else if (slide === totalImg - 1) {
    setSlide(0);
  }
};

export const cartList = () => {
  let carts = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;
  let list = [];
  if (carts !== null) {
    for (let cart of carts) {
      list.push(cart.id);
    }
    return list;
  } else {
    return (list = null);
  }
};

export const inCart = (id) => {
  if (localStorage.getItem("cart")) {
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    for (let product of cartProducts) {
      if (product.id === id) {
        return true;
      }
    }
  }
  return false;
};

export const addToCart = (
  id,
  quantitiy,
  price,
  layoutDispatch,
  setQuantitiy,
  setAlertq,
  fetchData,
  totalCost
) => {
  let isObj = false;
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  if (cart.length > 0) {
    cart.forEach((item) => {
      if (item.id === id) {
        isObj = true;
      }
    });
    if (!isObj) {
      cart.push({ id, quantitiy, price });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    cart.push({ id, quantitiy, price });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  layoutDispatch({ type: "inCart", payload: cartList() });
  layoutDispatch({ type: "cartTotalCost", payload: totalCost()});
  setQuantitiy(1);
  setAlertq(false);
  fetchData();
};

