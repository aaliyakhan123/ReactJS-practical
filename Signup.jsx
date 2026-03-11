import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    if(!name || !email || !password){
      alert("All fields required");
      return;
    }

    const checkUser = await axios.get(
      `http://localhost:3000/users?email=${email}`
    );

    if(checkUser.data.length > 0){
      alert("User already exists");
      return;
    }

    await axios.post("http://localhost:3000/users",{
      name,
      email,
      password
    });

    alert("Signup successful");

    navigate("/login");
  };

  return(

    <div className="container mt-5">

      <h3>Signup</h3>

      <form onSubmit={handleSignup}>

        <input
          className="form-control mb-3"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn btn-success w-100">
          Signup
        </button>

        <p className="mt-3">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;