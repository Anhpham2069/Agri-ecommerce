export const subTotal = (id, price) => {
  let subTotalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.forEach((item) => {
    if (item.id === id) {
      subTotalCost = item.quantitiy * price;
    }
  });
  return subTotalCost.toLocaleString();
};

export const quantity = (id) => {
  let product = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.forEach((item) => {
    if (item.id === id) {
      product = item.quantitiy;
    }
  });
  return product;
};

export const minusQty = (id) => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].id === id) {
      if (carts[i].quantity > 1) {
        carts[i].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(carts));
      }
      break;
    }
  }
};

export const plusQty = (id) => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < carts.length; i++) {
    if (carts[i].id === id) {
      carts[i].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(carts));
      break;
    }
  }
};

export const totalCost = () => {
  let totalCost = 0;
  let carts = JSON.parse(localStorage.getItem("cart"));
  carts.forEach((item) => {
    totalCost += item.quantitiy * item.price;
  });
  return totalCost+25000;
};
export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const updateQuantity = (
  type,
  totalQuantitiy,
  quantitiy,
  setQuantitiy,
  setAlertq
) => {
  if (type === "increase") {
    if (quantitiy === totalQuantitiy) {
      setAlertq(true);
    } else {
      setQuantitiy(quantitiy + 1);
    }
  } else if (type === "decrease") {
    if (quantitiy === 1) {
      setQuantitiy(1);
      setAlertq(false);
    } else {
      setQuantitiy(quantitiy - 1);
    }
  }
};