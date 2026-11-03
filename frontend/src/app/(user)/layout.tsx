import React from "react";
import Navbar from "../components/Navigation";
import Topbar from "../(dashboard)/components/Topbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar profile />
      <div className="">{children}</div>
    </div>
  );
};

export default UserLayout;
