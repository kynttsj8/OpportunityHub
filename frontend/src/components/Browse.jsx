import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Opportunity from './Opportunity'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/opportunitySlice'
import useGetAllOpportunities from '@/hooks/useGetAllOpportunities'
import HomeBackground from "../assets/home_bg.jpg"
import { motion } from 'framer-motion';
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
            allOpportunities.map((opportunity) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={opportunity?._id}
                className="w-full h-full bg-white shadow-lg rounded-2xl border border-gray-400 overflow-hidden flex flex-col"
              >

                <Opportunity key={opportunity._id} opportunity={opportunity} />
              </motion.div>

            ))
          }
        </div>



      </div>

      <Footer />
    </div>
  )
}

export default Browse