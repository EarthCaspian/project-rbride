import { FieldProps, useField } from "formik";
import React, { useEffect } from "react";
import Select from "react-select";

export type OptionType = {
  label: string; //The label represents the display name of the option in the UI.
  value: number; //The Value specifies the numeric value in the option's data model, typically an ID.
}

interface CustomSelectProps extends FieldProps {
  name : string;
  options: OptionType[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  selectedValues ?: OptionType | OptionType[];
}


export const CustomSelect = (props : CustomSelectProps) => {

    const [field, state, {setValue}] = useField(props.field.name)

    useEffect( () => {
        //sets the previously selected options as the currently selected options when the component mounts. 
        setValue(props.selectedValues);  
    }, [])

    const onChange = (value : OptionType | OptionType[]) => {
      setValue(value);
    };

    return (
        <Select
          name={field.name}
          value={state?.value}
          onChange={onChange}
          options={props.options}
          isMulti={props.isMulti}
        />
    );
};

export default CustomSelect;


