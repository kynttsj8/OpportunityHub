import React from "react";
import LatestOpporCards from "./LatestOpporCards";
import { useSelector } from "react-redux";
import { Sun } from "lucide-react";

// const randomOpportunities = [1,2,3,4,5,6,7,8];

const LatestOppor = () => {
  const { allOpportunities } = useSelector((store) => store.opportunity);

  return (
    <div className=" flex ml-10 mr-10 bg-[#d5e7f5] bg-opacity-60 rounded-3xl" >
      <div className="max-w-7xl mx-auto my-5 " >
        <div className="flex">
          <Sun color="#ffc014" strokeWidth={3} size={60} />
          <h1 className="text-4xl text-[#19486A] font-bold ml-2 mt-2">
            <span className="text-[#FFA500]">Latest & Top</span> Opening
            Opportunities
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 my-5">
          {allOpportunities.length <= 0 ? (
            <span>No Program Available</span>
          ) : (
            allOpportunities
              .slice(0, 6)
              .map((opportunity) => (
                <LatestOpporCards
                  key={opportunity._id}
                  opportunity={opportunity}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestOppor;
