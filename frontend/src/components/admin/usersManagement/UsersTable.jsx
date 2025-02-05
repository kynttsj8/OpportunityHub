import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Avatar, AvatarImage } from '../../ui/avatar'
import useGetAllUsers from '@/hooks/useGetAllUsers';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Trash2 } from 'lucide-react';
import NoAvatar from "../../../assets/no_avatar.jpg"
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteUserById } from '@/redux/authSlice';

const UsersTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(store => store.auth);
    useGetAllUsers();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultRole = queryParams.get('role') || '';

    const [filterRole, setFilterRole] = useState(defaultRole);

    const handleRoleFilter = (selectedRole) => {
        setFilterRole(selectedRole);
    };

    const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;

    useEffect(() => {
        setFilterRole(defaultRole); // Update filterRole when query parameter changes
    }, [defaultRole]);

    const handleDeleteUser = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            dispatch(deleteUserById(id)); 
            
        }
    };

    return (
        <div className="flex justify-center ">

            <div className={`flex justify-center mt-10 pt-2 bg-white rounded-xl  w-[90%]`}>
                <div className='w-[85%]'>
                    <div className='p-2'>
                        <label htmlFor="roleFilter" >Filter by Role: </label>
                        <select
                            id="roleFilter"
                            value={filterRole}
                            onChange={(e) => handleRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            <option value="student">Student</option>
                            <option value="institution">Institution</option>
                        </select>
                    </div>

                    <Table>
                        <TableCaption className="mb-5">A list of all users account</TableCaption>
                        <TableHeader>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Users' fullname</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone number</TableHead>
                            <TableHead>Role</TableHead>
                            {/* <TableHead>Resume</TableHead> */}
                            <TableHead className='text-right'>Action</TableHead>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id} className="hover:bg-gray-300">
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={user.profile.profilePhoto || NoAvatar} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    {/* <TableCell>
                                        {user?.profile?.resume ? (
                                            <a className='text-blue-600 cursor-pointer' href={user?.profile?.resume} target="_blank" rel="noopener noreferrer">{user?.profile?.resumeOriginalName}</a>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </TableCell> */}
                                    <TableHead className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32 bg-gray-200">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer hover:text-red-600 hover:font-bold'>
                                                    <Trash2 className='w-4' />
                                                    <span onClick={() => handleDeleteUser(user._id)}>Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableHead>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    )
}

export default UsersTable