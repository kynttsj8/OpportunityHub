import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedOpporTable = () => {
    const { allAppliedOpportunities } = useSelector(store => store.opportunity);

    return (
        <div className=' max-w-7xl mx-10 '>
            <Table>
                <TableCaption className="mb-5">A list of your recent applications</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead>Date</TableHead>
                        <TableHead>Opportunity Title</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedOpportunities?.length <= 0 ? <span>You haven't applied any program yet.</span> : allAppliedOpportunities?.map((appliedOpportunity) => (
                            <TableRow className="hover:text-blue-600" key={appliedOpportunity?._id}>
                                <TableCell>{appliedOpportunity.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedOpportunity.opportunity?.title}</TableCell>
                                <TableCell>{appliedOpportunity.opportunity?.unit?.name}</TableCell>
                                <TableCell className='text-right'><Badge className={`${appliedOpportunity?.status === "rejected" ? 'bg-red-200 text-red-700 font-bold' : appliedOpportunity.status === "pending" ? 'bg-yellow-200 text-yellow-700 font-bold' : 'bg-green-200 text-green-700 font-bold'}`}>{appliedOpportunity.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedOpporTable