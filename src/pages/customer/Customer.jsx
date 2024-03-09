import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/custom-tables/CustomerTable";
import { useSelector } from "react-redux";

const Customer = () => {
  const { customers } = useSelector((state) => state.adminInfo);

  return (
    <AdminLayout title="Customers">
      <CustomerTable users={customers} />
    </AdminLayout>
  );
};

export default Customer;
