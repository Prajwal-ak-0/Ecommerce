import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/authStyles.css'
import { useAuth } from '../../context/auth';

const Register = () => {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [auth,setAuth]=useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post("/api/v1/auth/login",{email,password
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token
                });
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate(location.state || "/");
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout title="Register">
        <div className="form-container" style={{ minHeight: "90vh" }}>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <div className="mb-3">
                    <input type="email" 
                    value={email}
                    onChange={(e)=> setemail(e.target.value)}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' 
                    required/>
                </div>
                <div className="mb-3">
                    <input type="password" 
                    value={password}
                    onChange={(e)=> setpassword(e.target.value)}
                    className="form-control" id="exampleInputPassword1" placeholder='Password' 
                    required
                    />
                </div>
                <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>Forgot</button>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Register