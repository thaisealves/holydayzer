import express from "express";
import cors from "cors";

import holidays from "./holidays.js";
let text = "";
const server = express();
server.use(cors());

const today = new Date();

function isTodayHoliday() {
  for (let i = 0; i < holidays.length; i++) {
    if (Object.values(holidays[i]).includes(today.toLocaleDateString())) {
      text = `Sim, hoje é ${holidays[i].name}`;
    }
  }

  if (text.length === 0) {
    text = "Não, hoje não é feriado";
  }
  return text;
}

server.get("/holidays", (req, res) => res.send(holidays));

server.get("/is-today-holiday", (req, res) => res.send(isTodayHoliday()));

server.get("/holidays/:month", (req, res) => {
  const mon = req.params.month;
  const dateRegex = new RegExp(`^${mon}/[0-9]{1,2}/[0-9]{4}`);

  const monthHolidays = holidays.filter((holiday) =>
    dateRegex.test(holiday.date)
  );

  if (monthHolidays.length === 0){
    res.send("Esse mês não tem feriados!")
    return
  }

  res.send(monthHolidays);
});

server.listen(4000);
