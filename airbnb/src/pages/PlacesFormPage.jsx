import { useState } from "react";
import {Navigate} from "react-router-dom";
import Perks from "./perks";
import PhotoUpload from "../PhotoUpload";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function PlacesFormPage(){
    const [title, setTitle]= useState('');
    const [address, setAddress]= useState('');
    const [addPhoto, setAddPhoto]= useState([]);
    
    const [description, setDescription]= useState('');
    const [perks, setPerks]= useState([]);
    const [extraInfo, setExtraInfo]= useState('');
    const [checkIn, setCheckIn]= useState('');
    const [checkOut, setCheckOut]= useState('');
    const [maxGuest, setMaxGuest]= useState(1);
    const [redirect, setRedirect]= useState(false);
    function inputHeader(text){
        return (
            <h2 className="text-lg mt-2 ">{text}</h2>
        )
    }
    function inputDescription(text){
        return (
            <p className="text-sm text-gray-500">{text}</p>
        )
    }
    function preInput(title, description){
        return (
            <div>
                {inputHeader(title)}
                {inputDescription(description)}
            </div>

        )
    }

    async function addNewPlace(ev){
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addPhoto, description,
            perks, extraInfo, checkIn, checkOut, maxGuest
        }); 
        setRedirect(true);
    }
    if(redirect) {
        return <Navigate to={'/account/places'} />
    }
    return(
        <div>
            <AccountNav/>
             <form onSubmit={addNewPlace}>
                        {preInput('Title','title for places')}
                        <input type="text" placeholder="title, for example" value={title} onChange={ev =>setTitle(ev.target.value)} />
                        {preInput('Address','address to this place')}
                        <input type="text" placeholder="address" value={address} onChange={ev =>setAddress(ev.target.value)} />
                        {preInput('Photo','more = better')}

                        <PhotoUpload addPhoto={addPhoto} setAddPhoto={setAddPhoto} />
                        {preInput('Descriptions','Descriptions of the places')}
                        <div>
                            <textarea value={description} onChange={ev =>setDescription(ev.target.value)} />
                        </div>
                        {preInput('Perks','select all your perks')}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('ExtraInfo','House rule, etc')}
                        <div>
                            <textarea value={extraInfo} onChange={ev =>setExtraInfo(ev.target.value)} />
                        </div>
                        {preInput('CheckIn&Out','add your check in, check out time and max guest')}
                        <div className="mt-2">
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <h3>Check in</h3>
                                    <input type="text" value={checkIn} onChange={ev =>setCheckIn(ev.target.value)} />
                                </div>
                                <div>
                                    <h3>Check out</h3>
                                    <input type="text" value={checkOut} onChange={ev =>setCheckOut(ev.target.value)}/>
                                </div>
                                <div>
                                    <h3>Max guest</h3>
                                    <input type="number" value={maxGuest} onChange={ev =>setMaxGuest(ev.target.value)} />
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
        </div>
    )
}