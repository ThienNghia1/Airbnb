import { useContext, useState } from "react"
import {UserContext} from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
export default function ProfilePage(){

    const {ready, user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    if(!ready){
        return 'Loading...'
    }
    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!user && ready  && !redirect){
        return <Navigate to={'/login'} />
    }
    if(redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav/>
            <div className="max-w-lg mx-auto ">
                Logged in as {user.name}({user.email}) <br />
                <button onClick={logout} className="primary max-w-md mt-2">Logout</button>
            </div>      
        </div>
    )
}