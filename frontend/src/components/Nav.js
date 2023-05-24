import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='flex justify-around items-center  shadow-md h-16'>
        <ul className='flex justify-evenly w-1/3 h-[inherit] items-center'>
            <li className='h-[inherit] flex items-center'><NavLink className={(navData) => (navData.isActive ? 'text-blue-500 h-[inherit] border-blue-500 border-t-2 flex items-center': '')} to='/'>Tasks</NavLink></li>
            <li className='h-[inherit] flex items-center'><NavLink className={(navData) => (navData.isActive ? 'text-blue-500 h-[inherit] border-blue-500 border-t-2 flex items-center': '')} to='/progress'>In Progress</NavLink></li>
            <li className='h-[inherit] flex items-center'><NavLink className={(navData) => (navData.isActive ? 'text-blue-500 h-[inherit] border-blue-500 border-t-2 flex items-center' : '')} to='/completed'>Completed</NavLink></li>
            <li className='h-[inherit] flex items-center'><NavLink className={(navData) => (navData.isActive ? 'text-blue-500 h-[inherit] border-blue-500 border-t-2 flex items-center' : '')} to='/addtask'>Add New</NavLink></li>
        </ul>
        <ul>
          <li className='h-[inherit] flex items-center'><NavLink to='/'>Task Manager</NavLink></li>
        </ul>
    </div>
  )
}
