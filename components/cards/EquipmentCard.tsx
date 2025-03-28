import ROUTES from '@/constants/routes'
import { getTimeStamp } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import CategoryCard from './CategoryCard'
import Metric from '../Metric'
import Image from 'next/image'

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
    category,
    imgUrl,
    amount,
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

                <Link href={ROUTES.EQUIPMENT(_id)}>
                    <div>
                        <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                        {name}
                        </h3>
                        <Image
                            src={imgUrl || '/images/default_equipment.png'}
                            alt={`${name} photo missing`}
                            width={150}
                            height={150}
                            className='my-5 ml-0 rounded-[10px] body-medium text-dark400_light800 mx-10 w-fit'
                        />
                
                { brandname && <h5 className='body-medium text-dark400_light800'>Brand Name: {brandname}</h5>}
                { modelname && <h5 className='body-medium text-dark400_light800'>Model Name: {modelname}</h5>}
                { serialNumber && <h5 className='body-medium text-dark400_light800'>Serial Number: {serialNumber}</h5>}
                { assetTag && <h5 className='body-medium text-dark400_light800'>Asset Tag: {assetTag}</h5>}
                {
                    subunits && subunits.length > 0 && (
                        <ul className='body-medium text-dark400_light800 line-clamp-1 flex-1'> Subunits: 
                            {subunits.map((subunit, index) => (
                                <li className='body-medium text-dark400_light800 mx-10' key={index}>
                                    name: {subunit.name}  
                                    { brandname && <h6>Brand Name: {subunit.brandname}</h6>}  
                                    { modelname && <h6>Model Name: {subunit.modelname}</h6>}   
                                    { serialNumber && <h6>Serial Number: {subunit.serialNumber}</h6>} 
                                    { assetTag && <h6>Asset Tag: {subunit.assetTag}</h6>}
                                    <br />
                                </li>
                            ))}
                        </ul>
                    )
                }

                { labNumber && <h5 className='body-medium text-dark400_light800'>Room/Lab Number: {labNumber}</h5>}
                { labName && <h5 className='body-medium text-dark400_light800'>Room/Lab Name: {labName}</h5>}
                { team && <h5 className='body-medium text-dark400_light800'>Team: {team}</h5>}
                { serviceDate && <h5 className='body-medium text-dark400_light800'>Service Date: {serviceDate instanceof Date ? serviceDate.toDateString() : 'Invalid Date'}</h5>}
                { amount && <h5 className='body-medium text-dark400_light800'>Amount: {amount}</h5>}
                { comment && <h5 className='body-medium text-dark400_light800 line-clamp-1 flex-1'>Comment: {comment}</h5> }
                    </div>
                </Link>
            </div>
        </div>

        <div className='mt-3.5 flex w-full flex-wrap gap-2'>
            { category && <CategoryCard key={category._id} _id={category._id} name={category.name} compact/>}  
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
                    isAuthor
                />
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