import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import StepIndicator from '@/views/Upload/StepIndicator';
import CenterWrapper from '@/components/CenterWrapper';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { uploadFormService } from '@/service/upload';

export enum EStep {
  STEP_1 = 1,
  STEP_2 = 2,
  STEP_3 = 3
}

const TOTAL_STEPS = 3;

const Upload: React.FC = () => {
  const [maxStep, setMaxStep] = useState<EStep>(EStep.STEP_1);
  const [currentStep, setCurrentStep] = useState<EStep>(EStep.STEP_1);

  const navigate = useNavigate();

  const navigateStep = useCallback(
    (step: EStep) => {
      if (step > currentStep && currentStep !== TOTAL_STEPS && !uploadFormService.checkHasData(currentStep)) {
        alert('Please complete the form');
        return;
      }
      setMaxStep((prevState) => (prevState < step ? step : prevState));
      setCurrentStep(step);
      switch (step) {
        case EStep.STEP_1:
          return navigate(ROUTES.UPLOAD_STEP_1);
        case EStep.STEP_2:
          return navigate(ROUTES.UPLOAD_STEP_2);
        case EStep.STEP_3:
          return navigate(ROUTES.UPLOAD_STEP_3);
      }
    },
    [currentStep, navigate]
  );

  return (
    <CenterWrapper>
      <Container>
        <StepIndicator
          totalSteps={TOTAL_STEPS}
          currentStep={currentStep}
          maxStep={maxStep}
          navigateStep={navigateStep}
          disableNavigateOnLast
        />
        <Outlet context={{ maxStep, navigateStep }} />
      </Container>
    </CenterWrapper>
  );
};

export default Upload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
