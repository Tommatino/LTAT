import { useState } from "react";

function UseCalcAlcoholStats() {
  const filterDays = (alcoholData, pastDaysSpan) => {
    const today = new Date();
    const startDay = new Date(today.setDate(today.getDate() - pastDaysSpan));
    console.log(today.setDate(today.getDate() - pastDaysSpan));

    console.log("Start day", startDay);
    //https://www.shecodes.io/athena/42795-how-to-get-the-date-3-days-after-today-in-javascript
    const filterAlcoholData = Object.entries(alcoholData).filter(
      ([date]) => new Date(date).getTime() > startDay.getTime(),
    );
    return filterAlcoholData.reduce((accumulator, [date, grams]) => {
      return { ...accumulator, [date]: grams };
    }, {});
  };

  const sumAlcoDays = (alcoDays) => {
    return Object.entries(alcoDays).reduce((alcoholGramsSum, [, alcoGrams]) => {
      return alcoholGramsSum + alcoGrams;
    }, 0);
  };

  const calcLastWeek = (alcoholData) => {
    const alcoDays = filterDays(alcoholData, 7);
    return sumAlcoDays(alcoDays);
  };

  const calcLastFourWeeks = (alcoholData) => {
    const alcoDays = filterDays(alcoholData, 28);
    console.log("Alco days 4 weeks", alcoDays);
    return sumAlcoDays(alcoDays);
  };

  const calcLastAllDays = (alcoholData) => {
    return sumAlcoDays(alcoholData);
  };

  return {
    calcLastWeek,
    calcLastFourWeeks,
    calcLastAllDays,
  };
}

export default UseCalcAlcoholStats;
