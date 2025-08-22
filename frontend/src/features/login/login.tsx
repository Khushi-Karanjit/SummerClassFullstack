import type { AxiosError, AxiosResponse } from "axios";
import "./login.css"
import { useState, type ChangeEvent, type FormEvent } from "react";
import {loginApi} from "../../config/api"
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res: AxiosResponse = await loginApi(formData);
console.log("login response", res.data); 
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      navigate("/home");
    } catch (err) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Login failed. Please try again.";
      alert(message);
      console.error(error);
    }
  };



    return (
     <div className="body">
        <div className="Container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <input onChange={handleChanges} name="username" value={formData.username} placeholder="Username" type="text" />
            <input onChange={handleChanges} name="password" value={formData.password} placeholder="Password" type="password" />
            <button type="submit" id="btn">Submit</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don’t have an account? <a href="/register">Register</a>
            </p>

</div> 
        </div>
    )
}

export default Login;