import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductItem from "./ProductItem";

function ProductList(){

  const dispatch = useDispatch();

  // IMPORTANT: correct selector
  const products = useSelector(state => state.products.products) ?? [];

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("");
  const [sort,setSort] = useState("");

  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);

  let filtered = products
    .filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      category ? p.category === category : true
    );

  if(sort === "low"){
    filtered = [...filtered].sort((a,b)=>a.price-b.price);
  }

  if(sort === "high"){
    filtered = [...filtered].sort((a,b)=>b.price-a.price);
  }

  return(

    <div className="container mt-4">

      <h3>Products</h3>

      <input
        className="form-control mb-2"
        placeholder="Search product"
        onChange={(e)=>setSearch(e.target.value)}
      />

      <select
        className="form-control mb-2"
        onChange={(e)=>setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
      </select>

      <select
        className="form-control mb-3"
        onChange={(e)=>setSort(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <div className="row">

        {filtered.map(p => (
          <ProductItem key={p.id} product={p}/>
        ))}

      </div>

    </div>

  );
}

export default ProductList;