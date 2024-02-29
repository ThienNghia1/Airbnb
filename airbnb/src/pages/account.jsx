import { useContext, useState } from "react"
import {UserContext} from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
export default function AccountPage(){
    const {ready, user} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let {subpage} = useParams()
    if(subpage=== undefined)
        subpage = 'profile'
    if(!ready){
        return 'Loading...'
    }
    async function Logout(){
        await axios.post('/logout')
        setRedirect("/");
    }
    if (!user && ready){
        return <Navigate to={'/login'} />
    }

    function LinkClasses (type=null) {
        let classes = "py-2 px-6"
        if(type=== subpage) 
            classes+= " bg-primary text-white rounded-full"
        return classes
    }
    if(redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap 2 mb-4">
                <Link className={LinkClasses('profile')} to="/account">My profile</Link>
                <Link className={LinkClasses('booking')} to={'/account/booking'} >My booking</Link>
                <Link className={LinkClasses('places')} to={'/account/places'}>My accommodation</Link>
            </nav>
            {subpage === 'profile' && (
                    <div className="max-w-lg mx-auto ">
                        Logged in as {user.name}({user.email}) <br />
                        <button onClick={Logout} className="primary max-w-md mt-2">Logout</button>
                    </div>
            
                )}
        </div>
    )
}