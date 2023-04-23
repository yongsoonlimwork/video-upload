import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { EStep } from '@/views/Upload';

interface IStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  maxStep: number;
  navigateStep: (step: number) => void;
  disableNavigateOnLast?: boolean;
}

const StepIndicator: React.FC<IStepIndicatorProps> = ({
  totalSteps,
  currentStep,
  maxStep,
  navigateStep,
  disableNavigateOnLast
}) => {
  const content = useMemo(() => {
    console.log({ currentStep, disableNavigateOnLast, maxStep, navigateStep, totalSteps });
    const contentList: React.ReactNode[] = [];
    if (!totalSteps) {
      return contentList;
    }
    for (let i = 1; i <= totalSteps; i++) {
      const disableClick = (disableNavigateOnLast && maxStep === totalSteps) || i === currentStep || i > maxStep;
      console.log({ i, disableClick, maxStep, totalSteps, disableNavigateOnLast });
      if (i > 1) {
        contentList.push(<StepLine key={`line_${i}`} highlight={i <= currentStep} />);
      }
      contentList.push(
        <StepDot
          key={`dot_${i}`}
          isActive={i === currentStep}
          highlight={currentStep > i}
          clickable={!disableClick}
          onClick={disableClick ? undefined : () => navigateStep(i as EStep)}
        >
          {i}
        </StepDot>
      );
    }

    return contentList;
  }, [currentStep, disableNavigateOnLast, maxStep, navigateStep, totalSteps]);

  return <Container>{content}</Container>;
};

export default StepIndicator;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

interface IStepDotProps {
  isActive?: boolean;
  highlight?: boolean;
  clickable?: boolean;
}

const StepDot = styled.div<IStepDotProps>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${({ highlight }) => (highlight ? 'mediumpurple' : '#ffffff')};
  color: black;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
  border: 3px solid white;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive }) =>
    isActive &&
    css`
      border: 3px solid mediumpurple;
    `}

  ${({ highlight }) =>
    highlight &&
    css`
      border: 3px solid mediumpurple;
    `}
`;

interface IStepLineProps {
  highlight?: boolean;
}

const StepLine = styled.div<IStepLineProps>`
  height: 10px;
  flex: 1;
  background-color: ${({ highlight }) => (highlight ? 'mediumpurple' : '#ffffff')};
  margin-left: -1px;
  margin-right: -1px;
  position: relative;
  z-index: -1;
`;
