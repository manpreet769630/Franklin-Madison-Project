require('dotenv').config();
const fs = require("fs");
let data = JSON.parse(fs.readFileSync("report.json", "utf8"));
let slackTarget = data.reports[0].targets.find(
  (target) => target.name === "slack"
);
slackTarget.inputs.url = process.env.SLACK_WEBHOOK;
slackTarget.extensions[0].inputs.users[0].name = process.env.SLACK_USER;
slackTarget.extensions[0].inputs.users[0].slack_uid = process.env.SLACK_UID;
fs.writeFileSync("report.json", JSON.stringify(data));