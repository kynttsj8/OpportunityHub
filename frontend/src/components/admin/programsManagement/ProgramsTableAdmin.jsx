import Opportunity from '@/components/Opportunity';
import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllOpportunities from '@/hooks/useGetAllOpportunities';
import ProgramsAdmin from './ProgramsAdmin';

const ProgramsTableAdmin = () => {
    const { allOpportunities } = useSelector(store => store.opportunity);
    useGetAllOpportunities();

    return (
        <div>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {
                        allOpportunities.length <= 0 ? <span>Program not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                {
                                    allOpportunities.map((opportunity) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={opportunity?._id}
                                            className=' p-4 rounded-md shadow-md'
                                        >
                                            <ProgramsAdmin opportunity={opportunity} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProgramsTableAdmin