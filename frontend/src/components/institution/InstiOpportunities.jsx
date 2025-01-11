import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchUnitByText } from "@/redux/unitSlice";
import InstiOpportunitiesTable from "./InstiOpportunitiesTable";
import useGetAllInstiOpportunities from "@/hooks/useGetAllInstiOpportunities";
import { setSearchOpportunityByText } from "@/redux/opportunitySlice";
import InstiBackground from "../../assets/institution_bg.jpg"
import Footer from "../shared/Footer";

const InstiOpportunities = () => {
    useGetAllInstiOpportunities();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchOpportunityByText(input));
    }, [input]);

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className="max-w-7xl mx-auto mb-10 mt-10 bg-gray-100 bg-opacity-70 rounded-3xl">
               
                    <div className="flex items-center justify-between max-w-6xl mx-auto my-5">
                        <Input className="w-fit mt-10 bg-white rounded-xl" placeholder="Filter by name, title" onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={() => navigate("/institution/opportunity/post")} className='mt-10 rounded-xl bg-[#e4d98d] hover:bg-[#04724d] hover:text-white'>
                            Post New Program
                        </Button>
                    </div>
                    <InstiOpportunitiesTable />
               
            </div>
            <Footer/>
        </div>
    );
}

export default InstiOpportunities