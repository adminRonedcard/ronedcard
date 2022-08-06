/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../components/ProfileDetails.css";
import "../components/ImageGalleryMain.css";
import sort from "../assets/sort.svg";
import "./ShareProfile.css";
import bg from "../assets/images/mainBg.png";
import star from "../assets/star.svg";
import starRed from "../assets/starRed.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import payment from "../assets/payment.svg";
import download from "../assets/download.svg";
import phoneIcon from "../assets/phone.svg";
import mailIcon from "../assets/mail.svg";
import locationIcon from "../assets/location.svg";
import Pdf from "react-to-pdf";
import "../components/Header.css";
import logo from "../assets/Logo1.svg";
import copy from "../assets/copy_red.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import Popup from "reactjs-popup";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ref = React.createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [7, 13],
};

const optionsMobile = {
  orientation: "portrait",
  unit: "in",
  format: [8, 11],
};

const ShareProfile = () => {
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");

  const [allImages, setAllImages] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [upi, setUpi] = useState("");
  const [qr, setQr] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      setUsername(pair[1]);
    }
  }

  useEffect(() => {
    getParameters();
    const getUser = async () => {
      let url = new URL(
        "https://ronenestjs.herokuapp.com/profile/share_userData"
      );
      url.search = new URLSearchParams({
        username: username,
      });
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await req.json();
      if (data) {
        setUserData(data.userData);
        setUserId(data.userData._id);
        setFacebookLink(data.userData.socialLinks[0].facebook);
        setTwitterLink(data.userData.socialLinks[0].twitter);
        setLinkedInLink(data.userData.socialLinks[0].LinkedIn);
        setWhatsappLink(data.userData.socialLinks[0].whatsapp);
        setInstagramLink(data.userData.socialLinks[0].instagram);
        setTelegramLink(data.userData.socialLinks[0].telegram);
      }
    };
    if (username !== "" && username !== undefined) {
      getUser();
    } else {
    }
  }, [username]);

  useEffect(() => {
    async function getAllImages() {
      const endpoint =
        "https://ronenestjs.herokuapp.com/image_Gallery/get_images";
      let url = new URL(endpoint);
      url.search = new URLSearchParams({
        user_id: userid,
      });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .get(url, config)
        .then((res) => {
          const data = res.data;
          if (data.status === 404) {
            document.getElementById("imageGalleryContent").style.display =
              "none";
            document.getElementById("loadMore__button").innerHTML = "No Images";
          }
          if (data.status === 200) {
            setAllImages(data.images);
          }
        })
        .catch(console.error);
    }

    if (userid !== "" && userid !== undefined) {
      getAllImages();
    }
  }, [userid]);

  useEffect(() => {
    async function getAllProducts() {
      const endpoint = "https://ronenestjs.herokuapp.com/products/all_products";

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .get(endpoint, config)
        .then((res) => {
          const data = res.data;
          if (data.status === 200) {
            setAllProducts(data.products_data);
          }
        })
        .catch(console.error);
    }

    const getUserUpi = async () => {
      let url = "https://ronenestjs.herokuapp.com/account/getData";
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await req.json();
      if (data.status === 200) {
        setUpi(data.account.upi_Id);
        setQr(data.account.QrCode);
      }
    };
    if (userid !== "" && userid !== undefined) {
      getAllProducts();
      getUserUpi();
    }
  }, [userid]);

  return (
    <div className="shareProfile">
      <div className="header" style={{ height: "80px" }}>
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <Link to="/" className="buttonContainer">
            <PrimaryButton content="Register" />
          </Link>
        </div>
      </div>
      <div className="profileDetails" style={{ backgroundImage: `url(${bg})` }}>
        <div
          className="profileContainer__profileDetails"
          id="profileContainer__profileDetails"
          style={{ display: "flex", marginTop: "50px" }}
        >
          <div className="leftContainer__profileDetails">
            <div
              className="imgContainer__profile"
              style={{
                backgroundImage: `url(${userData.img_url})`,
              }}
            ></div>
            <div className="left__profile__title">
              <h2>{userData.name}</h2>
              <p>{userData.profession}</p>
              <div className="rating__container">
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={star} alt="" />
              </div>
            </div>
          </div>
          <div className="rightContainer__profile">
            <div className="topContainer__rightProfile">
              <p>{userData.bio}</p>
            </div>
            <div className="socialButton__container">
              <a
                href={facebookLink}
                target={"_blank"}
                className="facebook__contain social__button__profile"
              >
                <img src={facebook} alt="" />
              </a>
              <a
                href={linkedInLink}
                target={"_blank"}
                className="linkedIn__contain social__button__profile"
              >
                <img src={linkedin} alt="" />
              </a>
              <a
                href={twitterLink}
                target={"_blank"}
                className="twitter__contain social__button__profile"
              >
                <img src={twitter} alt="" />
              </a>
              <a
                href={whatsappLink}
                target={"_blank"}
                className="whatsapp__contain social__button__profile"
              >
                <img src={whatsapp} alt="" />
              </a>
              <a
                href={instagramLink}
                target={"_blank"}
                className="insta__contain social__button__profile"
              >
                <img src={instagram} alt="" />
              </a>
              <a
                href={telegramLink}
                target={"_blank"}
                className="telegram__contain social__button__profile"
              >
                <img src={telegram} alt="" />
              </a>
            </div>
            <div className="otherOptions__container">
              {userData.address ? (
                <>
                  <a
                    href={`tel:${userData.contact}`}
                    className="optionButton__profile"
                  >
                    <img src={phoneIcon} alt="" />
                    Call
                  </a>
                  <a
                    href={`mailto:` + userData.email}
                    className="optionButton__profile"
                  >
                    <img src={mailIcon} alt="" />
                    Mail
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${userData.address[0].location}`}
                    className="optionButton__profile"
                  >
                    <img src={locationIcon} alt="" />
                    Locate Us
                  </a>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="other__buttons__container">
              <Popup
                trigger={
                  <div className="payment__button">
                    <img src={payment} alt="" />
                    UPI Payment
                  </div>
                }
                position="top center"
              >
                <div className="popupContainer">
                  <div id="qrupi2" className="qrImageContainer_upi">
                    <img src={qr} alt="" />
                  </div>
                  <a href={qr} download={upi} className="dowload_qr_upi">
                    DOWNLOAD QR
                  </a>
                  <div className="upiContent">
                    <h5>{upi}</h5>
                    <CopyToClipboard text={upi}>
                      <div className="copyUpiButton">
                        <img src={copy} alt="" />
                        <p>COPY UPI</p>
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </Popup>

              <div className="download__web" id="downloadWeb">
                <Pdf
                  targetRef={ref}
                  options={options}
                  x={0.5}
                  y={0.5}
                  scale={1}
                  filename={`${userData.name}.pdf`}
                >
                  {({ toPdf }) => (
                    <div onClick={toPdf} className="download__button">
                      <img src={download} alt="" />
                      Download Profile
                    </div>
                  )}
                </Pdf>
              </div>
              <div className="download__mobile" id="downloadMobile">
                <Pdf
                  targetRef={ref}
                  options={optionsMobile}
                  x={0.5}
                  y={0.5}
                  scale={1.5}
                  filename={`${userData.name}.pdf`}
                >
                  {({ toPdf }) => (
                    <div onClick={toPdf} className="download__button">
                      <img src={download} alt="" />
                      Download Profile
                    </div>
                  )}
                </Pdf>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="imageGalleryMain" style={{ marginBottom: "50px" }}>
        <div className="title__container__imageGalleryMain">
          <h3>Image Gallery</h3>
          <div className="viewAll__button">View All</div>
          <span></span>
          <div className="sort__button">
            Sort
            <img src={sort} alt="" />
          </div>
        </div>
        <div
          id="imageGalleryContent"
          className="content__container__imageGalleryMain"
        >
          {allImages.map((imageForGallery, index) => {
            return (
              <div
                key={index}
                style={{ backgroundImage: `url('${imageForGallery.img_url}')` }}
                className="card__products__imageContainer"
              >
                {/* <h4>Lorem Ipsum is simply dummy text of the</h4> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="products">
        <div className="title__container__products">
          <h3>Products</h3>
          <div className="viewAll__button">View All</div>
          <span></span>
          <div className="sort__button">
            Sort
            <img src={sort} alt="" />
          </div>
        </div>
        <div className="productsCard__container">
          {allProducts.map((product, index) => {
            return (
              <div className="productCard" key={index}>
                <div className="imageContainer__productCard">
                  <img src={product.img_url} alt="" />
                </div>
                <div className="productDetails__container__profileCard">
                  <h3>{product.product_name}</h3>
                  <p>{product.product_decsription}</p>
                  <h4>₹{product.product_price}</h4>
                  <div className="buttonsContainer__productCard">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${whatsappLink}&text=I%20would%20like%20to%20learn%20more%20about%20${product.product_name}%20(product)%20from%20ronedcard.com`}
                      className="sendEnquiry__button"
                    >
                      Send Enquiry
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;
