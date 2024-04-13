import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
 
export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    useEffect(() =>{
        axios.get('/places').then(({data}) =>{
            setPlaces(data);
        })
    },[])
    return (
        <div>
            <AccountNav/>
            <div className="mx-auto max-w-sm text-center">
                
                <br/>
            <Link  className=" bg-primary inline-flex px-6 py-2 rounded-full text-white " to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new places</Link>
            </div>
            <div>
                {places.length > 0 && places.map(place => (
                    <div>{place.title}</div>
                ))}
            </div>
        </div>
)}