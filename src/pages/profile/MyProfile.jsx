import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { UpdatePasswordForm } from "../../components/admin-profile/UpdatePasswordForm";
import { UpdateProfileForm } from "../../components/admin-profile/UpdateProfileForm";
import { useSelector } from "react-redux";
import { UpdateEmailForm } from "../../components/admin-profile/UpdateEmailForm";

const MyProfile = () => {
  const { admin } = useSelector((state) => state.adminInfo);

  return (
    <AdminLayout title={`Profile (${admin.fname + " " + admin.fname})`}>
      <div>
        <UpdateProfileForm />
      </div>

      <div className="mt-5">
        <UpdateEmailForm />
      </div>

      <div className="mt-5">
        <UpdatePasswordForm />
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
