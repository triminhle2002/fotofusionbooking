import React from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import Chatbot from "../components/Chatbot/Chatbot";

const Layout = ({ hideHeaderPaths = [] }) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Header />}
      <Outlet />
      <Chatbot />
      {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Footer />}
    </>
  );
};

export default Layout;
