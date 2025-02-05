import React, {useEffect, useState} from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import LoginBackground from '../../assets/login_bg.jpg'
import HomeBackground from "../../assets/home_bg.jpg"
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const[input, setInput] = useState ({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const {user, loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log(res.data);
        navigate("/login");
        toast.success(res.data.message); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    } finally {
      dispatch(setLoading(false));
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
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          style={{backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover'}}
          className="w-1/2 border border-gray-400 rounded-xl p-4 my-10 bg-[#eaf3fa] shadow-2xl" 
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe, etc."
              className="border-gray-300 rounded-xl bg-white shadow-xl"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc@gmail.com, etc."
              className="border-gray-300 rounded-xl bg-white shadow-xl"
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="0123 456 789"
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

          <div className="my-2 ">
              <Label>Avatar</Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer border-gray-300 rounded-xl shadow-xl"
              />
            </div>

          <div className="flex items-center">
            <Label>You're currently a: </Label>
            <RadioGroup className="flex items-center gap-4 my-2">
              <div className="flex items-center space-x-2 mx-2">
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
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait...</Button> : <Button type="submit"  className="w-full my-4 rounded-xl text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl">Signup</Button>
          }

          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Signup;