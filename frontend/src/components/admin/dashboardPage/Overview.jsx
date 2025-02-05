import React from 'react'
import { useSelector } from 'react-redux'
import { FileUser, GraduationCap, List, MapPinHouse, School, User } from 'lucide-react'
import useGetAllUsers from '@/hooks/useGetAllUsers';
import useGetAllApplications from '@/hooks/useGetAllApplications';
import useGetAllUnitsAdmin from '@/hooks/useGetAllUnitsAdmin';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
    const navigate = useNavigate();

    const { allOpportunities } = useSelector(store => store.opportunity);
    const { allUnits } = useSelector(store => store.unit);
    const { users } = useSelector(store => store.auth);
    const { applications } = useSelector(store => store.application);

    useGetAllUsers();
    useGetAllApplications();
    useGetAllUnitsAdmin();

    const studentAccounts = users.filter(user => user.role === 'student');
    const institutionAccounts = users.filter(user => user.role === 'institution');

    return (
        <div>
            <div className='max-w-4xl mx-auto my-10'>
                <div className='grid grid-cols-3 gap-10 mx-16'>
                    <div
                        onClick={() => navigate(`/admin/users`)}
                        class="bg-[#4fb09f] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px] 
                                transition-all duration-300 hover:bg-[#42968d] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between '>
                            <h2 class="text-md font-bold">Total Users</h2>
                            <User />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{users?.length}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/admin/users?role=student`)}
                        class="bg-[#5dcca7] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px]
                                transition-all duration-300 hover:bg-[#4dbb99] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between'>
                            <h2 class="text-md font-bold">Student Accounts</h2>
                            <GraduationCap />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{studentAccounts.length}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/admin/applications`)}
                        class="bg-[#B4E380] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px]
                                transition-all duration-300 hover:bg-[#a8cd69] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between'>
                            <h2 class="text-md font-bold">Total Applications</h2>
                            <FileUser />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{applications.length}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/admin/users?role=institution`)}
                        class="bg-[#73BBA3] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px]
                                transition-all duration-300 hover:bg-[#64a692] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between'>
                            <h2 class="text-md font-bold">Institution Accounts</h2>
                            <School />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{institutionAccounts.length}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/admin/units`)}
                        class="bg-[#73EC8B] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px]
                                transition-all duration-300 hover:bg-[#65d681] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between'>
                            <h2 class="text-md font-bold">Total Units</h2>
                            <MapPinHouse />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{allUnits?.length}</span>
                        </div>
                    </div>

                    <div
                        onClick={() => navigate(`/admin/programs`)}
                        class="bg-[#88D66C] shadow-2xl rounded-xl border border-white p-4 text-white 
                                flex flex-col justify-between w-[220px] h-[120px]
                                transition-all duration-300 hover:bg-[#7cc757] transform hover:scale-105 cursor-pointer"
                    >
                        <div className='flex justify-between'>
                            <h2 class="text-md font-bold">Total programs</h2>
                            <List />
                        </div>
                        <div class="flex items-center">
                            <span class="text-4xl font-bold">{allOpportunities.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview