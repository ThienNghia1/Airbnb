import { Link, useParams } from "react-router-dom";


export default function PlacesPage(){
    const {actions} = useParams();
    console.log(actions);
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
                        <h2 className="text-lg mt-2 ">Title</h2>
                        <p className="text-sm text-gray-500">title for places</p>
                        <input type="text" placeholder="title, for example" />
                        <h2 className="text-lg mt-2">Address</h2>
                        <p className="text-sm text-gray-500">address to this place</p>
                        <input type="text" placeholder="address" />
                        <h2 className="text-lg mt-2">Photo</h2>
                        <p className="text-sm text-gray-500">more = better</p>
                        <div className="flex gap-2">
                            <input type="text" className="" placeholder={'Add using a link ... jpg'} />
                            <button className="border rounded-full text-xl px-4 bg-gray-300 ">Add photo</button>
                        </div>
                        <div className="  gird grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className=" justify-between flex gap-2 text-xl border bg-transparent p-10 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            Upload
                            </button>
                        </div>
                        <h2  className="text-lg mt-2">Descriptions</h2>
                        <div>
                            <p className="text-sm text-gray-500">Descriptions of the places</p>
                            <textarea />
                        </div>
                        <h2  className="text-lg mt-2">Perks</h2>
                        <div>
                            <p className="text-sm text-gray-500">select all your perks</p>
                            <textarea />
                        </div>
                        </form>
                </div>
            )}

        </div>
)}