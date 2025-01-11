import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import LoginBackground from "../../assets/login_bg.jpg"
import NoCompany from "../../assets/no_company.png"
import { setSingleOpportunity } from "@/redux/opportunitySlice";
import { Avatar, AvatarImage } from "../ui/avatar";
import Opportunity from "../Opportunity";
import { useParams } from "react-router-dom";
import { OPPORTUNITY_API_END_POINT } from "@/utils/constant";
import useGetOpportunityById from "@/hooks/useGetOpportunityById";
import axios from "axios";

const OpportunityDialog = ({ open, setOpen, opportunityId }) => {
  // const dispatch = useDispatch();
  // const params = useParams();
  // // const opportunityId = params.id;
  // const opportunityId = useGetOpportunityById(params.id);
  // const { singleOpportunity } = useSelector(store => store.opportunity);
  // console.log(singleOpportunity);

  // useEffect(() => {
  //   const fetchSingleOpportunity = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${OPPORTUNITY_API_END_POINT}/get/${params.id}`,
  //         { withCredentials: true }
  //       );
  //       if (res.data.success) {
  //         dispatch(setSingleOpportunity(res.data.opportunity));
  //       }
  //     } catch (error) {
  //       console.log("Error fetching single opportunity:", error);
  //     }
  //   };
  //   if (open && opportunityId) {
  //     fetchSingleOpportunity();
  //   }
  // }, [open, opportunityId]);

  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await axios.get(
          `${OPPORTUNITY_API_END_POINT}/get/${opportunityId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setOpportunity(res.data.opportunity);
        }
      } catch (error) {
        console.error("Error fetching opportunity:", error);
      }
    };

    if (open && opportunityId) {
      fetchOpportunity();
    }
  }, [open, opportunityId]);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} className='max-w-7xl'>
        <DialogContent
          style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover' }}
          className="sm:max-w-[600px] bg-[#eaf3fa]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className='flex items-center justify-center'>Your Program Details</DialogTitle>
          </DialogHeader>


          {opportunity && (
          <div>
            <h1 className="flex items-center justify-center font-bold text-xl text-[#FFA500]">
              <span className="text-black">Program:</span>
              <span className="ml-2"> {opportunity?.title}</span>
            </h1>

            <table className="mt-5 border border-collapse w-full ">
              <tbody>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Location:</td>
                  <td className="border border-gray-600 p-2 ">{opportunity?.location}</td>
                </tr>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Description:</td>
                  <td className="border border-gray-600 p-2 ">{opportunity?.description}</td>
                </tr>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Requirements:</td>
                  <td className="border border-gray-600 p-2 ">{opportunity?.requirements}</td>
                </tr>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Duration:</td>
                  <td className="border border-gray-600 p-2 ">{opportunity?.duration || "Not provided"}</td>
                </tr>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Total Applicants:</td>
                  <td className="border border-gray-600 p-2 ">{opportunity?.applications?.length}</td>
                </tr>
                <tr>
                  <td className="font-bold border border-gray-600 p-2 ">Posted Date:</td>
                  <td className="border border-gray-600 p-2 ">
                    {opportunity?.createdAt
                      ? opportunity.createdAt.split("T")[0]
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OpportunityDialog