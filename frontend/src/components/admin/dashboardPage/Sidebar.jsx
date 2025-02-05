import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 w-64 h-screen text-white">
            <div className="p-4">
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
            </div>
            <ul className="py-4">
                <li className="px-4 py-2">
                    <Link to="/admin/users" className="block hover:bg-gray-700">User Management</Link>
                </li>
                <li className="px-4 py-2">
                    <Link to="/admin/programs" className="block hover:bg-gray-700">Program Management</Link>
                </li>
                <li className="px-4 py-2">
                    <Link to="/admin/applications" className="block hover:bg-gray-700">Application Management</Link>
                </li>
                <li className="px-4 py-2">
                    <Link to="/admin/units" className="block hover:bg-gray-700">Unit Management</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;