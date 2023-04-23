import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@/constants/routes';
import Home from '@/views/Home';
import Upload from '@/views/Upload';
import Step1 from '@/views/Upload/Step1';
import Step2 from '@/views/Upload/Step2';
import Step3 from '@/views/Upload/Step3';

const App: React.FC = () => {
  return (
    <Container>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.UPLOAD} element={<Upload />}>
          <Route path={ROUTES.UPLOAD_STEP_1} element={<Step1 />} />
          <Route path={ROUTES.UPLOAD_STEP_2} element={<Step2 />} />
          <Route path={ROUTES.UPLOAD_STEP_3} element={<Step3 />} />
          <Route index element={<Navigate to={ROUTES.UPLOAD_STEP_1} />} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;
