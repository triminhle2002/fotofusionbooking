import React from "react";
import CheckOut from "../../components/Store/payment/CheckOut";

const paymentPage = () => {
  document.title = "Thanh toán ";
  return (
    <div>
      <CheckOut />
    </div>
  );
};

export default paymentPage;
