import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isWeekend, isBefore } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { setDate, setTime } from '../features/eventCreationSlice';
import { useDispatch } from 'react-redux';

const popularTimes = ['10:00', '12:00', '16:00', '18:00']; // HH:mm format

const SmartDateTimePicker = ({ setStep }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const dispatch = useDispatch();

  const today = new Date();

  const isPastDate = (date) => isBefore(date, today);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':');
      const fullDateTime = new Date(selectedDate);
      fullDateTime.setHours(hours);
      fullDateTime.setMinutes(minutes);
      const date = fullDateTime.toISOString();
      const dateObj = new Date(date);
      const istTime = dateObj.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
      });
      const actualDate = date.split('T')[0];
      const actualTime = istTime;
      dispatch(setDate(actualDate));
      dispatch(setTime(actualTime));
      setStep(prev=>prev+1)
    }
  };

  return (
    <div className="space-y-6 p-2 bg-white border   dark:bg-gray-800 rounded-lg shadow-md">
      {/* Date Picker Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Pick a Date
        </h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={(date) => !isPastDate(date)}
          highlightDates={[{ 'react-datepicker__day--highlighted-custom-1': [new Date()] }]}
          dayClassName={(date) =>
            isWeekend(date)
              ? 'bg-yellow-100 text-red-600 font-semibold dark:bg-yellow-900 dark:text-red-400'
              : 'text-gray-900 dark:text-gray-200'
          }
          placeholderText="Select a date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-colors duration-200"
          calendarClassName="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
          wrapperClassName="w-full"
        />
      </div>

      {/* Time Picker Section */}
      {selectedDate && (
        <div className="animate-fade-in p-2 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Select a Time
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {selectedTime || 'No time selected'}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {popularTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-2 py-1  rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedDate || !selectedTime}
        className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          selectedDate && selectedTime
            ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
        }`}
      >
        Confirm Selection
      </button>
        <button
        onClick={()=>{step>1&&setStep(prev=>prev-1)}}
        className="bg-green-600 hover:bg-gray-900 px-8 active:bg-red-900 text-white m-2 p-2 rounded-md mt-4"
      >
        Prev
      </button>
    </div>
  );
};

export default SmartDateTimePicker;