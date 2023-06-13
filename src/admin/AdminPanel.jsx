import React, { useState } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserProvider, ContractFactory} from 'ethers';
import abi from "../contract/abi.json"
import bytecode from "../contract/byteCode"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AdminPanel() {
    const initialInputValues = {
        name: "",
        contractId: '',
        maxPerWallet: '',
        price: '',
        presale:'',
        whitelist:"",
        date: "",
        image: null,

    };
    const initialContractValues = {
        publicMintPrice: "",
        whitelisteMintPrice: "",
        collectionSize: "",
        ReservedCollectionSize: "",
        NftPerWalletLimit: "",
        staticMetadata: '',
        currentBaseUri: "",
        collectionVisibility: "",
        oldCollections: "",
        haveOldCollections: "",
        onlyWhitelisted: ""

    }
    const [contractInputs, setContractInputs] = useState(initialContractValues)
    const [inputValues, setInputValues] = useState(initialInputValues);
    const [file, setFile] = useState();
    const [startDate, setStartDate] = useState(new Date());


    const handleValueChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === "file" ? event.target.files[0] : event.target.value;
        if (event.target && event.target.files && event.target.files[0]) {
            setFile({ ...file, [name]: event.target.files[0] });
            setInputValues({ ...inputValues, [name]: file });
        } else {
            setInputValues({ ...inputValues, [name]: value });
        }
    }

    const postData = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file.image);
        formData.append("name", inputValues.name);
        formData.append("contractId",inputValues.contractId);
        formData.append("maxPerWallet",inputValues.maxPerWallet);
        formData.append("presale",inputValues.presale);
        formData.append("whitelist",inputValues.whitelist);
    
        console.log(formData)
        try {
            await axios.post("http://localhost:8080/send-data", formData);
        } catch (error) {
            console.log(error);
        }

    }

    // web3 part 
    const handeContractInputs = (event) => {
        const name = event.target.name
        const value = event.target.value
        setContractInputs({ ...contractInputs, [name]: value })
    }

    const sendDataToContract = async (event) => {
        event.preventDefault();
        let arr = []
        let collectionsArray = contractInputs.oldCollections.split(",").map(item => item.replace(/\s/g, ""));
        arr.push(...collectionsArray);
        const provider = new BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        let signer;
        signer = provider.getSigner()
        const factory = new ContractFactory(abi, bytecode, signer);
        const contract = await factory.deploy(contractInputs.publicMintPrice, contractInputs.whitelisteMintPrice, contractInputs.collectionSize, contractInputs.ReservedCollectionSize, contractInputs.NftPerWalletLimit, contractInputs.staticMetadata, contractInputs.currentBaseUri, contractInputs.collectionVisibility, arr, contractInputs.haveOldCollections, contractInputs.onlyWhitelisted)
        console.log("Deployed Successfully  " + contract.address)
        const txHash = await contract.deployTransaction.hash
        console.log(txHash)
        toast.success("Contract Deployed Wait To Approve")



    }

    const saveCollection =(event) => {
        postData(event);
        // setInputValues(initialInputValues)
    }

    const submitContract = (event) => {
        sendDataToContract(event)
        setContractInputs(initialContractValues)
    }



    return (
        <>
            <div className="container py-16 px-2">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="dark"
                />
                {/* send data in smart contract  */}
                <form onSubmit={submitContract}>
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="number"
                                name="publicMintPrice"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="0.1.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Public Mint Price
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="whitelisteMintPrice"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="0.1.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Whitelisted Mint Price
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="collectionSize"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="1.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Collection Size
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="ReservedCollectionSize"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="0.1.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Reserved Collection Size
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="NftPerWalletLimit"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="1.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nft Per Wallet Limit
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="staticMetadata"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="metadata.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Static Metadata
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="currentBaseUri"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="uri..."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Current Base URI
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="oldCollections"
                                onChange={handeContractInputs}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="0x6sd4fg..,0x5425fdac.."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Old Collections
                            </label>
                        </div>
                            
                        <div className="relative z-0 w-full flex gap-4 mb-6 group">
                            <select className='w-full bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer' name="collectionVisibility" id="pet-select">
                                <option className='bg-gray-500' value="">Collection Visibility</option>
                                <option className='bg-gray-500' value="true">True</option>
                                <option className='bg-gray-500' value="false">False</option>
                            </select>
                        </div>
                        

                        <div className="relative z-0 w-full flex gap-4 mb-6 group">
                            <select className='w-full bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer' name="haveOldCollections" id="pet-select">
                                <option className='bg-gray-500' value="">Have Old Collections</option>
                                <option className='bg-gray-500' value="true">True</option>
                                <option className='bg-gray-500' value="false">False</option>
                            </select>
                        </div>
                        <div className="relative z-0 w-full flex gap-4 mb-6 group">
                            <select className='w-full bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer' name="onlyWhitelisted" id="pet-select">
                                <option className='bg-gray-500' value="">Only Whitelisted</option>
                                <option className='bg-gray-500' value="true">True</option>
                                <option className='bg-gray-500' value="false">False</option>
                            </select>
                        </div>
                    

                        
                    </div>

                    <div className="flex justify-center ">
                        <button type='submit' className="mt-6 bg-[#cccccc] px-16">
                            Submit Contract
                        </button>
                    </div>
                </form>

                {/* save collection on database  */}
                <form onSubmit={saveCollection}>
                    <div className="grid md:grid-cols-3 md:gap-6 mt-8">
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name='name'
                                onChange={handleValueChange}
                                value={inputValues.name}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="collection name..."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Collection Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name='contractId'
                                onChange={handleValueChange}
                                value={inputValues.contractId}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="0x8237bhd56..."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Contract Id
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="Number"
                                name='maxPerWallet'
                                onChange={handleValueChange}
                                value={inputValues.maxPerWallet}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="1..."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Max Per Wallet
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="Number"
                                name='price'
                                onChange={handleValueChange}
                                value={inputValues.price}
                                id="floating_first_name"
                                className="placeholder-transparent focus:placeholder-gray-500 block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer"
                                placeholder="1..."
                                required
                            />
                            <label
                                for="floating_first_name"
                                className="peer-focus:font-medium absolute text-base text-[#cccccc]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#FCC607] peer-focus:dark:text-[#FCC607] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Price
                            </label>
                        </div>

                        <div className="relative z-0 w-full flex gap-4 mb-6 group">
                            <select className='w-full bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer' name="whitelist" onChange={handleValueChange} id="pet-select">
                                <option className='bg-gray-500' value="">White List</option>
                                <option className='bg-gray-500' value="true">True</option>
                                <option className='bg-gray-500' value="false">False</option>

                            </select>
                        </div>

                        <div className="relative z-0 w-full flex gap-4 mb-6 group">
                            <select className='w-full bg-transparent border-0 border-b-2 border-[#cccccc] appearance-none dark:text-white  dark:focus:border-[#FCC607] focus:outline-none focus:ring-0 focus:border-[#FCC607] peer' onChange={handleValueChange} name="presale" id="pet-select">
                                <option className='bg-gray-500' value="">Pre Sale</option>
                                <option className='bg-gray-500' value="true">True</option>
                                <option className='bg-gray-500' value="false">False</option>

                            </select>
                        </div>


                        <div className="relative z-0 w-full mb-6 border-b-2 border-[#cccccc]">
                            <label htmlFor="hello">Hello</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="bg-transparent  text-[#cccccc] mt-3 w-full outline-none "
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 border-b-2 border-[#cccccc]">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="bg-transparent  text-[#cccccc] mt-3 w-full outline-none "
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 border-b-2 border-[#cccccc]">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="bg-transparent  text-[#cccccc] mt-3 w-full outline-none "
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 md:gap-6">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-white dark:text-white"
                                for="file_input"
                            >
                                Upload Image or Video(.mp4)
                            </label>
                            <input
                                className="placeholder-transparent focus:placeholder-gray-500 block w-full text-base text-[#cccccc] border border-[#cccccc] rounded-lg cursor-pointer  focus:outline-none"
                                id="file_input"
                                type="file"
                                name='image'
                                onChange={handleValueChange}
                                accept="image/*,video/*"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <button type='submit' className="mt-6 bg-[#cccccc] px-16">
                            Save Collection
                        </button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default AdminPanel

