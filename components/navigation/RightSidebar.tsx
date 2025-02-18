
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryCard from "../cards/CategoryCard";
import ROUTES from "@/constants/routes";


const mostSearchedEquipment = [
  { _id: "1", title: "U/Vis Spectrophotometer" },
  { _id: "2", title: "Thermocycler" },
  { _id: "3", title: "PCR Machine" },
  { _id: "4", title: "Microcentrifuge" },
  { _id: "5", title: "Microscope" },
];

const mostSearchedCategories = [
    { _id: "1", name: "Microscope", equipment: 5, showCount: true},
    { _id: "2", name: "Thermocycler", equipment: 4,showCount: true},
    { _id: "3", name: "PCR Machine", equipment: 3, showCount: false},
    { _id: "4", name: "Microcentrifuge", equipment: 2, showcount: true},
    { _id: "5", name: "U/Vis Spectrophotometer", equipment: 7, showCount: false,} 
];

const RightSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Most Searched Equipment</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {mostSearchedEquipment.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Most Searched Categories</h3>

        <div className="mt-7 flex flex-col gap-4">
          {mostSearchedCategories.map(({ _id, name, equipment }) => (
            <CategoryCard
              key={_id}
              _id={_id}
              name={name}
              equipment={equipment}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;