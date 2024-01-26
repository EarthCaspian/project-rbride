import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateChooserProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  minDate : Date
  closeWin: boolean
}

const DateChooser: React.FC<DateChooserProps> = ({ selectedDate, onDateChange, minDate, closeWin}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => onDateChange(date)}
      minDate={minDate}
      shouldCloseOnSelect={closeWin}
      dateFormat="MMMM d, yyyy"
      className="form-control"      
    />
  );
};

export default DateChooser;
