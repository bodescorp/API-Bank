import { HttpException, HttpStatus } from '@nestjs/common';

export const fileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.NOT_ACCEPTABLE,
      ),
      false,
    );
  }
  callback(null, true);
};
