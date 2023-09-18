function UseCalcAlcoholStats() {
  const calcLastWeek = (alcoholData) => {
    const startDay = new Date(Date.now() - 7);
    const filterAlcoholData = Object.entries(alcoholData).filter(
      ([date]) => new Date(date) >= startDay,
    );
    console.log(filterAlcoholData);
  };
  return {
    calcLastWeek,
  };
}

export default UseCalcAlcoholStats;
