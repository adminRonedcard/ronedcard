/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import ClockLoader from "react-spinners/ClipLoader";
import "./ImageGalleryMain.css";
import sort from "../assets/sort.svg";
import image from "../assets/image.svg";
import deleteIcon from "../assets/delete.svg";
import Resizer from "react-image-file-resizer";
import BrowseImage from "./BrowseImage";

const ImageGalleryMain = () => {
  const [allImages, setAllImages] = useState([]);
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
            uploadeImage(uri);
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

  useEffect(() => {
    async function getAllImages() {
      const endpoint =
        "https://ronenestjs.herokuapp.com/image_Gallery/get_images";
      let url = new URL(endpoint);
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
    getAllImages();
  }, []);

  /* async function uploadPhotofromFiles() {
    console.log("access to UploadPhotofromFiles");
    document.getElementById("selectFromFileContainer").style.display = "flex";

    const endpoint = "https://ronedcard.herokuapp.com/self_upload-file";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: idForImg,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", inpFile.files[0]);

    console.log(formData);

    await axios.post(url, formData, config).then((res) => {
      const data = res.data;
      console.log(data);
      if (data.Result === "OK") {
        window.location.reload();
        document.getElementById("selectFromFileContainer").style.display =
          "none";
        setImgtest(data.path);
      }
    });
  } */

  async function uploadeImage(image) {
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
        img_url: image,
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.reload();
      document.getElementById("selectFromFileContainer").style.display = "none";
    } else if (data.status === 406) {
      alert(data.error);
    }
  }
  async function deleteImage(imgId) {
    let url = new URL(
      "https://ronenestjs.herokuapp.com/image_Gallery/delete_images"
    );
    // url.search = new URLSearchParams({
    //   img_id: imgId,
    // });
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        img_id: imgId,
      }),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.reload();
    } else if (data.status === 409) {
      alert(data.error);
    }
  }

  const sureDelete = (imgId) => {
    let confirmAction = confirm(`Are you sure to Delete?`);
    if (confirmAction) {
      deleteImage(imgId);
    }
  };

  /* const browseImageClick = () => {
    let browseContainer = document.getElementById("browseImageContainer");
    if (browseContainer.style.display === "flex") {
      browseContainer.style.display = "none";
    } else {
      browseContainer.style.display = "flex";
    }
  }; */

  return (
    <div className="imageGalleryMain" id="imageGallery">
      <div className="title__container__imageGalleryMain">
        <h3>Image Gallery</h3>
        <div className="viewAll__button">View All</div>
        <span></span>
        <div className="sort__button">
          Sort
          <img src={sort} alt="" />
        </div>
      </div>
      <div className="buttonContainer__imageGallery">
        <div className="AddPhotosButton">
          <input
            name="file"
            id="inpFile"
            accept=".png"
            type="file"
            onChange={fileChangedHandler}
          />
          <img src={image} alt="" />
          Upload Photo
        </div>
      </div>
      <BrowseImage />
      <div className="selectFromFile__container" id="selectFromFileContainer">
        <div className="loading__animation" id="loadingAnimation">
          <ClockLoader size={30} color="#d52a33" />
          <p> Uploading...</p>
        </div>
      </div>
      <div
        id="imageGalleryContent"
        className="content__container__imageGalleryMain"
      >
        {allImages
          .slice(0)
          .reverse()
          .map((imageData, index) => {
            return (
              <div
                key={index}
                style={{ backgroundImage: `url('${imageData.img_url}')` }}
                className="card__products__imageContainer"
              >
                <div
                  onClick={() => sureDelete(imageData._id)}
                  className="deleteButton deleteButtonImageGallery"
                >
                  <img src={deleteIcon} alt="" />
                  <p>Delete</p>
                </div>
                {/* <h4>Lorem Ipsum is simply dummy text of the</h4> */}
              </div>
            );
          })}
      </div>
      <div className="buttonContainer__imageContainer">
        <div id="loadMore__button" className="loadMore__button">
          Load More
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryMain;
