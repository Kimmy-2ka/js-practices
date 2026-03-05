#!/usr/bin/env node
import { DateTime } from "luxon";

const today = DateTime.now();

const monthYear = `      ${today.month}月 ${today.year}`;
const weekdays = "日 月 火 水 木 金 土";

console.log(`${monthYear}\n${weekdays}`);

function printDays(end) {
  for (let d = today.startOf("month"); d <= end; d = d.plus({ days: 1 })) {
    const day = d.toFormat("d").padStart(2);
    process.stdout.write(day);
    if (d.weekday == 6) process.stdout.write("\n");
    else process.stdout.write(" ");
  }
}

printDays(today.endOf("month"));
