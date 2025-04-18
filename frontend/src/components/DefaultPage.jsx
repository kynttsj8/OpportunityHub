import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/opportunitySlice';
import { useNavigate } from 'react-router-dom';

const DefaultPage = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchOpportunityHandler = () => {
        dispatch(setSearchedQuery(query));
        console.log(query);
        
        navigate("/browse");
    }

    return (
        <div className="text-center">
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>You found yourself the best website!</span>
                <h1 className='text-[#19486A] text-5xl font-bold'>Access, Apply & <br/> Achieve Your <span className='text-[#FFD700]'>Dream Opportunity</span> </h1>
                {/* <p>Your kiss, my cheek, I watched you leave. Your smile my ghost, I fell to my knees. When you're young, you just run. But you come back to what you need</p> */}

                <div className='flex w-[40%] bg-white shadow-xl border border-[#19486A] pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input 
                    type='text' 
                    placeholder="Search your dream opportunities."
                    onChange={(e) => setQuery(e.target.value)}
                    className='bg-white outline-none border-none w-full'></input>

                    <Button onClick={searchOpportunityHandler} className='bg-[#FFD700] hover:bg-[#04724d] hover:text-white border border-gray-200 rounded-r-full'>
                        <Search className='h-5 w-5'></Search>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DefaultPage;