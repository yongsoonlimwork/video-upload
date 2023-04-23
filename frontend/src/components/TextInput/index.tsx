import React from 'react';
import { InputError, InputHelp, InputLabel, InputLabelWrapper, InputWrapper } from '@/components/Common';

interface IFileUploadProps {
  label: string;
  help?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const FileUpload: React.FC<IFileUploadProps> = ({ label, help, value = '', onChange, onBlur, error }) => {
  return (
    <InputWrapper>
      <InputLabelWrapper>
        <InputLabel>{label}:</InputLabel>
        {!!help && <InputHelp>{help}</InputHelp>}
        <input type="text" onChange={onChange} onBlur={onBlur} value={value} />
      </InputLabelWrapper>
      <InputError>{error}</InputError>
    </InputWrapper>
  );
};

export default FileUpload;
