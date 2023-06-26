import React, { useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AdminPanel() {
    const [images, setImages] = useState([])
    const [maxPerWallet, setMaxPerWallet] = useState(0)
    const [contractAddress, setContractAddress] = useState('')
    const [conditions, setConditions] = useState({ link: '', pdf: '' })

    const handleImageUpload = async () => {
        const formData = new FormData();
        images.forEach((file) => formData.append('images', file));

        try {
            const res = await axios.post('http://localhost:8080/api/upload-collection-images', formData)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDataUpdate = async (obj) => {
        try {
            const res = await axios.post('http://localhost:8080/api/update-data', obj)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const prepareConditionsData = async () => {
        const formData = new FormData();
        formData.append('link', conditions.link);
        formData.append('pdf', conditions.pdf);
        handleDataUpdate(formData)
    }


    return (
        <div className="container py-16 px-2">
            <div>
                <h2 className='font-mono my-5'>Upload multiple images</h2>
                <input
                    onChange={e => setImages(Array.from(e.target.files))} 
                    className='p-2' 
                    type="file" 
                    multiple="10" 
                    accept=".jpg, .jpeg, .png"  
                />

                <button 
                    onClick={handleImageUpload}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                    type='button'
                >
                    Upload
                </button>
            </div>

            <div>
                <h2 className='font-mono my-5'>Max per wallet</h2>
                <input className='p-2 text-black' min={0} value={maxPerWallet} onChange={e => setMaxPerWallet(e.target.value)} type='number' />

                <button
                    onClick={() => handleDataUpdate({ maxPerWallet })}
                    className='mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='button'
                >
                    Update
                </button>
            </div>

            <div>
                <h2 className='font-mono my-5'>Update contract address</h2>
                <input className='p-2 text-black' value={contractAddress} onChange={e => setContractAddress(e.target.value)} />

                <button
                    onClick={() => handleDataUpdate({ contractAddress })}
                    className='mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='button'
                >
                    Update
                </button>
            </div>

            <div>
                <h2 className='font-mono my-5'>Additional conditions data</h2>
                <input placeholder='link' className='p-2 text-black' value={conditions.link} onChange={e => setConditions({ ...conditions, link: e.target.value })} />
                <input
                    onChange={e => setConditions({ ...conditions, pdf: e.target.files[0] })}
                    className='p-2'
                    type="file"
                />
                <button
                    onClick={prepareConditionsData}
                    className='mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='button'
                >
                    Update
                </button>
            </div>
        </div>
    )
}



