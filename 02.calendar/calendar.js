#!/usr/bin/env node
import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = DateTime.now();

const month = argv.m ?? now.month;
const year = argv.y ?? now.year;

function printCal(year, month) {
  console.log(`      ${month}月 ${year}\n日 月 火 水 木 金 土`);

  buildDays(year, month);
}

function buildDays(year, month) {
  const firstDate = DateTime.local(year, month, 1);
  const lastDate = firstDate.endOf("month");

  const blank = firstDate.weekday % 7;
  process.stdout.write("   ".repeat(blank));

  for (let date = firstDate; date <= lastDate; date = date.plus({ days: 1 })) {
    const day = date.toFormat("d").padStart(2);
    process.stdout.write(day);
    if (date.weekday === 6) process.stdout.write("\n");
    else process.stdout.write(" ");
  }
}

printCal(year, month);
