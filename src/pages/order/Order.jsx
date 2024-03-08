import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import OrderTable from "../../components/custom-tables/OrderTable";

const Order = () => {
  return (
    <AdminLayout title="Order">
      <OrderTable />
    </AdminLayout>
  );
};

export default Order;
