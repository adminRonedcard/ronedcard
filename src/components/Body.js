import React from "react";
import "./Body.css";
import ImageGalleryMain from "./ImageGalleryMain";
import ProfileDetails from "./ProfileDetails";
import Products from "./Products";
import Footer from "./Footer.js";
import AdContainer from "./AdContainer";

const Body = () => {
  return (
    <div className="body">
      <ProfileDetails />
      <ImageGalleryMain />
      <AdContainer />
      <Products />
      <Footer />
    </div>
  );
};

export default Body;
