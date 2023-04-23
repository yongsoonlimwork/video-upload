import React from 'react';
import CenterWrapper from '@/components/CenterWrapper';
import styled from 'styled-components';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onStart = () => {
    navigate(ROUTES.UPLOAD_STEP_1);
  };

  return (
    <CenterWrapper>
      <Title>Video Uploader</Title>
      <Button onClick={onStart}>Start</Button>
    </CenterWrapper>
  );
};

export default Home;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 40px;
`;
