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
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faSquarePollVertical} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faClipboardList} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Phân loại</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faBoxArchive} size="xl" />
          </span>
          <span className="hover:text-gray-800">Sản Phẩm</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-3 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faTruckFast} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Đơn hàng</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/users")}
          className={`${
            location.pathname === "/admin/dashboard/users"
              ? "border-r-4 border-gray-800 bg-gray-100"
              : ""
          } hover:bg-gray-200 cursor-pointer flex flex items-center justify-start px-4 py-6`}
        >
          <span>
          <FontAwesomeIcon icon={faUsers} size="xl"/>
          </span>
          <span className="hover:text-gray-800">Khách  Hàng</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/post")}
          className={`${
            location.pathname === "/admin/dashboard/article"
              ? "border-r-4 border-gray-800 bg-gray-100"
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
