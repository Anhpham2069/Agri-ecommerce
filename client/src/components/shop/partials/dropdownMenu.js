import React from "react";

const DropdownMenu = ({categories}) => {
  return (
    <>
    <div className="dropdown-content">
      {categories && categories.map((item,index)=>(
        <a href="#shop" key={index}>{item.cName}</a>
      ))}
    </div>
    </>
  );
};

export default DropdownMenu;