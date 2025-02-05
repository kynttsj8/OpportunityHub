import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import AdminBackground from "../../../assets/admin_bg.jpg";
import Overview from './Overview';
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import useGetAllUsers from '@/hooks/useGetAllUsers';
import Sidebar from './Sidebar';

const Dashboard = () => {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ backgroundImage: `url(${AdminBackground})`, backgroundSize: 'cover' }} className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <div
                    className={`bg-gray-800 text-white transition-all duration-500 ${
                        isSidebarOpen ? 'w-64 h-[70vh]' : 'w-2 h-[70vh]'
                    } overflow-hidden rounded-r-xl`}
                >
                    <Sidebar />
                </div>

                <div className="flex-1 relative overflow-hidden transition-all duration-500">
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4  bg-gray-800 text-white w-10 h-8 rounded-r-xl flex items-center justify-center z-20 hover:bg-gray-700 transform hover:scale-105"
                    >
                        {isSidebarOpen ? <ArrowLeftToLine size={24} /> : <ArrowRightFromLine size={24} />}
                    </button>
                    <Overview />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
