import ROUTES from '@/constants/routes'
import { getTimeStamp } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import CategoryCard from './CategoryCard'
import Metric from '../Metric'

interface Props {
    equipment: Equipment
}

const EquipmentCard = ({equipment : {
    _id,
    name,
    brandname,
    modelname,
    serialNumber,
    assetTag,
    subunits,
    labNumber,
    labName,
    team,
    serviceDate,
    comment,
    categories,
    imgUrl,
    author,
    views,
    createdAt,
}}: Props) => {
  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
        <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
            <div>
                <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
                    Added {getTimeStamp(createdAt)}
                </span>

                <Link href={ROUTES.EQUIPMENT(_id)}><h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                    {name}
                </h3>
                </Link>
            </div>
        </div>

        <div className='mt-3.5 flex w-full flex-wrap gap-2'>
            {categories.map((category: Categories) => (
                <CategoryCard key={category._id} _id={category._id} name={category.name} compact/>  
            ))}
        </div>

        <div className='flex-between mt-6 w-full flex-wrap gap-3'>
            
            {author && (
                <Metric
                imgUrl={author.image || '/images/default_user.png'}
                alt={author.name}
                value={author.name}
                title={`• added ${getTimeStamp(createdAt)}`}
                href={ROUTES.PROFILE(author._id)}
                textStyles="body-medium text-dark400_light700"
                isAuthor/>
            )
            }

            <div className='flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start'>
                <Metric
                    imgUrl="/icons/eye.svg"
                    alt={name}
                    value={views ?? 0}
                    title=" Views"
                    textStyles = "small-medium text-dark400_light700"
                />
            </div>
        </div>
    </div>
  )
}

export default EquipmentCard