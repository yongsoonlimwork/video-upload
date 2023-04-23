import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { uploadFormService, useUploadFormService } from '@/service/upload';
import ProgressBar from '@/components/ProgressBar';
import { useUploadOutlet } from '@/hooks/useUploadOutlet.ts';
import { EStep } from '@/views/Upload';

const Step3: React.FC = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const { step1Data, step2Data, progress } = useUploadFormService(['step1Data', 'step2Data', 'progress']);
  const { navigateStep } = useUploadOutlet();

  useEffect(() => {
    if (!step1Data || !step2Data) {
      setTimeout(() => {
        navigateStep(EStep.STEP_1);
      }, 0);
      return;
    }

    uploadFormService
      .doUpload()
      .then(() => {
        setSuccess('File successfully uploaded');
      })
      .catch((err) => {
        alert(`An error occurred: ${err.message}`);
      });
  }, [navigateStep, step1Data, step2Data]);

  return (
    <Container>
      {success ? (
        <SuccessText>{success}</SuccessText>
      ) : (
        <UploadingWrapper>
          <UploadingText>Uploading file...</UploadingText>
          <ProgressBar progress={progress} />
        </UploadingWrapper>
      )}
    </Container>
  );
};

export default Step3;

const Container = styled.div`
  margin-top: 30px;
  min-width: 500px;
`;

const SuccessText = styled.div`
  width: 100%;
  text-align: center;
`;

const UploadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadingText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
