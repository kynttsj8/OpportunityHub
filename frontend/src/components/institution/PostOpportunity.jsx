import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { OPPORTUNITY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'
import LoginBackground from '../../assets/login_bg.jpg'
import InstiBackground from "../../assets/institution_bg.jpg"

const PostOpportunity = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        title: '',
        location: '',
        description: '',
        requirements: '',
        type: '',
        position: '',
        skills: '',
        unitId: '',
    });

    const { units } = useSelector(state => state.unit);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedUnit = units.find((unit) => unit.name.toLowerCase() === value );
        setInput({...input, unitId:selectedUnit._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${OPPORTUNITY_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials:true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/institution/programs")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form 
                    onSubmit = {submitHandler} 
                    style={{backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover'}}
                    className='w-1/2 border border-gray-300 rounded-xl p-4 my-10 bg-[#eaf3fa] shadow-2xl'
                >
                    <div className='grid grid-cols-1 gap-2'>
                        {
                            units.length >= 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger  className="border-gray-300 rounded-xl bg-white shadow-xl my-1">
                                        <SelectValue placeholder="Select a unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className="bg-white ">
                                            {
                                                units.map((unit) => {
                                                    return (
                                                        <SelectItem className="text-blue-800" value={unit?.name?.toLowerCase()}>
                                                            {unit.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>

                        <div>
                            <Label>Type</Label>
                            <Input
                                type="text"
                                name="type"
                                value={input.type}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>
                        <div>
                            <Label>Vacancy</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset focus-visible:ring-0 my-1 border-gray-300 rounded-xl bg-white shadow-xl" />
                        </div>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button> : <Button type="submit"  className="w-full my-4 rounded-xl font-bold text-md text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl">Post Program</Button>
                    }

                    {
                        units.length === 0 && <p className='text-xs text-red-500 font-bold text-center my-3'>Please register the unit first before posting a program.</p>
                    }
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default PostOpportunity