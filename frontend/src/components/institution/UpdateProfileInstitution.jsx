import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import LoginBackground from "../../assets/login_bg.jpg"


const UpdateProfileInstitution = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,

    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);

        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_END_POINT}/institution/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    };


    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent
                    style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover' }}
                    className="sm:max-w-[425px] bg-[#eaf3fa]"
                    onInteractOutside={() => setOpen(false)}

                >
                    <DialogHeader>
                        <DialogTitle>Update Your Profile</DialogTitle>

                    </DialogHeader>

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4 ">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label html="name">Name</Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3 rounded-xl bg-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 ">
                                <Label html="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3 rounded-xl bg-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label html="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3 rounded-xl bg-white"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label html="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3 rounded-xl bg-white"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4">
                                    {" "}
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full my-4 rounded-xl text-white bg-[#FFA500] hover:bg-[#04724d] shadow-xl"
                                >
                                    {" "}
                                    Save Changes
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileInstitution;