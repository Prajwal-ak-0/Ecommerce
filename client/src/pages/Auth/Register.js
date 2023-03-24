import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import authStyles from '../../styles/authStyles.css'

const Register = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [phone,setphone]=useState("")
    const [address,setaddress]=useState("")
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const res=await axios.post("/api/v1/auth/register",{name,email,password,phone,address
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
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
        <div className="form-container">
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <div className="mb-3">
                    <input type="text" 
                    value={name}
                    onChange={(e)=> setname(e.target.value)}
                    className="form-control" id="exampleInputName1" placeholder='Name'
                    required/>
                </div>
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
                    <input type="text" 
                    value={phone}
                    onChange={(e)=> setphone(e.target.value)}
                    className="form-control" id="exampleInputPhone1" placeholder='Phone Number'
                    required />
                </div>
                <div className="mb-3">
                    <input type="text" 
                    value={address}
                    onChange={(e)=> setaddress(e.target.value)}
                    className="form-control" id="exampleInputAddress" placeholder='Address'
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Register