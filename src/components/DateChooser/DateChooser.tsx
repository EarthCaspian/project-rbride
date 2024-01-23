import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateChooserProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DateChooser: React.FC<DateChooserProps> = ({ selectedDate, onDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => onDateChange(date)}
      dateFormat="MMMM d, yyyy"
      className="form-control" 
    />
  );
};

export default DateChooser;
