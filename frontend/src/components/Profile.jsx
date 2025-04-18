import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Mail, Pen, Phone } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedOpporTable from './AppliedOpporTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedOpportunities from '@/hooks/useGetAppliedOpportunities'
import HomeBackground from "../assets/home_bg.jpg"
// import BookmarkWindow from './bookmarkList/BookmarkWindow'

const isResume = true;

const Profile = () => {
    useGetAppliedOpportunities();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover', }}>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center gap-4 justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 border-gray-500">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right" variant='outline'><Pen /></Button>
                    </div>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>

                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Phone />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>

           
            {/* <div className='max-w-7xl mx-auto bg-white  rounded-3xl mb-10'>
                <div className='flex justify-center max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg mt-8 mb-5'>Your Bookmark List</h1>
                </div>
                

                <BookmarkWindow />
                
            </div> */}


            <div className='max-w-7xl mx-auto bg-white  rounded-3xl mb-10'>
                <div className='flex justify-center max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg mt-8 mb-5'>Applied Opportuntities</h1>
                </div>
                

                <AppliedOpporTable />
                
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>

            <Footer />
        </div>
    )
}

export default Profile