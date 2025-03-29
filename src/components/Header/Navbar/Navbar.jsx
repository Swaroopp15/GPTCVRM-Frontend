import React, { useContext } from 'react'
import DropDown from './DropDown'
import Drop from '../../../assets/icons/Drop'
import { Context } from '../../../../Context/Context'
import objectToArray from '../../../functions/objectsToArray';
import { Link } from 'react-router';

function Navbar() {
  const {committees, departmentNames} = useContext(Context);
  return (
    <nav class="mx-5 flex flex-row gap-4 text-gray-700">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
  <DropDown name={"departments"} values={objectToArray(departmentNames)} link={"/department/"} />
  <DropDown name={"committees"} values={objectToArray(committees)} link={"/committee/"} />
      <Link to={"/results"}>Results</Link>
      <Link to={"/placements"}>Placements</Link>
  <DropDown name={"others"} values={["placements", "results"]} />
</nav>

  )
}

export default Navbar