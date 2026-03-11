import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App(){

  return(

    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProductList/>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <ProductForm/>
            </PrivateRoute>
          }
        />

        {/* ADD THIS ROUTE */}
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm/>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;