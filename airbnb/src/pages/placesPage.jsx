import { Link, useParams } from "react-router-dom";
import Perks from "./perks";
import { useState } from "react";
import axios from "axios";
export default function PlacesPage(){
    const {actions} = useParams();
    const [title, setTitle]= useState('');
    const [address, setAddress]= useState('');
    const [addPhoto, setAddPhoto]= useState([]);
    const [photoLink, setPhotoLink]= useState('');
    const [description, setDescription]= useState('');
    const [perks, setPerks]= useState([]);
    const [extraInfo, setExtraInfo]= useState('');
    const [checkIn, setCheckIn]= useState('');
    const [checkOut, setCheckOut]= useState('');
    const [maxGuest, setMaxGuest]= useState(1);

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
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddPhoto(prev=>{
            return [...prev,filename]
        })
        setPhotoLink('');
    }
    const handleImageUpload = event => {
        setIsLoading(true); // Start loading
    
        const files = event.target.files[0];
        const Data = new FormData();
        Data.append('photos', files);
    
        axios.post('/upload', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            const {data:filename} = response;
            setAddPhoto(prev=>{
                return [...prev,filename]
            })
            // Here you can update your state with the new image link
        });
    };
    return (
        <div>
            {actions !== 'new' && (
                <div className="mx-auto max-w-sm text-center">
                <Link  className=" bg-primary inline-flex px-6 py-2 rounded-full text-white " to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places</Link>
                </div>
            
            )}
            {actions === 'new' && (
                <div>
                    <form>
                        {preInput('Title','title for places')}
                        <input type="text" placeholder="title, for example" value={title} onChange={ev =>setTitle(ev.target.value)} />
                        {preInput('Address','address to this place')}
                        <input type="text" placeholder="address" value={address} onChange={ev =>setAddress(ev.target.value)} />
                        {preInput('Photo','more = better')}

                        <div className="flex gap-2">
                            <input type="text" className="" placeholder={'Add using a link ... jpg'} value={photoLink} onChange={ev =>setPhotoLink(ev.target.value)} />
                            <button onClick={addPhotoByLink} className="border rounded-full text-xl px-4 bg-gray-300 ">Add&nbsp;photo</button>
                        </div>
                        
                        <div className="flex gap-2 gird grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                            {addPhoto.length > 0 && addPhoto.map(link =>(
                                <div className="relative w-36 h-24 overflow-hidden">
                                    <img className="rounded-2xl w-auto h-auto object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <label className="flex items-center justify-between gap-2 text-xl border bg-transparent p-8 rounded-2xl cursor-pointer">
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                            Upload
                            </label>
                        </div>
                        {preInput('Descriptions','Descriptions of the places')}
                        <div>
                            <textarea value={description} onChange={ev =>setDescription(ev.target.value)} />
                        </div>
                        {preInput('Perks','select all your perks')}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                            <Perks/>
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
            )}

        </div>
)}