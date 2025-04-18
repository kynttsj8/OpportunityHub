import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Opportunity from './Opportunity';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import HomeBackground from "../assets/home_bg.jpg"

// this is the program page for guests and students
const Opportunities = () => {
    const { allOpportunities, searchedQuery } = useSelector(store => store.opportunity);
    const [filterOpportunities, setFilterOpportunities] = useState(allOpportunities);

    useEffect(() => {
        if (searchedQuery) {
            const filteredOpportunities = allOpportunities.filter((opportunity) => {
                return opportunity.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                opportunity.description.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                opportunity.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterOpportunities(filteredOpportunities);
        } else {
            setFilterOpportunities(allOpportunities);
        }

    }, [allOpportunities, searchedQuery])

    return (
        <div style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterOpportunities.length <= 0 ? <span>Program not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterOpportunities.map((opportunity) => (
                                            <motion.div 
                                                initial={{opacity:0, x:100}} 
                                                animate={{opacity:1, x:0}} 
                                                exit={{opacity:0, x:-100}}
                                                transition={{duration:0.3}}
                                                key={opportunity?._id}
                                                className="w-full h-full bg-white shadow-lg rounded-2xl border border-gray-400 overflow-hidden flex flex-col"
                                            >
                                                <Opportunity opportunity={opportunity} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Opportunities