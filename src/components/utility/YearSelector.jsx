import React, { useEffect, useState } from 'react'

function Selector({ setValue, values, className}) {
  return (
    <select className={className} name="" id="" onChange={event => setValue(event.target.value)}>
      <option value={null}>Select Year</option>
      {values?.map((value) => {
        return <option value={value}>{value}</option>
      }
    )}
    </select>
  )
}

export default Selector