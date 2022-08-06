/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BrowseImage.css";

const BrowseImage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const [selected, setSelected] = useState("");

  async function uploadPhotofromSearch() {
    console.log("access to UploadPhotofromSearch");
    let url = new URL(
      "https://ronenestjs.herokuapp.com/image_Gallery/add_image_gallery"
    );
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        img_url: selected,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      window.location.reload();
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  async function getImages() {
    console.log("access to getAllProducts");
    const endpoint = `https://pixabay.com/api/?key=26859092-1d81d0205355f0f05536e6fc2&q=${query}&image_type=photo`;

    await axios
      .get(endpoint)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setImages(data.hits);
      })
      .catch(console.error);
  }

  const selectImage = (data_url) => {
    setSelected(data_url);
  };

  useEffect(() => {
    if (selected !== "") {
      uploadPhotofromSearch();
    }
  }, [selected]);

  return (
    <div className="imageBrowseContainer">
      <div className="searchBar__container">
        <input
          type="search"
          placeholder="Million of royalty free images"
          onChange={handleChange}
        />
        <div onClick={getImages}>Search</div>
      </div>
      <div className="browseImageContainer">
        {images.map((data) => {
          return (
            <div
              onClick={() => selectImage(data.largeImageURL)}
              className="imageCard"
              style={{ backgroundImage: `url(${data.largeImageURL})` }}
              key={data.id}
            ></div>
          );
        })}
      </div>
      <div className="bottom__container__browse_image">
        <span></span>
      </div>
    </div>
  );
};

export default BrowseImage;
