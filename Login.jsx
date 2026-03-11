import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if(!email || !password){
      alert("Enter email and password");
      return;
    }

    try{

      const res = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );

      if(res.data.length === 0){
        alert("User not found");
        return;
      }

      const user = res.data[0];

      if(user.password !== password){
        alert("Invalid password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");

    }catch(error){
      console.log(error);
      alert("Login failed");
    }
  };

  return(

    <div className="container mt-5" style={{maxWidth:"400px"}}>

      <h3 className="mb-4 text-center">Login</h3>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3 text-center">
          Don't have account? <Link to="/signup">Signup</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;