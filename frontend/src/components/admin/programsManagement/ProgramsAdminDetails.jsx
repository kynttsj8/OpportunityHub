import Footer from '@/components/shared/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleOpportunity } from '@/redux/opportunitySlice';
import { OPPORTUNITY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ProgramsAdminDetails = () => {


    const { singleOpportunity } = useSelector(store => store.opportunity);
    const { users} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const params = useParams();
    const opportunityId = params.id;
    const navigate = useNavigate();

    const getUserEmailById = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.email : 'N/A';
    };

    useEffect(() => {
        const fetchSingleOpportunity = async () => {
            try {
                const res = await axios.get(
                    `${OPPORTUNITY_API_END_POINT}/get/${opportunityId}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setSingleOpportunity(res.data.opportunity));
                }
            } catch (error) {
                console.log("Error fetching single opportunity:", error);
            }
        };
        fetchSingleOpportunity();
    }, [opportunityId, dispatch]);

    return (
        <div>
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <div>
                        <div>
                            <Button className="mb-2 bg-gray-600 text-white rounded-xl hover:text-black" onClick={() => navigate("/admin/programs")}>
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

                </div>

                <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
                    Opportunity description
                </h1>

                <div className=" my-4">
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

                <div className="border-b-2 border-t-2 border-b-gray-300 border-t-gray-300 py-4">
                    <h1 className="font-bold my-1">
                        Posted by:{" "}
                        <span className="pl-4 font-normal text-gray-800">{getUserEmailById(singleOpportunity?.created_by)}</span>
                    </h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProgramsAdminDetails