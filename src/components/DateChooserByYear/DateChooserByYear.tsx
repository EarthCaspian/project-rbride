import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateChooserProps {
  onDateChange: (date: Date) => void;
  selectedDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
}

const DateChooser: React.FC<DateChooserProps> = ({
  onDateChange,
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd-MM-yyyy"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      placeholderText="Select a date"
      minDate={minDate}
      maxDate={maxDate}
      className="border border-secondary border-1 border-opacity-25"
    />
  );
};

export default DateChooser;
