import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../ui/badge'
import NoCompany from "../../../assets/no_company.png"
import { Button } from '@/components/ui/button';

const ProgramsAdmin = ({opportunity}) => {
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
                <Button className="mr-3 cursor-pointer hover:bg-[#d5e7f5] border-b-2" onClick={() => navigate(`/details/${opportunity?._id}`)}>Details</Button>
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

        </div>
    )
}

export default ProgramsAdmin