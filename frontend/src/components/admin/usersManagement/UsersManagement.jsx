import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React, { useState } from 'react'
import AdminBackground from "../../../assets/admin_bg.jpg";
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import Sidebar from '../dashboardPage/Sidebar';
import UsersTable from './UsersTable';

const UsersManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ backgroundImage: `url(${AdminBackground})`, backgroundSize: 'cover' }}>
            <Navbar />

            <div className='flex flex-1'>
                <div
                    className={`bg-gray-800 text-white transition-all duration-500 ${isSidebarOpen ? 'w-64 h-[70vh]' : 'w-2 h-[70vh]'
                        } overflow-hidden rounded-r-xl`}
                >
                    <Sidebar />
                </div>

                <div className="flex-1 relative overflow-hidden transition-all duration-500 ">
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4  bg-gray-800 text-white w-10 h-8 rounded-r-xl flex items-center justify-center z-20 hover:bg-gray-700 transform hover:scale-105"
                    >
                        {isSidebarOpen ? <ArrowLeftToLine size={24} /> : <ArrowRightFromLine size={24} />}
                    </button>

                    <UsersTable />
                </div>

            </div>

            <Footer />

        </div>
    )
}

export default UsersManagement