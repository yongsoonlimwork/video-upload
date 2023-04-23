import React, { useCallback, useEffect } from 'react';
import Button from '@/components/Button';
import { EStep } from '@/views/Upload';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { IStep1FormData } from '@/service/upload/service';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import FileUpload from '@/components/FileUpload';
import TextInput from '@/components/TextInput';
import { useUploadOutlet } from '@/hooks/useUploadOutlet.ts';
import dayjs, { DATETIME_FORMAT, DATETIME_SECONDS_FORMAT, DATETIME_SECONDS_REGEX } from '@common/libs/dayjs';
import { uploadFormService } from '@/service/upload';

const schema = yup.object().shape({
  file: yup
    .mixed<File>()
    .required('Field is required')
    .test('file-format', 'Invalid file format', (value) => {
      if (value) {
        return ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type);
      }
      return true;
    }),
  title: yup.string().required('Field is required'),
  startDateTime: yup
    .string()
    .required('Field is required')
    .test('date-time-format', 'Invalid date time', (value) => {
      const isValidString = DATETIME_SECONDS_REGEX.test(value);
      const dayjsObj = dayjs(value, [DATETIME_FORMAT, DATETIME_SECONDS_FORMAT], true);
      console.log(dayjsObj);
      return isValidString ? dayjsObj.isValid() : false;
    }),
  location: yup
    .string()
    .required('Field is required')
    .test('postal-code-format', 'Invalid location format', (value) => /^\d{6}$/.test(value))
});

const Step1: React.FC = () => {
  const { navigateStep } = useUploadOutlet();
  const { formState, handleSubmit, reset, setValue, trigger, watch } = useForm<IStep1FormData>({
    resolver: yupResolver(schema)
  });
  const [file, title, startDateTime, location] = watch(['file', 'title', 'startDateTime', 'location']);
  const { errors, isDirty } = formState;

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      setValue('file', fileList ? fileList[0] : undefined, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const onFileRemove = useCallback(() => {
    setValue('file', undefined, { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  const onTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('title', event.target.value, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const onStartDatetimeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('startDateTime', event.target.value, { shouldDirty: true });
    },
    [setValue]
  );

  const onStartDateTimeBlur = useCallback(() => {
    trigger('startDateTime');
  }, [trigger]);

  const onLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('location', event.target.value, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const onSubmit = useCallback(
    (values: IStep1FormData) => {
      console.log(values);
      uploadFormService.saveStep1Data(values);
      navigateStep(EStep.STEP_2);
    },
    [navigateStep]
  );

  const onSave = useCallback(
    (values: IStep1FormData) => {
      console.log(values);
      uploadFormService.saveStep1Data(values);
      reset(values);
    },
    [reset]
  );

  useEffect(() => {
    if (isDirty) {
      uploadFormService.saveStep1Data(undefined);
    }
  }, [isDirty]);

  useEffect(() => {
    reset(uploadFormService.getStep1Data() || {});
  }, [reset]);

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FileUpload
          label="Video File"
          value={file}
          error={errors.file?.message}
          onChange={onFileChange}
          onRemove={onFileRemove}
        />
        <TextInput label="Video Title" value={title} error={errors.title?.message} onChange={onTitleChange} />
        <TextInput
          label="Video Start Datetime"
          value={startDateTime}
          error={errors.startDateTime?.message}
          onChange={onStartDatetimeChange}
          onBlur={onStartDateTimeBlur}
          help={`Format: (${DATETIME_SECONDS_FORMAT})`}
        />
        <TextInput
          label="Video Location"
          value={location}
          error={errors.location?.message}
          onChange={onLocationChange}
        />
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

export default Step1;

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

const ButtonWrapper = styled.div`
  display: flex;
  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;
