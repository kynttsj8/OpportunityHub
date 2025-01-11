import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from './ui/avatar';
import NoCompany from "../assets/no_company.png"

const LatestOpporCards = ({ opportunity }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/description/${opportunity._id}`)} className='p-5 rounded-md shadow-xl bg-white border-gray-300 cursor-pointer'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={opportunity?.unit?.logo || NoCompany} />
        </Avatar>

        <div >
          <h1 className='font-medium text-lg'>{opportunity?.unit?.name}</h1>
          <p className='text-sm text-gray-500'>{opportunity?.location}</p>
        </div>
      </div>

      <div>
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

export default LatestOpporCards