import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";


interface Props {
    _id: string;
    name: string;
    equipment: number;
    showCount?: boolean;
};

const CategoryCard = ({ _id, name, equipment, showCount}: Props) => {

    return (
      <Link href={ROUTES.CATEGORIES(_id)} className="flex justify-between gap-2">
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
          <div className="flex-center space-x-2">
            <span>{name}</span>
          </div>
        </Badge>
  
        {showCount && (
          <p className="small-medium text-dark500_light700">{equipment}</p>
        )}
      </Link>
    );
}

export default CategoryCard;