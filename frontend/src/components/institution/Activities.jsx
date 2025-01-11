import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Activities = () => {
        const navigate = useNavigate();
    const { units } = useSelector(store => store.unit);
    const { allInstiOpportunities } = useSelector(store => store.opportunity);

    
    return (
        <div className=' max-w-7xl mx-10 '>
            <Table>
                <TableCaption className='mb-5'>A list of your activities record</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead>Activities</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>You have been working for</TableCell>
                        <TableCell>
                            <span className='font-bold'>{units.length}</span> {units.length <= 1 ? 'unit' : 'units'}
                        </TableCell>
                        <TableCell  className='text-right hover:text-blue-600 hover:font-bold' >
                            <div onClick={() => navigate(`/institution/units`)} className='flex items-center gap-2'>
                                <Eye className='w-5 ml-auto' />
                                <span>View All</span>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>You have posted</TableCell>
                        <TableCell>
                            <span className='font-bold'>{allInstiOpportunities.length}</span> {allInstiOpportunities.length <= 1 ? 'program' : 'programs'} 
                        </TableCell>
                        <TableCell className='text-right hover:text-blue-600 hover:font-bold'>
                        <div onClick={() => navigate(`/institution/programs`)} className='flex items-center gap-2'>
                                <Eye className='w-5 ml-auto' />
                                <span>View All</span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
        </div>
    )
}

export default Activities