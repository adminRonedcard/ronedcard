import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import PrimaryButton from "../components/PrimaryButton";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [number, setNumber] = useState("");
  const [isdetails, setIsdetails] = useState(false);
  const [newmob, setNewMob] = useState("");

  const [roneId, setRoneId] = useState("");
  const [pan, setPan] = useState("");

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
    var newmob = localStorage.getItem("newmob");
    setNewMob(newmob);

    var rone_id = localStorage.getItem("roneid");
    setRoneId(rone_id);
    var pan_id = localStorage.getItem("pan");
    setPan(pan_id);
  }, []);
  async function handleSubmit() {
    document.getElementById("loaderRegisterUser").style.display = "block";
    document.getElementById("RegisterUser").style.display = "none";
    const res = await fetch(
      "https://ronenestjs.herokuapp.com/new_user/create_user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userData: {
            name: name,
            contact: number,
            userName: username,
            registered: true,
          },
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      localStorage.setItem("usermob", number);
      document.getElementById("loaderRegisterUser").style.display = "none";
      document.getElementById("RegisterUser").style.display = "block";
      window.location.href = "/userdetails";
    } else if (data.status === 401) {
      if (data.error === "contact already exists!") {
        document.getElementById("loaderRegisterUser").style.display = "none";
        document.getElementById("RegisterUser").style.display = "block";
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML = data.error;
      }
      if (data.error === "userName already exists!") {
        document.getElementById("loaderRegisterUser").style.display = "none";
        document.getElementById("RegisterUser").style.display = "block";
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML = data.error;
      }
    }
  }

  /* first call roneidDetails */
  // eslint-disable-next-line no-unused-vars
  async function roneidDetails() {
    document.getElementById("loaderRegisterUser").style.display = "block";
    document.getElementById("RegisterUser").style.display = "none";

    const res = await fetch(
      "https://ronedcard.herokuapp.com/we_can_try_roneuser_verification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rone_id: roneId,
          pancard: pan,
          mobile_number: number,
          status_verification: "pending",
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.data.status_verification === "pending") {
      document.getElementById("statusMessage").style.display = "block";
      document.getElementById("statusMessage").innerHTML = "REQUEST PENDING...";
      document.getElementById("statusMessage").style.color = "#e1c80b";
    }
    if (data.data.status_verification === "rejected") {
      document.getElementById("statusMessage").style.display = "block";
      document.getElementById("statusMessage").innerHTML =
        "REQUEST REJECTED...";
      document.getElementById("statusMessage").style.color = "#FF0000";
    }
    if (data.data.status_verification === "success") {
      document.getElementById("statusMessage").style.display = "block";
      document.getElementById("statusMessage").innerHTML =
        "REQUEST APPROVED...";
      document.getElementById("statusMessage").style.color = "#4BB543";
      /* if request success create user */

      /* registerClick(); */
    }
  }

  useEffect(() => {
    if (name !== "") {
      if (number !== "") {
        let isnum = /^\d+$/.test(number);
        if (number.length === 10) {
          if (isnum) {
            setIsdetails(true);
          } else {
            setIsdetails(false);
          }
        } else {
          setIsdetails(false);
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [name, number]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setNumber(document.getElementById("number").value);
    setusername(document.getElementById("username").value);
  };

  const registerClick = () => {
    if (name === "" || number === "" || username === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Must fill all *Required fields";
    } else {
      let isnum = /^\d+$/.test(number);
      if (number.length === 10) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
      }
      if (name === "") {
        document.getElementById("errorName").style.display = "block";
        document.getElementById("errorName").innerHTML = "Name required";
      }
      if (number === "") {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Mobile Number required";
      }
      if (isdetails) {
        handleSubmit();
      }
    }
  };

  return (
    <div
      className="bodyRegister"
      style={{ backgroundImage: `url('/registerBg.png')` }}
    >
      <div className="header__bodyRegister">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right">
          <Link className="loginButton__container" to="/login">
            <PrimaryButton content="Login" />
          </Link>
          <div className="header__menu__container">
            <img src={menu} alt="" />
          </div>
        </div>
      </div>
      <div className="content__bodyRegister">
        <div className="image__container__bodyRegister">
          <img src={register} alt="" />
        </div>
        <div className="inputs__container__bodyRegister">
          <h2>Register Now</h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>Mobile Number</legend>
              <div className="input__box">
                <input
                  value={newmob}
                  onChange={storeValues}
                  id="number"
                  type="text"
                  readOnly
                />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Name*</legend>
              <div className="input__box">
                <input
                  maxLength="15"
                  onChange={storeValues}
                  id="name"
                  type="text"
                />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Username*</legend>
              <div className="input__box">
                <input
                  maxLength="12"
                  onChange={storeValues}
                  id="username"
                  type="text"
                />
              </div>
            </fieldset>
            <div id="errorContainer" className="errorContainer">
              <p id="errorName">Enter a valid Email</p>
              <p id="errorMobile">Enter a valid Mobile Number</p>
            </div>
            <div onClick={registerClick} className="register__button__form">
              <div className="loader__container__login" id="loaderRegisterUser">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="RegisterUser">REGISTER</p>
            </div>
          </form>
          <div className="statusContainer">
            <p id="statusMessage">REQUEST PENDING...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
