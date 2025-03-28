import EquipmentForm from '@/components/forms/EquipmentForm'
import React from 'react'

const AddEquipment = () => {
  return (
    <>
    <h1 className='h1-bold text-dark100_light900'>
      Add an Equipment
    </h1>
    <div>
      <EquipmentForm />
    </div>
    </>
  )
}

export default AddEquipment