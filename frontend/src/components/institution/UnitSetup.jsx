import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UNIT_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useGetUnitById from '@/hooks/useGetUnitById'
import InstiBackground from "../../assets/institution_bg.jpg"
import Footer from '../shared/Footer'
import LoginBackground from '../../assets/login_bg.jpg'

const UnitSetup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    });

    const {singleUnit} = useSelector(store=>store.unit);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    useGetUnitById(params.id);

    const changeEventHandler = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if(input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${UNIT_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/institution/units");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleUnit.name || "",
            description: singleUnit.description || "",
            website: singleUnit.website || "",
            location: singleUnit.location || "",
            file: singleUnit.file || null
        })
    }, [singleUnit]);

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}> 
            <Navbar />

            <div className='max-w-xl mx-auto my-10'>
                <form 
                    onSubmit={submitHandler}
                    style={{backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover'}}
                    className="border border-gray-400 rounded-xl p-4 my-10 bg-[#eaf3fa] shadow-2xl"
                >
                    <div className='flex items-center gap-5 p-6'>
                  
                                  
                        <Button onClick={() => navigate("/institution/units")} variant="outline" className="flex items-center gap-2  bg-gray-600 text-white rounded-xl hover:text-black font-semibold">
                            <ArrowLeft />
                            <span>Previous</span>
                        </Button>
                        <h1 className='ml-16 font-bold text-xl '>Unit Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Unit Name</Label>
                            <Input 
                            type="text" 
                            ame="name" 
                            value={input.name} 
                            onChange={changeEventHandler} 
                            className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"/>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                            type="text" 
                            name="description" 
                            value={input.description} 
                            onChange={changeEventHandler} 
                            className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"/>
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input 
                            type="text" 
                            name="website" 
                            value={input.website} 
                            onChange={changeEventHandler}
                            className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                            type="text" 
                            name="location" 
                            value={input.location} 
                            onChange={changeEventHandler}
                            className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <Label>Unit Logo</Label>
                            <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={changeFileHandler}
                            className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button> : <Button type="submit"  className="w-full my-4 rounded-xl text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl"> Update</Button>
                    }
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default UnitSetup