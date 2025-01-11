import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Mail, Pen, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'
import InstiBackground from "../../assets/institution_bg.jpg"
import UpdateProfileInstitution from './UpdateProfileInstitution'
import Activities from './Activities'

const ProfileInstitution = () => {
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
            <Navbar/>
                <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                    <div className='flex items-center gap-4 justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24 border border-gray-500">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile"/>
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p>{user?.profile?.bio}</p>
                            </div>
                            <Button onClick={() => setOpen(true)} className="text-right" variant='outline'><Pen/></Button>
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail/>
                            <span>{user?.email}</span>

                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Phone/>
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                </div>

                <div className='max-w-4xl mx-auto bg-white  rounded-3xl mb-10'>
                    <div className='flex justify-center max-w-4xl mx-auto bg-white rounded-2xl'>
                        <h1 className='font-bold text-lg mt-8 mb-5'>Activity Record</h1>
                    </div>
                    <Activities/>
                    <UpdateProfileInstitution open={open} setOpen={setOpen}/>
                </div>

                <Footer/>
        </div>
    )
}

export default ProfileInstitution