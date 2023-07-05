import React, { useEffect, useState } from 'react'
import moment from "moment";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function AdminPanel() {
    const [collection, setCollection] = useState({})
    const params = useParams()
    const [images, setImages] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [isLink, setIsLink] = useState(false)

    const fetchCollection = async () => {
        const res = await axios.get('http://localhost:8080/api/collection' + (params.id ? `?id=${params.id}` : ''))
        setCollection(res.data)
    }

    const handleChanges = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) { // check if the name property contains a '.' character
            const [parent, child] = name.split('.'); // split the name into parent and child properties
            setCollection(prevState => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: type === 'checkbox' ? checked : value // update the child property with the new value
                }
            }));
        } else {
            setCollection({ ...collection, [name]: type === 'checkbox' ? checked : value }); // update the property with the new value
        }
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        if (images) images.forEach((file) => formData.append('images', file));
        if (pdf) formData.append('pdf', pdf);

        try {
            const res = await axios.post('http://localhost:8080/api/upload-collection-files' + (params.id ? `?id=${params.id}` : ''), formData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDataUpdate = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/update-data' + (params.id ? `?id=${params.id}` : ''), collection)
            if (images || pdf) await handleFileUpload()
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (date) => {
        if (date) return moment(date).format('YYYY-MM-DD')
        return ''
    }

    useEffect(() => {
        fetchCollection()
    }, [params.id])
    console.log(collection)

    const { maxPerWallet, contractAddress, conditions, whitelist, presale, publicMint } = collection


    return (
        <div className="container py-16 px-2">
            <div>
                <h2 className='font-mono my-5'>Upload multiple images</h2>
                <input
                    onChange={e => setImages(Array.from(e.target.files))}
                    className=''
                    type="file"
                    multiple="10"
                    accept=".jpg, .jpeg, .png"
                />

                <h2 className='font-mono my-5'>Max per wallet</h2>
                <input 
                    className='p-2 text-black' 
                    min={0} 
                    value={maxPerWallet || ''} 
                    onChange={handleChanges} 
                    type='number' 
                    name='maxPerWallet'
                />
            
                <h2 className='font-mono my-5'>Update contract address</h2>
                <input 
                    className='p-2 text-black' 
                    value={contractAddress || ''} 
                    onChange={handleChanges} 
                    name='contractAddress'
                />

                <h2 className='font-mono my-5'>Additional conditions data</h2>


                <div className="flex items-center mb-2">
                    <input id="link-checkbox" type="checkbox" onChange={() => setIsLink(!isLink)} value={isLink} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Use link instead</label>
                </div>
                {isLink ? (
                    <input
                        placeholder='link'
                        className='p-2 text-black'
                        value={conditions.link}
                        name='conditions.link'
                        onChange={handleChanges}
                    />

                ) : (
                    <input
                        onChange={e => setPdf(e.target.files[0])}
                        className=''
                        type="file"
                    />
                )}
            </div>
            <br />
            <div>
                <br />      

                <h2>Whitelist</h2>
                <label>Start Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="whitelist.startDate" value={formatDate(whitelist?.startDate) || ''} onChange={handleChanges} />
                <br />
                <label>End Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="whitelist.endDate" value={formatDate(whitelist?.endDate) || ''} onChange={handleChanges} />
                <br />
                <label>Is Running:</label>
                <input type="checkbox" className='m-2' name="whitelist.isRunning" checked={whitelist?.isRunning || false} onChange={handleChanges} />
                <br />
                <br />
                <br />
                <h2>Presale</h2>
                <label>Start Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="presale.startDate" value={formatDate(presale?.startDate) || ''} onChange={handleChanges} />
                <br />
                <label>End Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="presale.endDate" value={formatDate(presale?.endDate) || ''} onChange={handleChanges} />
                <br />
                <label>Is Running:</label>
                <input type="checkbox" className='m-2' name="presale.isRunning" checked={presale?.isRunning || false} onChange={handleChanges} />
                <br />
                
                <br />
                <br />

                <h2>Public Mint</h2>
                <label>Start Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="publicMint.startDate" value={formatDate(publicMint?.startDate) || ''} onChange={handleChanges} />
                <br />
                <label>End Date:</label>
                <input className='p-2 m-2 text-black' type="datetime" name="publicMint.endDate" value={formatDate(publicMint?.endDate) || ''} onChange={handleChanges} />
                <br />
                <label>Is Running:</label>
                <input type="checkbox" className='m-2' name="publicMint.isRunning" checked={publicMint?.isRunning || false} onChange={handleChanges} />
                <br />
            </div>
            <br />
            <br />
            <button
                onClick={handleDataUpdate}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                type='button'
            >
                Update
            </button>
        </div>
    )
}



