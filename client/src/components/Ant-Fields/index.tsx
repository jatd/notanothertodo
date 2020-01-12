import * as React from 'react';
import { Form, Input, DatePicker, Select } from 'antd';

const FormItem = Form.Item;

interface AntComponentProps {
  field: any;
  form: any;
  hasFeedback: boolean;
  label: string;
  submitCount: Number;
  type: string;
  selectOptions: any;
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateAntField = (AntComponent: any) => ({
  field,
  form,
  hasFeedback,
  label,
  submitCount,
  type,
  selectOptions,
  ...props
}: AntComponentProps) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }: any) =>
    form.setFieldValue(field.name, value);
  const onChange = (value: any) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
        label={label}
      >
        <AntComponent
          {...field}
          {...props}
          type={type}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name: any) => (
              <Option key={name}>{name}</Option>
            ))}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntRangePicker = CreateAntField(RangePicker);
