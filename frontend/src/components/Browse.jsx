import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Opportunity from './Opportunity'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/opportunitySlice'
import useGetAllOpportunities from '@/hooks/useGetAllOpportunities'
import HomeBackground from "../assets/home_bg.jpg"

const Browse = () => {
  useGetAllOpportunities();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allOpportunities } = useSelector(store => store.opportunity);
  
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, []);

  return (
    <div style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover' }}>
      <Navbar />

      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search result ({allOpportunities.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
          {
            allOpportunities.map((opportunity) => {
              return (
                <Opportunity key={opportunity._id} opportunity={opportunity} />
              )
            })
          }
        </div>



      </div>

      <Footer />
    </div>
  )
}

export default Browse