import React from 'react'
import {NavLink} from 'react-router-dom'
import {GiShoppingBag} from "react-icons/gi"
import {useAuth} from "../../context/auth"
import toast from "react-hot-toast"
const Header = () => {
  const [auth,setAuth]=useAuth();
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    toast.success("Logout successfully")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
            <NavLink className="navbar-brand" ><GiShoppingBag/> No-Brand</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink  to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink  to="/category" className="nav-link " aria-current="page" >Category</NavLink>
                </li>
                {
                  !auth.user ? (<><li className="nav-item">
                  <NavLink  to="/register" className="nav-link " aria-current="page" >Sign Up</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink  to="/login" className="nav-link " aria-current="page" >Login</NavLink>
                  </li></>)
                   : 
                   (<li className="nav-item">
                  <NavLink onClick={handleLogout} to="/login" className="nav-link " aria-current="page" >LogOut</NavLink>
                  </li>)
                }
                <li className="nav-item">
                <NavLink  to="/cart" className="nav-link " aria-current="page" >Cart(0)</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>

    </div>
  )
}

export default Header