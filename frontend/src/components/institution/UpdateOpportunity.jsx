import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { OPPORTUNITY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useGetOpportunityById from '@/hooks/useGetOpportunityById'
import LoginBackground from '../../assets/login_bg.jpg'
import Footer from '../shared/Footer'
import InstiBackground from "../../assets/institution_bg.jpg"

const UpdateOpportunity = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        description: '',
        location: '',
        requirements: '',
        type: '',
        position: '',
    });

    const { singleOpportunity } = useSelector(store => store.opportunity);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    useGetOpportunityById(params.id);

    const changeEventHandler = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("location", input.location);
        formData.append("requirements", input.requirements);
        formData.append("position", input.position);


        try {
            setLoading(true);
            const res = await axios.put(`${OPPORTUNITY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/institution/programs");
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
            title: singleOpportunity.title || "",
            description: singleOpportunity.description || "",
            requirements: singleOpportunity.requirements || "",
            location: singleOpportunity.location || "",
            type: singleOpportunity.type || "",
            position: singleOpportunity.position || "",
        })
    }, [singleOpportunity]);

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
            <Navbar />

            <div className=' max-w-xl mx-auto my-10'>
                <form 
                    onSubmit={submitHandler} 
                    style={{backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover'}}
                    className="border border-gray-400 rounded-xl p-4 my-10 bg-[#eaf3fa] shadow-2xl"
                >
                    <div className='flex items-center gap-5 p-6'>
                        <Button onClick={() => navigate("/institution/programs")} variant="outline" className="flex items-center gap-2  bg-gray-600 text-white rounded-xl hover:text-black font-semibold">
                            <ArrowLeft />
                            <span>Previous</span>
                        </Button>
                        <h1 className='font-bold text-xl '>Update Your Progam Details</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
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
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <Label>Type</Label>
                            <Input
                                type="text"
                                name="type"
                                value={input.type}
                                onChange={changeEventHandler}
                                className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                        <div>
                            <Label>Vacancies</Label>
                            <Input
                                type="text" 
                                name="position" 
                                value={input.position} 
                                onChange={changeEventHandler}
                                className="border-gray-300 rounded-xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button> : <Button type="submit" className="w-full my-4 rounded-xl text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl">Save Changes</Button>
                    }
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default UpdateOpportunity