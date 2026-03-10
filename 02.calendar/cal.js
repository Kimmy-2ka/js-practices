#!/usr/bin/env node
import { DateTime } from "luxon";
import minimist from "minimist";

function printCal(year, month) {
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  printDays(year, month);
}

function printDays(year, month) {
  const firstDate = DateTime.local(year, month, 1);
  const lastDate = firstDate.endOf("month");

  const weekdayOffset = firstDate.weekday % 7;
  process.stdout.write("   ".repeat(weekdayOffset));

  for (let date = firstDate; date <= lastDate; date = date.plus({ days: 1 })) {
    process.stdout.write(String(date.day).padStart(2));
    const shouldLineBreak = date.weekday === 6 || date.day === lastDate.day;
    process.stdout.write(shouldLineBreak ? "\n" : " ");
  }
}

const argv = minimist(process.argv.slice(2));
const now = DateTime.now();
const year = argv.y ?? now.year;
const month = argv.m ?? now.month;

printCal(year, month);
