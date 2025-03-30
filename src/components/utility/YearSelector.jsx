import React, { useEffect, useState } from 'react'

function Selector({ setValue, values}) {
  return (
    <select name="" id="">
      {values?.map((value) => {
        return <option value={value} onClick={() => setValue(value)}>{value}</option>
      }
    )}
    </select>
  )
}

export default Selector