import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CustomInput from "../custom-input/CustomInput";
import { format } from "date-fns";

function CustomerTable({ users }) {
  const [fileteredCustomers, setFilteredCustomers] = useState(users);

  const handleOnSearch = (e) => {
    const filteredResult = users.filter(
      (user) =>
        user.fname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.lname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCustomers(filteredResult);
  };

  const obj = {
    name: "search",
    placeholder: "Search by first or last name",
    type: "text",
  };

  return fileteredCustomers?.length > 0 ? (
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
            ({ _id, address, createdAt, email, fname, lname, phone }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>
                  {fname} {lname}
                </td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{format(new Date(createdAt), "yyyy/MM/dd")}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  ) : (
    <>
      <p className="text-center">No data to display!</p>
    </>
  );
}

export default CustomerTable;
