import React from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import NoCompany from "../assets/no_company.png"

const Opportunity = ({opportunity}) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000*24*60*60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-300'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(opportunity?.createdAt) == 0 ? "Today" : `${daysAgoFunction(opportunity?.createdAt)} days ago`}</p>
                <Button variant="outline" className='rounded-full' size='icon'><Bookmark/></Button>
            </div>
            
            <div className='flex items-center gap-2 my-2'>
                
                    <Avatar>
                        <AvatarImage src={opportunity?.unit?.logo || NoCompany}/>
                    </Avatar>
                
                <div>
                    <h1 className='font-medium text-lg'>{opportunity?.unit?.name}</h1>
                    <p>{opportunity?.unit?.location}</p>
                </div>
            </div>
            
            <div className=''>
                <h1 className='font-bold text-lg my-2'>{opportunity?.title}</h1>
                <p className='text-sm text-gray-600'>{opportunity?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-600 font-bold' variant="ghost">{opportunity?.position} Vacancies</Badge>
                <Badge className='text-yellow-600 font-bold' variant="ghost">{opportunity?.type}</Badge>
                <Badge className='text-green-600 font-bold' variant="ghost">{opportunity?.location}</Badge>
            </div>

            <div className='my-2'>
                <Button className="mr-3 cursor-pointer hover:bg-[#d5e7f5] border-b-2" onClick={() => navigate(`/description/${opportunity?._id}`)}>Details</Button>
                {/* <Button className='bg-[#d5e7f5] hover:bg-[#04724d] hover:text-white'>Save For Later</Button> */}
            </div>
        </div>
    )
}

export default Opportunity