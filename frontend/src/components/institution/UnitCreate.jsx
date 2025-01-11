import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UNIT_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleUnit } from "@/redux/unitSlice";
import InstiBackground from "../../assets/institution_bg.jpg"
import Footer from "../shared/Footer";

const UnitCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unitName, setUnitName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${UNIT_API_END_POINT}/register`, {unitName}, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (res?.data?.success) {
        dispatch(setSingleUnit(res.data.unit));
        toast.success(res.data.message);
        const unitId = res?.data?.unit?._id;
        navigate(`/institution/units/${unitId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-gray-100 bg-opacity-70 rounded-3xl">
        <div className="max-w-4xl mx-auto my-10">
         <br></br>
          <div className="my-5">
              <h1 className=" font-bold text-2xl  ">Register Unit Name</h1>
              <p className="text-gray-500">
                You need to register the unit you are currently working at before continueing to fill in other information.
                <br></br>You can change it later.
              </p>
            
            

            
          </div>

          <Label>Unit Name</Label>
          <Input
            type="text"
            className="my-2 rounded-xl bg-white"
            placeholder="Google, IU, etc."
            onChange={(e) => setUnitName(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-10 ">
            <Button
              variant="outline"
              onClick={() => navigate("/institution/units")}
              className='mb-10 rounded-xl'
            >
              Cancel
            </Button>
            <Button onClick={registerNewCompany} className='mb-10 ml-2 rounded-xl bg-[#e4d98d] hover:bg-[#04724d] hover:text-white'>Continue</Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UnitCreate;
