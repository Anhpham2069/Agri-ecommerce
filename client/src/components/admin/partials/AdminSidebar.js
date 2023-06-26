import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  faUsers,faPenToSquare,faSquarePollVertical,faClipboardList,faBoxArchive,faTruckFast,} 
from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css"

const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        id="sidebar"
        className="sidebar-container hidden md:block sticky top-0 left-0 h-screen sidebarShadow"
      >
        <div
          onClick={(e) => history.push("/admin/dashboard")}
          className={`${
            location.pathname === "/admin/dashboard"
              ? " bg-gray-200 text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faSquarePollVertical} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Dashboard</span>
        </div>
       
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? " bg-gray-200 text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faClipboardList} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Phân loại</span>
        </div>
       
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? " bg-gray-200 text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faBoxArchive} size="xl" />
          </span>
          <span className="hover:text-gray-800">Sản Phẩm</span>
        </div>
       
        <div
          onClick={(e) => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? " bg-gray-200 text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-3 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faTruckFast} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Đơn hàng</span>
        </div>
       
        <div
          onClick={(e) => history.push("/admin/dashboard/users")}
          className={`${
            location.pathname === "/admin/dashboard/users"
              ? " bg-gray-200 text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faUsers} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Khách  Hàng</span>
        </div>
       
        <div
          onClick={(e) => history.push("/admin/dashboard/post")}
          className={`${
            location.pathname === "/admin/dashboard/article"
              ? " bg-gray-200  text-green-600"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faPenToSquare} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Bài Viết</span>
        </div>
        
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
