import SftpUpload from 'sftp-upload';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

console.log('Start Deploy');

const options = {
  host: process.env.SSH_HOST,
  username: process.env.SSH_USERNAME,
  password: process.env.SSH_PASSPHRASE,
  path: './public',
  remoteDir: '/new',
  dryRun: false,
};

const sftp = new SftpUpload(options);

sftp
  .on('error', function (err) {
    throw err;
  })
  .on('uploading', function (progress) {
    console.log('Deploying', progress.file);
    console.log(progress.percent + '% completed');
  })
  .on('completed', function () {
    console.log('Deploy Completed');
  })
  .upload();
