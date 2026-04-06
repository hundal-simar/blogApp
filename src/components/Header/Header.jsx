import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";

function Header(){
    const navigate = useNavigate();
    const authStatus=useSelector((state)=> state.auth.status)

    const navItems=[
        {name:"Home",
         slug:"/",
         active: true
        },
        {
          name:"Login",
            slug:"/login",
            active: !authStatus
        },
        {
           name:"Signup",
            slug:"/signup",
            active: !authStatus
        },
        {
            name:"All Posts",
            slug:"/all-posts",
            active: authStatus
        },
        {
            name:"Add Post",
            slug:"/add-post",
            active: authStatus
        }
    ]

    return(
        <header className="py-3 shadow bg-slate-900 text-white">
            <Container>
                <nav className="flex w-full items-center justify-between bg-deep-navy-500">
                       <div className="mr-4 mt-2">
                            <Link to="/"><Logo width="70 px"/></Link>
                       </div>
                       <ul className="flex">
                        {navItems.map((item)=> item.active ? (
                            <li key={item.name}>
                                <button onClick={()=> navigate(item.slug)}
                                className='inline-bock px-6 py-2 duration-200 hover:bg-white hover:text-black rounded-full'>{item.name}</button>
                            </li>
                        ): null )}
                        
                            {authStatus && (
                                <li >
                                    <LogoutBtn />
                                </li>
                            )}
                       </ul>
                </nav>
            </Container>
        </header>
    )

}

export default Header;