import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, Eye, FileUser, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteOpportunityById } from '@/redux/opportunitySlice'
import OpportunityDialog from './OpportunityDialog'

const InstiOpportunitiesTable = ({ crawledData = [] }) => {
    const [open, setOpen] = useState(false);
    const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
    const { allInstiOpportunities, searchOpportunityByText } = useSelector(store => store.opportunity);
    const [ filterOpportunities, setFilterOpportunities ] = useState(allInstiOpportunities);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        const filterOpportunities = allInstiOpportunities.length >= 0 && allInstiOpportunities.filter((opportunity) => {
            if (!searchOpportunityByText) {
                return true
            };
            return opportunity?.title?.toLowerCase().includes(searchOpportunityByText.toLowerCase()) || opportunity?.unit?.name.toLowerCase().includes(searchOpportunityByText.toLowerCase());
        });
        setFilterOpportunities(filterOpportunities);
    }, [allInstiOpportunities, searchOpportunityByText])

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this program?");
        if (confirmed) {
            dispatch(deleteOpportunityById(id));
        }
    };

    return (
        <div className=' max-w-6xl mx-auto '>
            <Table>
                <TableCaption className="mb-5">A list of your recent posted programs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Unit Name</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Posted on</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterOpportunities?.map((opportunity) => (
                            <tr className="hover:text-blue-600">
                                <TableCell>{opportunity?.unit?.name}</TableCell>
                                <TableCell>{opportunity?.title}</TableCell>
                                <TableCell>{opportunity?.createdAt ? opportunity.createdAt.split("T")[0] : ''}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white">
                                            <div onClick={() => navigate(`/institution/programs/${opportunity._id}/update`) } className='flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600 hover:font-bold'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>   
                                            </div>
                                            <div onClick={() => {setOpen(true); setSelectedOpportunityId(opportunity._id); }} className='flex items-center gap-2 mt-2 w-fit cursor-pointer hover:text-blue-600 hover:font-bold'>
                                                <Eye className='w-4' />
                                                <span>Details</span>   
                                            </div>
                                            <div onClick={() => navigate(`/institution/programs/${opportunity._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 hover:text-blue-600 hover:font-bold '>
                                                <FileUser className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                            <div onClick={() => handleDelete(opportunity._id)} className='flex items-center gap-2 w-fit mt-2 cursor-pointer  hover:text-red-600 hover:font-bold'>
                                                <Trash2 className='w-4'/>
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>

                                    </Popover>
                                </TableCell>

                            </tr>


                        ))
                    }
                </TableBody>
            </Table> 
            <OpportunityDialog open={open} setOpen={setOpen} opportunityId={selectedOpportunityId}/>                    
        </div>
    )
}

export default InstiOpportunitiesTable