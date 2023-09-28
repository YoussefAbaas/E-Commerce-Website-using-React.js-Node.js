import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const authData = localStorage.getItem("user");
  const navigate = useNavigate();

  const collectData = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/add-product", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          category,
          company,
          userId: JSON.parse(authData)?._id,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      await response.json();
      alert("product added successfully");
      setName("");
      setCategory("");
      setCompany("");
      setPrice("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-product">
      <h1>Add Product</h1>
      <input
        value={name}
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        value={price}
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        value={category}
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        value={company}
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button type="button" className="app-button" onClick={collectData}>
        Add Product
      </button>
    </div>
  );
}
