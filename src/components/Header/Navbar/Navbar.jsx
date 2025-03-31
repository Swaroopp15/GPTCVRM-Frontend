import React, { useContext } from 'react'
import DropDown from './DropDown'
import { Context } from '../../../../Context/Context'
import objectToArray from '../../../functions/objectsToArray';
import { Link } from 'react-router';

function Navbar({ mobile = false }) {
  const { committees, departmentNames } = useContext(Context);

  return (
    <nav className={`${mobile ? 'flex flex-col p-4 space-y-4' : 'hidden md:flex md:flex-row md:gap-4'} text-gray-700`}>
      <Link to="/" className="hover:text-red-700 transition-colors">Home</Link>
      <Link to="/about" className="hover:text-red-700 transition-colors">About</Link>
      <DropDown
        name="departments"
        values={objectToArray(departmentNames)}
        link="/department/"
        mobile={mobile}
      />
      <DropDown
        name="committees"
        values={objectToArray(committees)}
        link="/committee/"
        mobile={mobile}
      />
      <Link to="/placements" className="hover:text-red-700 transition-colors">Placements</Link>
      <DropDown
        name="others"
        values={[{name: "Login",code: "adminLogin"} ,{name : "results", code:"results"},{ name: "events", code: "events"}, {name: "gallery", code: "gallery"}, {name:"contact", code: "contact"}]}
        link="/"
        mobile={mobile}
      />
    </nav>
  )
}

export default Navbar