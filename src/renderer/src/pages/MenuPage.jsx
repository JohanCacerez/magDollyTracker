// src/renderer/src/components/SelectionMenu.js
import React from 'react'
import { FaBox, FaDolly } from 'react-icons/fa'

const Menu = ({ onSelect }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-4">
        <button
          className="flex items-center bg-blue-500 text-white px-6 py-4 rounded shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={() => onSelect('Magazine Tracker')}
        >
          <FaBox className="w-8 h-8 mr-2" />
          <span className="text-lg">Magazine Tracker</span>
        </button>
        <button
          className="flex items-center bg-green-500 text-white px-6 py-4 rounded shadow-lg hover:bg-green-700 transition duration-300"
          onClick={() => onSelect('Dollie Tracker')}
        >
          <FaDolly className="w-8 h-8 mr-2" />
          <span className="text-lg">Dollie Tracker</span>
        </button>
      </div>
    </div>
  )
}

export default Menu
