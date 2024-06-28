require('dotenv').config();
const { createReadStream } = require('fs');
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;
const channelId = process.env.SLACK_CHANNEL;
const web = new WebClient(token);
var fs = require('fs');
var path = require('path');
var dirPath = path.resolve('report');
var filesList;
fs.readdir(dirPath, function (err, files) {
  filesList = files.filter(function (e) {
    console.log(files)
    return path.extname(e).toLowerCase() === '.png';
  });
  for (const list of filesList) {
    console.log(`${list}`);
    const uploadFileToSlack = async () => {
      await web.files.upload({
        filename: 'Failed Tests',
        file: createReadStream(`report/${list}`),
        channels: channelId,
      });
    };
    uploadFileToSlack();
  }
});