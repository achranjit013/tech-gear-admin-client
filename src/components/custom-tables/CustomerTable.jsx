import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExistingCat,
  getAllCats,
} from "../../pages/category/categoryAction";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import UpdateCategory from "../category/UpdateCategory";
import { getUserProfile } from "../../pages/profile/userAction";
import CustomInput from "../custom-input/CustomInput";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CustomerTable({ users }) {
  const [fileteredCustomers, setFilteredCustomers] = useState(users);

  const handleOnSearch = (e) => {
    const filteredResult = users.filter(
      (user) =>
        user.fname.includes(e.target.value) ||
        user.lname.includes(e.target.value)
    );
    setFilteredCustomers(filteredResult);
  };

  const obj = {
    name: "search",
    placeholder: "Search by first and last name",
    type: "text",
  };

  return (
    <>
      <Row className="d-flex justify-content-between align-items-end">
        <Col md={6} className="mb-md-3">
          <span className="fw-medium">
            {users?.length} {users?.length > 1 ? "users" : "user"} found!
          </span>
        </Col>
        <Col md={6}>
          <CustomInput {...obj} onChange={handleOnSearch} />
        </Col>
      </Row>

      <Table striped bordered className="overflow-hidden rounded shadow">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          {fileteredCustomers.map(
            (
              {
                _id,
                address,
                createdAt,
                email,
                fname,
                lname,
                password,
                phone,
                role,
                status,
              },
              i
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>
                  {fname} {lname}
                </td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{createdAt.slice(0, 10)}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

export default CustomerTable;
