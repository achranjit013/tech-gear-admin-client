import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { UpdatePasswordForm } from "../../components/admin-profile/UpdatePasswordForm";

const MyProfile = () => {
  return (
    <AdminLayout title="MyProfile">
      <div>
        <h5>Update user profile</h5>
        <hr />
      </div>

      <div className="mt-5">
        <h5>Update user password</h5>
        <hr />

        <UpdatePasswordForm />
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
