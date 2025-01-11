import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from '../shared/Footer'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authSlice";
import { Loader2 } from 'lucide-react'
import LoginBackground from '../../assets/login_bg.jpg'
import HomeBackground from "../../assets/home_bg.jpg"

const Login = () => {
  const [input, setInput] = useState ({
    email: "",
    password: "",
    role: "",
  });

  const { user, loading } = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (input.role === 'institution') {
          navigate('/institution/dashboard');
        } else {
          navigate("/");
        }
        toast.success(res.data.message); 
      }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally {
        dispatch(setloading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover' }}>
      <Navbar />
      <div  className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          style={{backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover'}}
          className="w-1/2 border border-gray-400 rounded-xl p-4 my-10 bg-[#eaf3fa] shadow-2xl"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
               type="text"
               value={input.email}
               name="email"
               onChange={changeEventHandler}
               placeholder="example@gmail.com"
               className="border-gray-300 rounded-xl bg-white shadow-xl"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="border-gray-300 rounded-xl bg-white shadow-xl"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="institution"
                  checked={input.role === 'institution'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Institution</Label>
              </div>
            </RadioGroup>
          </div>

          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button> : <Button type="submit"  className="w-full my-4 rounded-xl text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl">  Login</Button>
          }

          

          <span className="text-sm block text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>

      </div>
      <Footer/>
    </div>
  );
};

export default Login;