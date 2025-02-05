import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Avatar, AvatarImage } from '../../ui/avatar'
import { useSelector } from 'react-redux'
import { MoreHorizontal, Trash2 } from 'lucide-react';
import NoCompany from "../../../assets/no_company.png"
import useGetAllApplications from '@/hooks/useGetAllApplications';

const ApplicationsTable = () => {
  const { applications } = useSelector(store => store.application);
  const { users } = useSelector(store => store.auth);
  useGetAllApplications();

  const getUserEmailById = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.email : 'N/A';
  };

  return (
    <div className="flex justify-center ">
      <div className={`flex justify-center mt-10 pt-2 bg-white rounded-xl  w-[90%]`}>
        <div className='w-[85%]'>
          <Table>
            <TableCaption className="mb-5">A list of all registerd units</TableCaption>
            <TableHeader>
              <TableHead>Program Name</TableHead>
              <TableHead>Institution Email</TableHead>
              <TableHead>Student Email</TableHead>
              <TableHead>Application Status</TableHead>
              {/* <TableHead className='text-right'>Action</TableHead> */}
            </TableHeader>
            <TableBody>
              {applications.map(application => (
                <TableRow key={application.id} className="hover:bg-gray-300">
                  <TableCell>{application.opportunity?.title || 'N/A'}</TableCell>
                  <TableCell>{getUserEmailById(application.opportunity?.created_by)}</TableCell>
                  <TableCell>{application.applicant?.email}</TableCell>
                  <TableCell>{application.status} </TableCell>
                  {/* <TableHead className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger ><MoreHorizontal className='flex items-center' /></PopoverTrigger>
                      <PopoverContent className="w-32 bg-gray-200">
                        <div className='flex items-center gap-2 w-fit cursor-pointer hover:text-red-600 hover:font-bold'>
                          <Trash2 className='w-4' />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableHead> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </div>
    </div>
  )
}

export default ApplicationsTable