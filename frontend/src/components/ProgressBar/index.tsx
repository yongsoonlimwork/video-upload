import React from 'react';
import styled from 'styled-components';

interface IProgressBarProps {
  progress?: number;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ progress = 0 }) => {
  return (
    <ProgressBarOuter>
      <ProgressBarInner progress={progress} />
      <ProgressBarText>{progress}%</ProgressBarText>
    </ProgressBarOuter>
  );
};

export default ProgressBar;

const ProgressBarOuter = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  background-color: aliceblue;
`;

interface IProgressBarInnerProps {
  progress: number;
}

const ProgressBarInner = styled.div<IProgressBarInnerProps>`
  width: ${({ progress }) => `${progress}%`};
  height: 30px;
  background-color: aquamarine;
`;

const ProgressBarText = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
  height: 30px;
  color: black;
`;
