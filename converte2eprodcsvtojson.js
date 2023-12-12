/*
1. Idea behind from <<https://stackoverflow.com/questions/61934443/read-excel-files-in-cypress>>
2. Challenge in approach#1 in the above thread with cy.task():
   As per cypress, implementing cy.task() on/outside of 'it'(test) block is not possible(Refer: https://github.com/cypress-io/cypress/issues/9111)
   For current implementation, we would suppose to use csv/xls data to get "title" value on/outside of 'it'(test) block.
   so went for approach#2 <<https://medium.com/@you54f/dynamically-generate-data-in-cypress-from-csv-xlsx-7805961eff55>>
   As a part of this approach #2, Added a csvToJson script and which will be executed before execution through prehook(https://www.marcusoft.net/2015/08/pre-and-post-hooks-for-npm-scripting.html#pre-and-post-hooks-for-custom-script).
*/
/*eslint no-undef: "error"*/
/*eslint-env node*/
const { readFileSync, writeFileSync } = require('fs');
const a = require('papaparse');
const parse = a.parse;

try {
  const csvFile = readFileSync(
    './cypress/fixtures/e2e_prod_source.csv',
    'utf8',
  );
  const csvResults = parse(csvFile, {
    header: true,
    complete: (csvData) => csvData.data,
  }).data;
  writeFileSync(
    './cypress/fixtures/e2e_source.json',
    JSON.stringify(csvResults, null, 4),
    'utf-8',
  );
  console.log('e2e_prod_source.csv file is converted successfully!');
} catch (e) {
  throw Error(`Error while conversion: ${e}`);
}
