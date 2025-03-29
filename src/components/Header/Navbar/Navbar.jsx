import React, { useContext } from 'react'
import DropDown from './DropDown'
import Drop from '../../../assets/icons/Drop'
import { Context } from '../../../../Context/Context'
import objectToArray from '../../../functions/objectsToArray';

function Navbar() {
  const {committees, departmentNames} = useContext(Context);
  return (
    <nav class="mx-5 flex flex-row gap-4 text-gray-700">
  <p>Home</p>
  <p>About</p>
  <DropDown name={"departments"} values={objectToArray(departmentNames)} link={"/department/"} />
  <DropDown name={"committees"} values={objectToArray(committees)} link={"/committee/"} />
  <DropDown name={"others"} values={["placements", "results"]} />
</nav>

  )
}

export default Navbar