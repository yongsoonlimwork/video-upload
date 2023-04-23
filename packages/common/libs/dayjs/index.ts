import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

dayjs.Ls.en.weekStart = 1;

export const DATETIME_SECONDS_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const DATETIME_SECONDS_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/;

export default dayjs;
