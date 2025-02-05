import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { User2, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import NoAvatar from "../../assets/no_avatar.jpg"
import WebLogo from "../../assets/web_logo.png"

const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials: true});
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
  
    return (
        <div className=' bg-[#19486A]'>
            
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'> 
            
                <div className='flex items-center justify-between'>
                    <img src={WebLogo} alt="OpportunityHub Logo" className="h-16 w-16" />
                    <h1 className='text-[#FFD700] text-2xl font-bold'>Opportunity<span className='text-white'>HUB</span></h1>
                </div>

                <div className='flex text-[#FFD700] items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'institution' ? (
                                <>
                                    <li><Link to="/institution/dashboard">Dashboard</Link></li>
                                    <li><Link to="/institution/units">Units</Link></li>
                                    <li><Link to="/institution/programs">Programs</Link></li>
                                </>
                            ) : user && user.role === 'admin' ? (
                                <>
                                    <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/programs">Programs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                        
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className='hover:bg-[#d5e7f5] hover:text-white shadow-lg'>Login</Button></Link>
                                <Link to="/signup"><Button className='font-bold text-[#19486A] bg-[#FFD700] hover:bg-[#d5e7f5] hover:text-white shadow-lg'>Sign Up</Button></Link>
                            </div>
                        ) : (
                            <Popover className=''>
                                <PopoverTrigger>
                                    <Avatar className='cursor-pointer border border-gray-500'>
                                        <AvatarImage src={user?.profile?.profilePhoto || NoAvatar} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 bg-[#d5e7f5] rounded-xl'>
                                    <div className='flex gap-4 space-y-2 '>
                                        <Avatar className='cursor-pointer border border-gray-500'>
                                            <AvatarImage src={user?.profile?.profilePhoto || NoAvatar} alt="@shadcn"/>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <>
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2/>
                                                        <Button variant="link"><Link to="/profile">View account</Link></Button>
                                                    </div>
                                                </>
                                            )
                                        }
                                        
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                        
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>   
        </div>
    )
};

export default Navbar;