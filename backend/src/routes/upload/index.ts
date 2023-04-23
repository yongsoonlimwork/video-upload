import express, { Request, Response } from 'express';
import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import dayjs, { DATETIME_FORMAT, DATETIME_SECONDS_FORMAT, DATETIME_SECONDS_REGEX } from '@common/libs/dayjs';
import sqlite3 from 'sqlite3';

const router = express.Router();
const upload = multer({ dest: './assets/uploads/' });
const uploadVideoFile = upload.single('file');
const DB_PATH = path.join(path.dirname(path.dirname(path.dirname(__dirname))), 'assets', 'db', 'sqlite.db');

interface IInsertDataToDBParams {
  tableName: string;
  params: Record<string, number | string>;
  callback: (error: Error | null) => void;
}

const insertDataToDB = ({ tableName, params, callback }: IInsertDataToDBParams) => {
  const db = new sqlite3.Database(DB_PATH);
  const cols = Object.keys(params).join(', ');
  const placeholders = Object.keys(params).fill('?').join(', ');
  const sql = `INSERT INTO ${tableName}(${cols}) VALUES(${placeholders})`;
  db.run(sql, Object.values(params), (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Row was added to the table: ${this.lastID}');
    callback(err);
  });
};

interface IDataUpload {
  title: string;
  startDateTime: string;
  location: string;
}

const uploadSchema = yup.object().shape({
  file: yup
    .mixed<Express.Multer.File>()
    .required('Video file is required')
    .test('file-format', 'Invalid video file format', (value) => {
      if (value) {
        return ['video/mp4', 'video/webm', 'video/ogg'].includes(value.mimetype);
      }
      return true;
    }),
  title: yup.string().required('Video Title is required'),
  startDateTime: yup
    .string()
    .required('Start Datetime is required')
    .test('date-time-format', 'Invalid start datetime', (value) => {
      const isValidString = DATETIME_SECONDS_REGEX.test(value);
      const dayjsObj = dayjs(value, [DATETIME_FORMAT, DATETIME_SECONDS_FORMAT], true);
      return isValidString ? dayjsObj.isValid() : false;
    }),
  location: yup
    .string()
    .required('Video Location is required')
    .test('postal-code-format', 'Invalid location format', (value) => /^\d{6}$/.test(value))
});

router.post('/', (req: Request, res: Response) => {
  uploadVideoFile(req, res, (err) => {
    if (err || !req.file) {
      res.statusMessage = 'Invalid video file';
      res.status(400).end();
      return;
    }

    const { path: filePath, originalname, filename } = req.file;
    const oldPath = filePath;
    const extension = originalname
      .split('.')
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join('.');
    const newPath = path.join(path.dirname(oldPath), `${filename}${extension ? '.' : ''}${extension}`);
    fs.rename(oldPath, newPath, () => {
      const bodyData: IDataUpload = req.body;
      uploadSchema
        .validate({
          ...bodyData,
          file: req.file
        })
        .then((values) => {
          const { title, startDateTime, location } = values;
          insertDataToDB({
            tableName: 'video',
            params: {
              title,
              startDateTime,
              location,
              filePath: newPath,
              originalFileName: originalname
            },
            callback: (error) => {
              if (error) {
                fs.unlink(newPath, () => {});
                res.statusMessage = error.message;
                res.status(400).end();
                return;
              }
              res.status(200).end();
            }
          });
        })
        .catch(({ errors }) => {
          console.log(errors);
          fs.unlink(newPath, () => {});
          res.statusMessage = errors.join('\n');
          res.status(400).end();
        });
    });
  });
});

export default router;
