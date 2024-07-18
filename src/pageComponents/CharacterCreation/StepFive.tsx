import React from 'react';
import BackgroundForm from '../../forms/BackgroundForm';

const StepFive: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="border p-2">Tell us more about your background</h2>
      <BackgroundForm />
    </div>
  );
};

export default StepFive;
