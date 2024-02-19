import { FieldProps, useField } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateChooserFieldProps extends FieldProps{
  name ?: string | null;
  minDate: Date | null;
  maxDate: Date | null;
}

const DateChooserField: React.FC<DateChooserFieldProps> = (props : DateChooserFieldProps) => {
  const [field, state, {setValue}] = useField(props.field.name);
  const [selectedDate, setSelectedDate] = useState<Date | null> (null);

  const handleDateChange = (value : Date | null) => {
    setSelectedDate(value);
    setValue(value?.toJSON());
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
      minDate={props.minDate}
      maxDate={props.maxDate}
      className="border border-secondary border-1 border-opacity-25"
    />
  );
};

export default DateChooserField;
