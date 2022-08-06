import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header";
import "./AdminPanel.css";

const EmailUpdate = () => {
  const [roneId, setRoneId] = useState("");
  const [email, setEmail] = useState("");

  async function saveUpdatedMail() {
    if (roneId !== "" && email !== "") {
      let url = new URL(
        "https://ronedtest.herokuapp.com/update/roneuser_email_address"
      );
      url.search = new URLSearchParams({
        Roneid: roneId,
        email: email,
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data === 200) {
        document.getElementById("emailAlert").style.display = "block";
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        document.getElementById("emailAlert").innerHTML =
          "Already Updated Email!";
        document.getElementById("emailAlert").style.display = "block";
      }
    } else {
      console.log("unprocessble entity");
    }
  }

  const storeValues = () => {
    setRoneId(document.getElementById("roneId").value);
    setEmail(document.getElementById("email").value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <div className="email_upadeteContainer" style={{ marginTop: "200px" }}>
        <h3>Email Update</h3>
        <div className="emailUpdate_admin">
          <fieldset className="input__container__form__update">
            <legend>RONE ID</legend>
            <div className="input__box__form__update">
              <input
                onChange={storeValues}
                id="roneId"
                type="text"
                name="roneId"
              />
            </div>
          </fieldset>
          <fieldset className="input__container__form__update">
            <legend>Update Email</legend>
            <div className="input__box__form__update">
              <input
                onChange={storeValues}
                id="email"
                type="email"
                name="email"
              />
            </div>
          </fieldset>
        </div>

        <div onClick={saveUpdatedMail} className="updateProfileButton">
          <div className="loader__container__login" id="updateProfileLoader">
            <PulseLoader color="#ffffff" />
          </div>
          <p id="updateProfileText">UPDATE NOW</p>
        </div>
        <p className="emailAlert" id="emailAlert">
          Email Saved successfully
        </p>
      </div>
    </div>
  );
};

export default EmailUpdate;
