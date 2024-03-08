import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/custom-tables/CustomerTable";

const Customer = () => {
  return (
    <AdminLayout title="Customers">
      <CustomerTable />
    </AdminLayout>
  );
};

export default Customer;
