import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Action";

function Navbar(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container">

        <Link className="navbar-brand" to="/">
          ProductApp
        </Link>

        <div>

          <Link className="btn btn-light me-2" to="/">
            Products
          </Link>

          <Link className="btn btn-success me-2" to="/add">
            Add Product
          </Link>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;