import React from 'react';
import BackgroundForm from '../../forms/BackgroundForm';

const StepFive: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 text-center">
          Tell us more about your background
        </h2>
        <BackgroundForm />
      </div>
    </div>
  );
};

export default StepFive;
