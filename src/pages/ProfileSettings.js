/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import SyncLoader from "react-spinners/SyncLoader";
import "./ProfileSettings.css";
import locationImg from "../assets/location.svg";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import camera from "../assets/camera.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import youtube from "../assets/youtube.svg";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import photoIcon from "../assets/image.svg";

const EditProfile = () => {
  const [imageFile, setImageFile] = useState("");

  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const [pincode, setPinCode] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const [img, setImg] = useState("");

  const [idForUpdate, setIdForUpdate] = useState();

  useEffect(() => {
    let url = new URL("https://ronenestjs.herokuapp.com/profile/getuser_data");
    url.search = new URLSearchParams({
      id: localStorage.getItem("roneid"),
    });
    const getUser = async () => {
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await req.json();
      console.log(data);
      if (data.status === 200) {
        setImg(data.userData.img_url);
        setName(data.userData.name);
        setProfession(data.userData.profession);
        setLocation(data.userData.address[0].location);
        setBio(data.userData.bio);
        setEmail(data.userData.email);
        setCountry(data.userData.address[0].country);
        setDistrict(data.userData.address[0].distric);
        setState(data.userData.address[0].state);
        setPinCode(data.userData.address[0].pincode);
        setFacebookLink(data.userData.socialLinks[0].facebook);
        setLinkedInLink(data.userData.socialLinks[0].linkedIn);
        setTwitterLink(data.userData.socialLinks[0].twitter);
        setWhatsappLink(data.userData.socialLinks[0].whatsapp);
        setInstagramLink(data.userData.socialLinks[0].instagram);
        setTelegramLink(data.userData.socialLinks[0].telegram);
        setYoutubeLink(data.userData.socialLinks[0].youtube);
      } else if (data.statusCode === 401) {
        // window.location.href = "/login";
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    async function getLocationDetails() {
      console.log("access to getAllProducts");
      const endpoint = `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}%20&format=json&apiKey=41ff15ef6d914c4aa4d53d1c7c848744`;
      await axios
        .get(endpoint)
        .then((res) => {
          const data = res.data;
          if (data.results) {
            setCountry(data.results[0].country);
            setState(data.results[0].state);
            setDistrict(data.results[0].county);
          }
        })
        .catch(console.error);
    }

    if (location !== "" && location !== undefined) {
      if (location.length > 2) {
        getLocationDetails();
      }
    }
  }, [location]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setProfession(document.getElementById("profession").value);
    setBio(document.getElementById("bio").value);
    setPinCode(document.getElementById("pincode").value);
    setEmail(document.getElementById("email").value);
  };

  const storeLocation = () => {
    setLocation(document.getElementById("location").value);
  };

  const storeLinks = () => {
    setFacebookLink(document.getElementById("facebookLink").value);
    setLinkedInLink(document.getElementById("linkedInLink").value);
    setTwitterLink(document.getElementById("twitterLink").value);
    setWhatsappLink(document.getElementById("whatsappLink").value);
    setInstagramLink(document.getElementById("instagramLink").value);
    setTelegramLink(document.getElementById("telegramLink").value);
    setYoutubeLink(document.getElementById("youtubeLink").value);
  };

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          200,
          200,
          "JPEG",
          100,
          0,
          (uri) => {
            setImg(uri);
            setIsProfileChanged(true);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  async function updateProfile() {
    document.getElementById("updateProfileLoader").style.display = "block";
    document.getElementById("updateProfileText").style.display = "none";
    let url = new URL("https://ronenestjs.herokuapp.com/profile/upsert");

    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userData: {
          name: name,
          email: email,
          profession: profession,
          bio: bio,
          img_url: img,
          address: [
            {
              location: location,
              country: country,
              state: state,
              city: district,
              pincode: pincode,
            },
          ],
          socialLinks: [
            {
              facebook: facebookLink,
              linkedIn: linkedInLink,
              twitter: twitterLink,
              whatsapp: whatsappLink,
              instagram: instagramLink,
              telegram: telegramLink,
              youtube: youtubeLink,
            },
          ],
        },
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      document.getElementById("updateProfileLoader").style.display = "none";
      document.getElementById("updateProfileText").style.display = "block";
      window.location.href = "/profile";
    }
    if (data.status === 409) {
      document.getElementById("errorProfileEdit").style.display = "block";
      document.getElementById("errorProfileEdit").innerHTML = data.error;
    }
    if (data.statusCode === 401) {
      window.location.href = "/login";
    }
  }

  return (
    <div className="settingsPage">
      <Header />
      <div
        className="bgContainer__settings"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2>Settings</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <p className="activeHeader titleHeaderlink">Profile</p>
            <Link
              to="/settings/Accont"
              className="accountSettings titleHeaderlink"
            >
              Account
            </Link>
            <Link
              to="/settings/Wallet"
              className="walletSettings titleHeaderlink"
            >
              Wallet
            </Link>
            <Link
              to="/settings/QR-code"
              className="themesSettings titleHeaderlink"
            >
              QR Code
            </Link>
          </div>
          <div className="profileImageContainer__form__update">
            <div
              className="imageUpdateContainer"
              style={{
                backgroundImage: `url(${imageFile !== "" ? imageFile : img})`,
              }}
            >
              <div className="loader__container" id="loaderImage">
                <SyncLoader color="#d52a33" />
              </div>
            </div>
            <div className="cameraIcon__container">
              <input
                type="file"
                name="file"
                id="inpFile"
                accept="*"
                onChange={fileChangedHandler}
              />
              <img src={camera} alt="" />
            </div>
            <div className="inputboxContainers__update">
              <form autoComplete="off" className="form__update">
                <fieldset className="input__container__form__update">
                  <legend>Name</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="name"
                      type="text"
                      name="username"
                      defaultValue={name}
                      maxLength="15"
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Profession</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="profession"
                      type="text"
                      name="profession"
                      maxLength="18"
                      defaultValue={profession}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Email</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="email"
                      type="text"
                      name="email"
                      defaultValue={email ? email : ""}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update__textare">
                  <legend>Bio</legend>
                  <div className="input__box__form__update__textArea">
                    <textarea
                      onChange={storeValues}
                      name="bio"
                      id="bio"
                      defaultValue={bio}
                      maxLength="250"
                    ></textarea>
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Location</legend>
                  <div className="input__box__form__update__location">
                    <input
                      onChange={storeLocation}
                      id="location"
                      type="text"
                      name="location"
                      defaultValue={location}
                    />
                    <img src={locationImg} alt="" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Country</legend>
                  <div className="input__box__form__update">
                    <input
                      id="country"
                      type="text"
                      value={country !== "" ? country : ""}
                      name="country"
                      readOnly
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>State</legend>
                  <div className="input__box__form__update">
                    <input
                      id="state"
                      value={state !== "" ? state : ""}
                      type="text"
                      name="state"
                      readOnly
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>City</legend>
                  <div className="input__box__form__update">
                    <input
                      id="city"
                      value={district !== "" ? district : ""}
                      type="text"
                      name="city"
                      readOnly
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Pincode</legend>
                  <div className="input__box__form__update">
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      onChange={storeValues}
                      defaultValue={pincode}
                    />
                  </div>
                </fieldset>
                <div className="socialContainerTitle">
                  <span></span>
                  <div className="socialMedia">Social Media</div>
                </div>
                <div className="socialLinksinputContainer">
                  <img src={facebook} alt="" />
                  <input
                    id="facebookLink"
                    type="text"
                    placeholder="Enter your facebook username"
                    onChange={storeLinks}
                    defaultValue={facebookLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={linkedin} alt="" />
                  <input
                    id="linkedInLink"
                    type="text"
                    placeholder="Enter your LinkedIn link"
                    onChange={storeLinks}
                    defaultValue={linkedInLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={twitter} alt="" />
                  <input
                    id="twitterLink"
                    type="text"
                    placeholder="Enter your Twitter username"
                    onChange={storeLinks}
                    defaultValue={twitterLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={whatsapp} alt="" />
                  <input
                    id="whatsappLink"
                    type="text"
                    placeholder="Enter Whatsapp number with Country code"
                    onChange={storeLinks}
                    defaultValue={whatsappLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={instagram} alt="" />
                  <input
                    id="instagramLink"
                    type="text"
                    placeholder="Enter your Instagram username"
                    onChange={storeLinks}
                    defaultValue={instagramLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={telegram} alt="" />
                  <input
                    id="telegramLink"
                    type="text"
                    placeholder="Enter your Telegram username"
                    onChange={storeLinks}
                    defaultValue={telegramLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={youtube} alt="" />
                  <input
                    id="youtubeLink"
                    type="text"
                    placeholder="Youtube link"
                    onChange={storeLinks}
                    defaultValue={youtubeLink}
                  />
                </div>
                <p id="errorProfileEdit" className="errorProfileEdit">
                  Please fill all social links fields
                </p>
                <div onClick={updateProfile} className="updateProfileButton">
                  <div
                    className="loader__container__login"
                    id="updateProfileLoader"
                  >
                    <PulseLoader color="#ffffff" />
                  </div>
                  <p id="updateProfileText">UPDATE PROFILE</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footerContainerProfileSettings">
        <Footer />
      </div> */}
    </div>
  );
};

export default EditProfile;
