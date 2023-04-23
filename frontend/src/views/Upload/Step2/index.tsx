import React, { useCallback, useEffect } from 'react';
import { EStep } from '@/views/Upload';
import Button from '@/components/Button';
import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { IStep2FormData } from '@/service/upload/service.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@/components/Checkbox';
import { useUploadOutlet } from '@/hooks/useUploadOutlet.ts';
import { uploadFormService, useUploadFormService } from '@/service/upload';

const REQUIRED_TEXT = 'Field must be acknowledged';

const schema = yup.object().shape({
  privacy: yup.boolean().required(REQUIRED_TEXT).oneOf([true], REQUIRED_TEXT),
  tnc: yup.boolean().required(REQUIRED_TEXT).oneOf([true], REQUIRED_TEXT)
});

const Step2: React.FC = () => {
  const { step1Data } = useUploadFormService(['step1Data']);
  const { navigateStep } = useUploadOutlet();
  const { formState, handleSubmit, reset, setValue, watch } = useForm<IStep2FormData>({
    resolver: yupResolver(schema)
  });
  const [privacy, tnc] = watch(['privacy', 'tnc']);
  const { errors, isDirty } = formState;

  const onPrivacyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('privacy', event.target.checked, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const onTnCChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('tnc', event.target.checked, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const onSubmit = useCallback(
    (values: IStep2FormData) => {
      console.log(values);
      uploadFormService.saveStep2Data(values);
      navigateStep(EStep.STEP_3);
    },
    [navigateStep]
  );

  const onSave = useCallback(
    (values: IStep2FormData) => {
      console.log(values);
      uploadFormService.saveStep2Data(values);
      reset(values);
    },
    [reset]
  );

  useEffect(() => {
    if (!step1Data) {
      setTimeout(() => {
        navigateStep(EStep.STEP_1);
      }, 0);
      return;
    }

    reset(uploadFormService.getStep2Data() || {});
  }, [navigateStep, reset, step1Data]);

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Text>I agree to the following:</Text>
        <StyledUL>
          <StyledLI>
            <Checkbox
              label="Privacy Policy"
              value={privacy}
              onChange={onPrivacyChange}
              error={errors.privacy?.message}
            />
          </StyledLI>
          <StyledLI>
            <Checkbox label="Terms and Conditions" value={tnc} onChange={onTnCChange} error={errors.tnc?.message} />
          </StyledLI>
        </StyledUL>
        <ButtonWrapper>
          <Button type="button" onClick={handleSubmit(onSave)} disabled={!isDirty}>
            Save Changes
          </Button>
          <Button type="submit">Next</Button>
        </ButtonWrapper>
      </StyledForm>
    </Container>
  );
};

export default Step2;

const Container = styled.div`
  margin-top: 30px;
  min-width: 500px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > * {
    margin-bottom: 20px;
  }
`;

const Text = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
`;

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledLI = styled.li`
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;
