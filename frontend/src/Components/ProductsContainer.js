import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductsContainer() {
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/products", {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "delete",
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = (id) => {
    navigate(`/update`, { state: { id } });
  };

  const searchHandler = async (searchTerm) => {
    try {
      if (searchTerm) {
        const response = await fetch(
          "http://localhost:4000/search/" + searchTerm,
          {
            headers: {
              authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } else fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="product-list">
      <h1>Products List</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search Product"
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
      />

      <div className="products-container">
        {products && products?.length === 0 ? (
          <h1>No results found</h1>
        ) : (
          products?.map((product, index) => {
            return (
              <ProductCard
                {...product}
                onDelete={deleteProduct}
                onUpdate={updateProduct}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
