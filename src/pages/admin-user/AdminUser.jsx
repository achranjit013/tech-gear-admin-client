import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomerTable from "../../components/custom-tables/CustomerTable";
import { useSelector } from "react-redux";

const AdminUser = () => {
  const { adminList } = useSelector((state) => state.adminInfo);

  return (
    <AdminLayout title="Admins">
      <div className="d-flex justify-content-end">
        <Link to="/admin-signup">
          <Button
            type="submit"
            className="px-5 fw-bold lh-base"
            style={{ letterSpacing: "1px" }}
          >
            Create new admin
          </Button>
        </Link>
      </div>

      {/* list of admins */}
      <CustomerTable users={adminList} />
    </AdminLayout>
  );
};

export default AdminUser;
