import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const authData = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      const data = await response.json();
      setName(data.name);
      setCategory(data.category);
      setCompany(data.company);
      setPrice(data.price);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "put",
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
      alert("product edited successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <input
        defaultValue={name}
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
        defaultValue={price}
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
        defaultValue={category}
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
        defaultValue={company}
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
      <button type="button" className="app-button" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
}
