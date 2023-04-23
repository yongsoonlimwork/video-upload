import React, { useEffect, useRef } from 'react';
import { InputError, InputLabel, InputLabelWrapper, InputWrapper } from '@/components/Common';
import Button from '@/components/Button';
import styled from 'styled-components';

interface IFileUploadProps {
  label: string;
  value?: File;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onRemove?: () => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({ label, value, onChange, error, onRemove }) => {
  const ref = useRef<HTMLSourceElement>(null);

  useEffect(() => {
    if (value && ref.current) {
      ref.current.src = URL.createObjectURL(value);
    }
  }, [value]);

  return (
    <InputWrapper>
      <InputLabelWrapper>
        <InputLabel>{label}:</InputLabel>
        {!value && <input type="file" onChange={onChange} />}
      </InputLabelWrapper>
      {value && (
        <FileDisplayWrapper>
          <FileAttributeWrapper>
            <span>File Name:</span>
            {value.name}
          </FileAttributeWrapper>
          <FileAttributeWrapper>
            <span>File Preview:</span>
            <StyledVideo controls>
              <source ref={ref} type={value.type} />
            </StyledVideo>
          </FileAttributeWrapper>
          <Button size="small" onClick={onRemove}>
            Remove File
          </Button>
        </FileDisplayWrapper>
      )}
      <InputError>{error}</InputError>
    </InputWrapper>
  );
};

export default FileUpload;

const FileDisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;

  & > * {
    margin-bottom: 5px;
  }
`;

const FileAttributeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledVideo = styled.video`
  width: auto;
  height: 300px;
`;
