import uploadFormService from './service';
import { getUseServiceWithSubscriptionKeys } from '@common/utils';

export const useUploadFormService = getUseServiceWithSubscriptionKeys(uploadFormService);

export { uploadFormService };
