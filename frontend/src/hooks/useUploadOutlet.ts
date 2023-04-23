import { useOutletContext } from 'react-router-dom';
import { EStep } from '@/views/Upload';

interface IUploadOutletContext {
  maxStep: number;
  navigateStep: (step: EStep) => void;
}
export const useUploadOutlet = () => useOutletContext<IUploadOutletContext>();
