import React from "react";
import { Container } from "react-bootstrap";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AdminLayout = ({ children, title }) => {
  return (
    <div className="admin-layout">
      {/* sidebar */}
      <Sidebar />

      {/* main */}
      <main className="main">
        {/* header */}
        <Header />

        {/* body */}
        <Container fluid>
          <div className="mt-3">
            <h3>{title}</h3>
            <hr />

            <div className="page-content">{children}</div>
          </div>
        </Container>

        {/* footer */}
        <Footer />
      </main>
    </div>
  );
};
