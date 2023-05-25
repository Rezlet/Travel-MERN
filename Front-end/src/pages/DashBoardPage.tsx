import axios from "axios";
import React from "react";
import PaymentList from "../components/Admin/PaymentList";

const DashBoardPage = () => {
  return (
    <div className="px-4 mx-auto" style={{ height: "75vh", width: "80vw" }}>
      <PaymentList></PaymentList>
    </div>
  );
};

export default DashBoardPage;
