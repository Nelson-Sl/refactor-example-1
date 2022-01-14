import statement from './statement.js';
import fs from "fs";
const invoices = JSON.parse(fs.readFileSync('./invoices.json').toString());
const plays = JSON.parse(fs.readFileSync('./plays.json').toString());

console.log(statement(invoices, plays));
