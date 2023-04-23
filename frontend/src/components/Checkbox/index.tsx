import React from 'react';
import { InputError, InputLabelWrapperHorizontal, InputWrapper } from '@/components/Common';
import styled from 'styled-components';

interface IFileUploadProps {
  label: React.ReactNode;
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Checkbox: React.FC<IFileUploadProps> = ({ label, value = false, onChange, error }) => {
  return (
    <InputWrapper>
      <InputLabelWrapperHorizontal>
        <StyledInput type="checkbox" checked={value} onChange={onChange} />
        <CheckboxLabel>{label}</CheckboxLabel>
      </InputLabelWrapperHorizontal>
      <InputError>{error}</InputError>
    </InputWrapper>
  );
};

export default Checkbox;

const StyledInput = styled.input`
  margin: 0;
`;

const CheckboxLabel = styled.div`
  margin-left: 8px;
`;
