import Service from 'react-reservice';
import { EStep } from '@/views/Upload';
import axios from 'axios';

export interface IStep1FormData {
  file?: File;
  title?: string;
  startDateTime?: string; // YYYY-MM-DD HH:mm:ss
  location?: string;
}

export interface IStep2FormData {
  privacy?: boolean;
  tnc?: boolean;
}

interface IUploadFormServiceContext {
  step1Data?: IStep1FormData;
  step2Data?: IStep2FormData;
  progress?: number;
}

const defaultContext: IUploadFormServiceContext = {
  step1Data: undefined,
  step2Data: undefined,
  progress: undefined
};

class UploadFormService extends Service<IUploadFormServiceContext> {
  constructor() {
    super();

    this.context = {
      ...defaultContext
    };
  }

  saveStep1Data = (data?: IStep1FormData) => {
    this.context.step1Data = data;
  };

  saveStep2Data = (data?: IStep2FormData) => {
    this.context.step2Data = data;
  };

  getStep1Data = () => this.context.step1Data;

  getStep2Data = () => this.context.step2Data;

  checkHasData = (step: EStep) => {
    if (step === EStep.STEP_1) {
      return !!this.context.step1Data;
    } else if (step === EStep.STEP_2) {
      return !!this.context.step2Data;
    } else {
      return false;
    }
  };

  doUpload = async () => {
    const { step1Data, step2Data } = this.context;
    const { file, title, startDateTime, location } = step1Data || {};
    if (!file || !title || !startDateTime || !location || !step2Data) {
      throw Error('Data is invalid');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('startDateTime', startDateTime);
    formData.append('location', location);
    await axios.post('http://localhost:8000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        this.context.progress = Math.round((100 * data.loaded) / (data.total || 1));
      }
    });
  };
}

export default new UploadFormService();
