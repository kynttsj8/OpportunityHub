import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, OPPORTUNITY_API_END_POINT } from "@/utils/constant";
import { setSingleOpportunity } from "@/redux/opportunitySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Footer from "./shared/Footer";
import { ArrowLeft } from "lucide-react";

// opportunityhub.edu@gmail.com
// opportunituhub
const OpportunityDescription = () => {
  const { singleOpportunity } = useSelector(store=>store.opportunity);
  const { user } = useSelector(store=>store.auth);
  const isInitiallyApplied = singleOpportunity?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const isVacancyFull = singleOpportunity?.applications?.length >= singleOpportunity?.position;
  const dispatch = useDispatch();
  const params = useParams();
  const opportunityId = params.id;
  const navigate = useNavigate();

  const appliedOpportunityHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${opportunityId}`, {withCredentials:true});
      
      if (res.data.success) {
        setIsApplied(true); // update the loccl state
        const updatedSingleOpportunity = { ...singleOpportunity, applications:[...singleOpportunity.applications, {applicant:user?._id}] }
        dispatch(setSingleOpportunity(updatedSingleOpportunity));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  
  useEffect(() => {
    const fetchSingleOpportunity = async () => {
      try {
        const res = await axios.get(
          `${OPPORTUNITY_API_END_POINT}/get/${opportunityId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleOpportunity(res.data.opportunity));
          setIsApplied(res.data.opportunity.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log("Error fetching single opportunity:", error);
      }
    };
    fetchSingleOpportunity();
  }, [opportunityId, dispatch, user?._id]);

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
          <div>
            <Button className="mb-2 bg-gray-600 text-white rounded-xl hover:text-black" onClick={()=>navigate(-1)}>
            <ArrowLeft />
            Previous
            </Button>
          </div>
            <h1 className="font-bold text-xl ">{singleOpportunity?.title}</h1>

            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-600 font-bold" variant="ghost">
                {singleOpportunity?.position} Vacancies
              </Badge>
              <Badge className="text-yellow-600 font-bold" variant="ghost">
                {singleOpportunity?.type}
              </Badge>
              <Badge className="text-green-600 font-bold" variant="ghost">
                {singleOpportunity?.location}
              </Badge>
            </div>
          </div>

          <Button
            onClick={!isApplied && !isVacancyFull ? appliedOpportunityHandler : null}
            disabled={isApplied || isVacancyFull}
            className={`rounded-lg ${
              isApplied || isVacancyFull
                ? "bg-gray-400 cursor-not-allowed"
                : "text-white bg-[#FFA500] hover:bg-[#04724d]"
            }`}
          >
            {isApplied ? "Already Applied" : isVacancyFull ? "Vacancy Full" :  "Apply Now"}
          </Button>
        </div>
        
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Opportunity description
        </h1>

        <div className="my-4">
          <h1 className="font-bold my-1">
            Education level:{" "}
            <span className="pl-4 font-normal text-gray-800">Master</span>
          </h1>

          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleOpportunity?.location}</span>
          </h1>

          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
            {singleOpportunity?.description}
            </span>
          </h1>

          <h1 className="font-bold my-1">
            Requirements:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleOpportunity?.requirements}</span>
          </h1>

          <h1 className="font-bold my-1">
            Duration:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleOpportunity?.duration}</span>
          </h1>

          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleOpportunity?.applications?.length}</span>
          </h1>

          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleOpportunity?.createdAt ? singleOpportunity.createdAt.split("T")[0] : ""}</span>
          </h1>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OpportunityDescription;
