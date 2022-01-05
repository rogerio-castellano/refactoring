import { expect } from '@jest/globals';
import { statement, htmlStatement } from './statement';

const fs = require('fs');

let plays = JSON.parse(fs.readFileSync('plays.json'));
let invoices = JSON.parse(fs.readFileSync('invoices.json'));

console.log(htmlStatement(invoices, plays));

  describe("Print bill tests", () =>
  {
    test("Plain text", () => {
      let statementRows = statement(invoices, plays).split('\n');
      expect(statementRows[1]).toMatch(/Hamlet:.*\$650\.00.*\(55 seats\)/);
      expect(statementRows[2]).toMatch(/As You Like It:.*\$580\.00.*\(35 seats\)/);
      expect(statementRows[3]).toMatch(/Othello:.*\$500\.00.*\(40 seats\)/);
      expect(statementRows[4]).toMatch("$1,730.00");
      expect(statementRows[5]).toMatch("47 credits");
    });

    test("HTML", () => {
      let statement = htmlStatement(invoices, plays);
      expect(statement).toMatch(/<tr>.*Hamlet.*55.*\$650\.00.*(?!<tr>)<\/tr>/);
      expect(statement).toMatch(/<tr>.*As You Like It.*35.*\$580\.00.*(?!<tr>)<\/tr>/);
      expect(statement).toMatch(/<tr>.*Othello.*40.*\$500\.00.*(?!<tr>)<\/tr>/);
      expect(statement).toMatch(/Amount.*\$1,730\.00/);
      expect(statement).toMatch(/47.*credits/);
    });
  });

