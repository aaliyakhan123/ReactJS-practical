import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function ProductItem({ product }){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return(

    <div className="col-md-4 mb-4">

      <div className="card">

        <img
          src={product.image}
          className="card-img-top"
          style={{height:"200px",objectFit:"cover"}}
        />

        <div className="card-body">

          <h5>{product.title}</h5>
          <p>₹{product.price}</p>
          <p>{product.category}</p>

          <div className="d-flex gap-2">

            <button
              className="btn btn-success"
              onClick={()=>navigate(`/edit/${product.id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={()=>dispatch(deleteProduct(product.id))}
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProductItem;