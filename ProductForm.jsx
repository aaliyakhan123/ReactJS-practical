import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductForm(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title,setTitle] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [image,setImage] = useState("");

  useEffect(() => {

    if(id){
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setPrice(res.data.price);
          setCategory(res.data.category);
          setImage(res.data.image);
        });
    }

  }, [id]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if(!title || !price || !category || !image){
      alert("All fields required");
      return;
    }

    const productData = {
      id,
      title,
      price:Number(price),
      category,
      image
    };

    if(id){
      dispatch(updateProduct(productData));
    }else{
      dispatch(addProduct(productData));
    }

    navigate("/");
  };

  return(

    <div className="container mt-4">

      <h3>{id ? "Edit Product" : "Add Product"}</h3>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        <button className="btn btn-primary">
          {id ? "Update Product" : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default ProductForm;