import React, { useState } from 'react';

import LocationPicker from './LocationPicker';
import SmartDateTimePicker from './SmartDatePicker';
import MediaUploader from './MediaUploader';
import Invites from './Invites';
import Step1 from './Step1 EventInfo';
import ReviewEvent from './ReviewEvent';

const steps = [
  { id: 1, name: 'EventInfo' },
  { id: 2, name: 'Date&Time' },
  { id: 3, name: 'Location' },
  { id: 4, name: 'Media ' },
  { id: 5, name: 'Invites' },
  { id: 6, name: 'Review' },
];

const EventForm = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} />;
      case 2:
        return <SmartDateTimePicker setStep={setStep} />;
      case 3:
        return <LocationPicker setStep={setStep} />;
      case 4:
        return <MediaUploader setStep={setStep} />;
      case 5:
        return <Invites setStep={setStep} />;
      case 6:
        return <ReviewEvent setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl fixed w-[100%] mx-30 h- m-auto top-40 lg:h-180  mx-auto bg-gray-900  p-4  rounded-2xl shadow-lg">
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((s) => (
          <div key={s.id} className="flex-1 text-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step === s.id
                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s.id}
            </div>
            <span
              className={`text-xs py-2 sm:text-sm font-medium ${
                step === s.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-10">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${(step - 1) * 20}%` }}
        ></div>
      </div>

      {/* Current Step Component */}
      <div >{renderStep()}</div>
      
  
    </div>
  );
};

export default EventForm;
