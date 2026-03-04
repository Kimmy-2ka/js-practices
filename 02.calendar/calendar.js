#!/usr/bin/env node
import { DateTime } from "luxon";

const today = DateTime.now();

const monthYear = `      ${today.month}月 ${today.year}`;
const weekdays = "日 月 火 水 木 金 土";
const days = "日付を入れる";

console.log(`${monthYear}\n${weekdays}\n${days}`);
