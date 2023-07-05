import React, { useEffect, useState } from 'react'
import moment from "moment";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function AdminPanel() {
    const [collections, setCollections] = useState([])

    const fetchAllCollection = async () => {
        const res = await axios.get('http://localhost:8080/api/all-collections')
        setCollections(res.data.map((item) => ({ name: item.name, id: item._id })))
    }

    const createNewCollection = async () => {
        const res = await axios.get('http://localhost:8080/api/create-collection')
        console.log(res.data.status)
        window.location.reload()
    }

    const editPage = (id) => {
        window.location.href = `/admin/${id}`
    }

    useEffect(() => {
        fetchAllCollection()
    }, [])


    return (
        <div className="container py-16 px-2">
        {/* new collection button */}
        <button onClick={createNewCollection} className='mb-5 rounded font-bold'>Create new collections</button>
            {collections.map((item, idx) => (
                <div key={idx} className="w-1/2 flex justify-between items-center border-b-2 border-gray-200 py-4">
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <h1 className="text-2xl font-bold cursor-pointer" onClick={() => editPage(item.id)}>{item.id}</h1>
                </div>
            ))}
        </div>
    )
}



