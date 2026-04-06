import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/Auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleLogout=()=>{
        authService.logOut()
                    .then(()=>{
                        dispatch(logout());
                        navigate('/')
                    })
    }

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-red-700 hover:text-shadow-white rounded-full'
        onClick={handleLogout}>
            Logout
        </button>
    )
}
export default LogoutBtn;