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
      className="primary flex justify-center items-center min-w-32 min-h-32"
    >
      <FaPlus size={21} />
    </button>
  );
};

export default AddCharacterButton;
