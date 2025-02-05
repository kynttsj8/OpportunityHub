import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Avatar, AvatarImage } from '../../ui/avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { MoreHorizontal, Trash2 } from 'lucide-react';
import NoCompany from "../../../assets/no_company.png"
import useGetAllUnitsAdmin from '@/hooks/useGetAllUnitsAdmin';

const UnitsTableAdmin = () => {
    const { allUnits } = useSelector(store => store.unit);
    const { users } = useSelector(store => store.auth);
    useGetAllUnitsAdmin();

    const getUserEmailById = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.email : 'N/A';
    };

    return (
        <div className="flex justify-center ">
            <div className={`flex justify-center mt-10 pt-2 bg-white rounded-xl  w-[90%]`}>
                <div className='w-[85%]'>
                    <Table>
                        <TableCaption className="mb-5">A list of all registerd units</TableCaption>
                        <TableHeader>
                            <TableHead>Logo</TableHead>
                            <TableHead>Unit Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Unit Link</TableHead>
                            <TableHead>Registered By</TableHead>
                            {/* <TableHead className='text-right'>Action</TableHead> */}
                        </TableHeader>
                        <TableBody>
                            {allUnits.map(unit => (
                                <TableRow key={unit.id} className="hover:bg-gray-300">
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={unit.logo || NoCompany} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{unit.name}</TableCell>
                                    <TableCell>{unit.location || 'N/A'}</TableCell>
                                    <TableCell>
                                        {unit.website ? (
                                            <a className='text-blue-600 cursor-pointer' href={unit.website} target="_blank" rel="noopener noreferrer">{unit.website}</a>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{getUserEmailById(unit.userId)} </TableCell>
                                    {/* <TableHead className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger ><MoreHorizontal className='flex items-center' /></PopoverTrigger>
                                            <PopoverContent className="w-32 bg-gray-200">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer hover:text-red-600 hover:font-bold'>
                                                    <Trash2 className='w-4' />
                                                    <span>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableHead> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    )
}

export default UnitsTableAdmin