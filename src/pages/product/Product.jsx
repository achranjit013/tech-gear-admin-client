import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import ProductTable from "../../components/custom-tables/ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <AdminLayout title="Product">
      <div className="text-end mb-3">
        <Link to="/product/new">
          <Button variant="primary">Add new product</Button>
        </Link>
      </div>

      <ProductTable />
    </AdminLayout>
  );
};

export default Product;
