#!/usr/bin/env node
import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = DateTime.now();

const month = argv.m ?? now.month;
const year = argv.y ?? now.year;

const firstDate = DateTime.local(year, month, 1);
const endDate = firstDate.endOf("month");

const monthYear = `      ${month}月 ${year}`;
const weekdays = "日 月 火 水 木 金 土";

console.log(`${monthYear}\n${weekdays}`);

function printDays(start, end) {
  for (let d = start; d <= end; d = d.plus({ days: 1 })) {
    const day = d.toFormat("d").padStart(2);
    process.stdout.write(day);
    if (d.weekday === 6) process.stdout.write("\n");
    else process.stdout.write(" ");
  }
}

printDays(firstDate, endDate);
