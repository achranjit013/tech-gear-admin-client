import React from "react";
import { Link } from "react-router-dom";
import { AiFillDashboard, AiFillProfile } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";
import { PiVan } from "react-icons/pi";
import { IoMdListBox } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { FaUsers, FaUserSecret } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="side-bar bg-dark text-light p-3">
      <p className="mt-3 text-center">Admin Panel</p>

      <hr />
      <nav>
        <ul className="list-unstyled sid-nav">
          <li>
            <Link className="nav-link" to="/dashboard">
              <AiFillDashboard className="fs-4" /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/category">
              <TbCategory className="fs-4" /> Category
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/sub-category">
              <TbCategory2 className="fs-4" /> Sub Category
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/product">
              <IoMdListBox className="fs-4" /> Product
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/payment-option">
              <MdPayment className="fs-4" /> Payment Option
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/order">
              <PiVan className="fs-4" /> Order
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/customer">
              <FaUsers className="fs-4" /> Customer
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/admin-user">
              <FaUserSecret className="fs-4" /> Admin User
            </Link>
          </li>
          <hr />
          <li>
            <Link className="nav-link" to="/profile">
              <AiFillProfile className="fs-4" /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
