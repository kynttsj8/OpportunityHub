import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/opportunitySlice'

// const filterData = [
//     {
//         filterType: "Location",
//         array: ["India", "Hochiminh", "Berlin", "South Korea"]
//     },
//     {
//         filterType: "Level",
//         array: ["PhD", "Master", "Bachelor"]
//     }
// ]

const FilterCard = () => {
    const { allOpportunities } = useSelector((store) => store.opportunity);
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = useState("");
    const locations = [...new Set(allOpportunities.flatMap((opportunity) => opportunity.location))];
    const types = [...new Set(allOpportunities.flatMap((opportunity) => opportunity.type))];

    const filterData = [
        { category: "Location", options: locations },
        { category: "Type of Studying", options: types }
      ];
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Search</h1>
            <hr className='mt-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.category}</h1>
                            <div>

                                {
                                    data.options.map((item, idx) => {
                                        const itemId = `id${index} - ${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId} >{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard