import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/navbar/Navbar";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import paperClip from "../assets/images/icon/paperclip.svg";

//api
import { API } from "../config/api";

export default function AddProduct() {
  const title = "Add Product";
  document.title = "Waysbucks | " + title;

  const [previewName, setPreviewName] = useState(""); //name
  const [preview, setPreview] = useState(null); //image

  //Store data product
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  }); 

  //handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    // if (e.target.type === "file") {
    //   let url = URL.createObjectURL(e.target.files[0]);
    //   setPreview(url);
    //   setPreviewName(e.target.files[0].name);
    // }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);

      // Insert category data
      await API.post("/product", formData, config);
      console.log(handleSubmit);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <NavBar />
      <Container className="addProductContainer">
        <div className="addProductLeft">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1>Add Film</h1>
            <Row className="d-flex">
              <Col>
            <input
            className="title"
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              />
                </Col>
                
              <input
                type="file"
                id="addProductImage"
                hidden
                className="photoProduct"
                name="image"
                onChange={handleChange}
                />
            <label
              htmlFor="addProductImage"
              className={previewName === "" ? "addProductImage" : "previewName"}
              >
              {previewName === "" ? "Attach Thumbnail" : previewName}
              <img src={paperClip} alt="paperClip" />
            </label>
              </Row>
            <input
              type="text"
              placeholder="Category"
              name="category"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Price"
              className="price"
              name="price"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Link Film"
              name="linkfilm"
              onChange={handleChange}
            />
              <textarea className="descrip"
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
            <button>Add Film</button>
          </form>
        </div>
        {preview && (
          <div className="addProductRight">
            <img src={preview} alt="preview" />
          </div>
        )}
      </Container>
    </>
  );
}
