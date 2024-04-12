import { useState } from 'react';
import axios from "axios";

export default function PhotoUpload({addPhoto, setAddPhoto}){
    const [photoLink, setPhotoLink]= useState('');
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddPhoto(prev=>{
            return [...prev,filename]
        })
        setPhotoLink('');
    }
    function handleImageUpload(event) {
        const files = event.target.files;
        const data = new FormData();
        for( let i = 0; i < files.length; i++ ){
            data.append('photos', files[i]);
        }
        
        axios.post('/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            const {data:filenames} = response;
            setAddPhoto(prev=>{
                return [...prev, ...filenames]
            });
            // Here you can update your state with the new image link
        });
    };
    return(
        <>
            <div className="flex gap-2">
                <input type="text" className="" placeholder={'Add using a link ... jpg'} value={photoLink} onChange={ev =>setPhotoLink(ev.target.value)} />
                <button onClick={addPhotoByLink} className="border rounded-full text-xl px-4 bg-gray-300 ">Add&nbsp;photo</button>
            </div>
            <div className="flex gap-2 gird grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
                {addPhoto.length > 0 && addPhoto.map(link =>(
                    <div className="flex relative w-36 h-24 overflow-hidden">
                        <img className="rounded-2xl w-full h-auto object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
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
        </>
    )
}