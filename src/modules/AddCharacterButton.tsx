import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddCharacterButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/characterCreate');
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center min-w-20 min-h-20 rounded-lg border-4 border-neutral-100 hover:border-red-500 hover:cursor-pointer hover:shadow-md"
    >
      <FaPlus size={21} />
    </button>
  );
};

export default AddCharacterButton;
