import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoCompany from "../../assets/no_company.png"
import { useDispatch } from "react-redux";
import { deleteUnitById } from "@/redux/unitSlice"; // Import the thunk action

const UnitsTable = () => {
    const { units, searchUnitByText } = useSelector(store => store.unit);
    const [ filterUnit, setFilterUnit ] = useState(units);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        const filteredUnit = units.length >= 0 && units.filter((unit) => {
            if (!searchUnitByText) {
                return true
            };
            return unit?.name?.toLowerCase().includes(searchUnitByText.toLowerCase());
        });
        setFilterUnit(filteredUnit);
    }, [units, searchUnitByText])

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this unit?");
        if (confirmed) {
            dispatch(deleteUnitById(id));
        }
    };

    return (
        <div className=' max-w-6xl mx-auto '>
            <Table>
                <TableCaption className="mb-5">A list of your recent registered units</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Created on</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterUnit?.map((unit) => (
                            <tr key={unit.id} className="hover:text-blue-700">
                                
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={unit.logo || NoCompany} />
                                    </Avatar>
                                </TableCell >
                                <TableCell >{unit.name}</TableCell>
                                <TableCell>{unit.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white">
                                            <div onClick={() => navigate(`/institution/units/${unit._id}`)} className='flex items-center  gap-2 w-fit hover:text-blue-500 cursor-pointer hover:font-bold'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div  onClick={() => handleDelete(unit._id)} className='flex items-center gap-2 mt-2 w-fit hover:text-red-600 cursor-pointer hover:font-bold'>
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
        </div>
    )
}

export default UnitsTable