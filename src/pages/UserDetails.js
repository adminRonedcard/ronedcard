import React, { useEffect, useState } from "react";
import user from "../assets/user.svg";
import logo from "../assets/Logo1.svg";
import photoIcon from "../assets/image.svg";
import locationImg from "../assets/location.svg";
import "./AuthStyles.css";
import "./UserDetails.css";
import SyncLoader from "react-spinners/SyncLoader";
import PulseLoader from "react-spinners/PulseLoader";
import Resizer from "react-image-file-resizer";
import axios from "axios";

function UserDetails() {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPinCode] = useState("");

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [usermob, setUsermob] = useState("");
  const [userid, setUserId] = useState("");

  const [imageFile, setImageFile] = useState("");

  const [isdetails, setIsdetails] = useState(false);

  const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(false);

  useEffect(() => {
    async function getLocationDetails() {
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

    if (location.length > 2) {
      getLocationDetails();
    }
  }, [location]);

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
            setImageFile(uri);
            setIsProfilePhotoUploaded(true);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
        setIsProfilePhotoUploaded(false);
      }
    }
  };

  useEffect(() => {
    window.onbeforeunload = function (e) {
      window.onunload = function () {
        window.localStorage.isMySessionActive = "false";
      };
      return undefined;
    };
    window.onload = function () {
      window.localStorage.isMySessionActive = "true";
    };
    var nameNew = localStorage.getItem("name");
    setName(nameNew);
    var newName = localStorage.getItem("username");
    setUserName(newName);
    var newMob = localStorage.getItem("usermob");
    setUsermob(newMob);
    var newid = localStorage.getItem("newuserid");
    setUserId(newid);
  }, []);

  const storeValues = () => {
    setEmail(document.getElementById("email").value);
    setBio(document.getElementById("bio").value);
    setProfession(document.getElementById("profession").value);
    setPinCode(document.getElementById("pincode").value);
    setCountry(document.getElementById("country").value);
    setState(document.getElementById("state").value);
    setDistrict(document.getElementById("city").value);
  };

  const storeLocation = () => {
    setLocation(document.getElementById("location").value);
  };

  async function uploadPhoto() {
    document.getElementById("loaderImage").style.display = "block";
    if (!imageFile === "") {
      setIsProfilePhotoUploaded(true);
    }
  }
  async function saveProfile() {
    uploadPhoto();
    if (isProfilePhotoUploaded) {
      document.getElementById("saveProfileLoader").style.display = "block";
      document.getElementById("saveProfileText").style.display = "none";
      let url = new URL("https://ronenestjs.herokuapp.com/profile/upsert");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userData: {
            email: email,
            profession: profession,
            bio: bio,
            img_url: imageFile,
            address: [
              {
                location: location,
                country: country,
                state: state,
                city: district,
                pincode: pincode,
              },
            ],
          },
        }),
      });
      const data = await response.json();
      if (data.status === 200) {
        document.getElementById("saveProfileLoader").style.display = "none";
        document.getElementById("saveProfileText").style.display = "block";
        window.location.href = "/profile";
      }
    } else {
      document.getElementById("saveProfileLoader").style.display = "none";
      document.getElementById("saveProfileText").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Please upload profile photo";
    }
  }

  useEffect(() => {
    if (email !== "") {
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        setIsdetails(true);
      } else {
        setIsdetails(false);
      }
      if (location !== "") {
        setIsdetails(true);
        if (profession !== "") {
          setIsdetails(true);
          setIsdetails(true);
          if (bio !== "") {
            setIsdetails(true);
            if (country !== "") {
              setIsdetails(true);
              if (state !== "") {
                setIsdetails(true);
                if (district !== "") {
                  setIsdetails(true);
                  if (pincode !== "") {
                    setIsdetails(true);
                  }
                }
              }
            }
          }
        }
      }
    }
  }, [email, location, bio, profession, country, state, district, pincode]);

  const saveClick = () => {
    if (
      email === "" ||
      location === "" ||
      profession === "" ||
      bio === "" ||
      country === "" ||
      country === "" ||
      state === "" ||
      district === "" ||
      state === "" ||
      district === "" ||
      pincode === ""
    ) {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Must fill all *Required fields";
    } else {
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        document.getElementById("errorMobile").style.display = "none";
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Email";
      }
      if (isdetails) {
        saveProfile();
      }
    }
  };

  return (
    <div className="userDetails">
      <div className="header__userDetails">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right"></div>
      </div>
      <div className="title__container__userDetails">
        <h2>Create Profile</h2>
      </div>
      <div className="userDetailsContainer">
        <div className="userImage__container__userDetails">
          <div
            className="userImage"
            style={{
              backgroundImage: `url(${imageFile !== "" ? imageFile : user})`,
            }}
          >
            <div className="loader__container" id="loaderImage">
              <SyncLoader color="#d52a33" />
            </div>
          </div>
          <div className="choosePhoto__Button__userDetails">
            <input
              type="file"
              name="file"
              id="inpFile"
              accept=".png"
              onChange={fileChangedHandler}
            />
            <img src={photoIcon} alt="" />
            Choose Photo
          </div>
        </div>
        <form autoComplete="off" className="form">
          <fieldset className="input__container">
            <legend>Name</legend>
            <div className="input__box">
              <input
                type="text"
                name="username"
                onChange={storeValues}
                defaultValue={name}
                maxLength="15"
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Mobile Number</legend>
            <div className="input__box">
              <input
                type="tel"
                name="mobile"
                onChange={storeValues}
                value={usermob}
                readOnly
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Email*</legend>
            <div className="input__box">
              <input
                id="email"
                type="email"
                name="email"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Profession*</legend>
            <div className="input__box">
              <input
                id="profession"
                type="text"
                name="profession"
                onChange={storeValues}
                maxLength={10}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Bio*</legend>
            <div className="input__box__textArea">
              <textarea
                name="bio"
                id="bio"
                cols="10"
                rows="3"
                maxLength="250"
                onChange={storeValues}
              ></textarea>
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Location*</legend>
            <div className="location__input__box">
              <input
                id="location"
                type="text"
                name="location"
                onChange={storeLocation}
              />
              <img src={locationImg} alt="" />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Country*</legend>
            <div className="input__box">
              <input
                id="country"
                type="text"
                name="country"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>State*</legend>
            <div className="input__box">
              <input
                id="state"
                type="text"
                name="state"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>City*</legend>
            <div className="input__box">
              <input id="city" type="text" name="city" onChange={storeValues} />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Pincode*</legend>
            <div className="input__box">
              <input
                id="pincode"
                type="text"
                name="pincode"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <div id="errorContainer" className="errorContainer">
            <p id="errorMobile">Enter a valid Email</p>
          </div>
          <div onClick={saveClick} className="saveProfileButton">
            <div className="loader__container__login" id="saveProfileLoader">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="saveProfileText">SAVE PROFILE</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
