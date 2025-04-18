import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchUnitByText } from "@/redux/unitSlice";
import InstiOpportunitiesTable from "./InstiOpportunitiesTable";
import useGetAllInstiOpportunities from "@/hooks/useGetAllInstiOpportunities";
import { setSearchOpportunityByText } from "@/redux/opportunitySlice";
import InstiBackground from "../../assets/institution_bg.jpg"
import Footer from "../shared/Footer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bot, CaseSensitive } from "lucide-react";
import { OPPORTUNITY_API_END_POINT } from "@/utils/constant";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoginBackground from "../../assets/login_bg.jpg"
import { toast } from "sonner";
import axios from "axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const InstiOpportunities = () => {
    useGetAllInstiOpportunities();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const [open, setOpen] = useState(false);
    const { units } = useSelector(state => state.unit);
    const [selectedUnit, setSelectedUnit] = useState(null);

    // 20.02.2025
    const [openCrawlDialog, setOpenCrawlDialog] = useState(false);
    const [crawledData, setCrawledData] = useState([]);

    //
    useEffect(() => {
        dispatch(setSearchOpportunityByText(input));
    }, [input]);

    // 20.02.2025
    const handleCrawl = async () => {
        if (!url) {
            toast.error("Please enter a valid URL!");
            return;
        }

        try {
            const response = await axios.post(`${OPPORTUNITY_API_END_POINT}/crawl`, { url }, { withCredentials: true });

            if (response.data.success && response.data.data.length > 0) {
                setCrawledData(response.data.data);
                setOpen(false); // Close input dialog
                setOpenCrawlDialog(true); // Open review dialog
            } else {
                toast.error("No data found on the provided link!");
            }
        } catch (error) {
            console.error("Error crawling data:", error);
            toast.error("Error crawling data!");
        }
    };

    const handlePostCrawledData = async () => {
        if (!selectedUnit) {
            toast.error("Please select a unit before posting!");
            return;
        }

        try {
            const response = await axios.post(`${OPPORTUNITY_API_END_POINT}/post-crawled-opportunities`,
                { opportunities: crawledData,  unit: selectedUnit  },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Opportunities posted successfully!");
                setOpenCrawlDialog(false);
            } else {
                toast.error("Failed to post opportunities!");
            }
        } catch (error) {
            console.error("Error posting data:", error);
            toast.error("Error posting data!");
        }
    };

    const selectChangeHandler = (value) => {
        const unit = units.find((unit) => unit.name.toLowerCase() === value);
        setSelectedUnit(unit ? unit._id : null);
    };

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className="max-w-7xl mx-auto mb-10 mt-10 bg-gray-100 bg-opacity-70 rounded-3xl">

                <div className="flex items-center justify-between max-w-6xl mx-auto my-5">
                    <Input className="w-fit mt-10 bg-white rounded-xl" placeholder="Filter by name, title" onChange={(e) => setInput(e.target.value)} />

                    <Popover>
                        <PopoverTrigger >
                            <Button className='mt-10 rounded-xl bg-[#e4d98d] hover:bg-[#04724d] hover:text-white'>Post New Program</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 bg-white">
                            <div onClick={() => navigate(`/institution/opportunity/post-manually`)} className='flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600 hover:font-bold'>
                                <CaseSensitive />
                                <span>Manually</span>
                            </div>
                            <div onClick={() => setOpen(true)} className='flex items-center gap-2 mt-2 w-fit cursor-pointer hover:text-blue-600 hover:font-bold'>
                                <Bot />
                                <span>Via Link Input</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <InstiOpportunitiesTable />

            </div>
            <Footer />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover' }}>
                    <DialogHeader>
                        <DialogTitle>Please, fill in these required fields to continue crawling data</DialogTitle>
                    </DialogHeader>
                    <Input className="w-full bg-white rounded-xl border-gray-800 " placeholder="Enter website URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                    {
                        units.length >= 0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="border-gray-800 rounded-xl bg-white shadow-xl my-1">
                                    <SelectValue placeholder="Select a unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="bg-white ">
                                        {
                                            units.map((unit) => {
                                                return (
                                                    <SelectItem key={unit._id} className="text-blue-800" value={unit?.name?.toLowerCase()}>
                                                        {unit.name}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                    <DialogFooter>
                        <Button onClick={handleCrawl} className='rounded-xl bg-[#e4d98d] hover:bg-[#04724d] hover:text-white'>Fetch Information</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 20.02.2025 */}
            {/* Dialog to Review Crawled Data */}
            <Dialog open={openCrawlDialog} onOpenChange={setOpenCrawlDialog}>
                <DialogContent style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover', width: '100vw', height: '70vh' }}>
                    <DialogHeader>
                        <DialogTitle>Review Crawled Data</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-full max-w-full overflow-y-auto bg-white p-3 rounded-md">
                        {crawledData.length > 0 ? (
                            <table className="w-full border">
                                <thead>
                                    <tr>
                                        <th className="border p-2">Title</th>
                                        <th className="border p-2">University</th>
                                        <th className="border p-2">Location</th>
                                        <th className="border p-2">Type</th>
                                        <th className="border p-2">Description</th>
                                        <th className="border p-2">Requirements</th>
                                        <th className="border p-2">National Requirement</th>
                                        <th className="border p-2">Field</th>
                                        <th className="border p-2">Link</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {crawledData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border p-2">{item.title}</td>
                                            <td className="border p-2">{item.university}</td>
                                            <td className="border p-2">{item.location}</td>
                                            <td className="border p-2">{item.type}</td>
                                            <td className="border p-2">{item.description}</td>
                                            <td className="border p-2">{item.requirements}</td>
                                            <td className="border p-2">{item.nationalRequirement}</td>
                                            <td className="border p-2">{item.field}</td>
                                            <td className="border p-2">
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                    View Details
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={handlePostCrawledData} className='rounded-xl bg-[#e4d98d] hover:bg-[#04724d] hover:text-white'>
                            Post Data
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default InstiOpportunities