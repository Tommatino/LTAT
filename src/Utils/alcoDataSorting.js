const alcoDataSorting = (data) => {
  return Object.entries(data).sort(
    (alcoDayFirst, alcoDaySecond) =>
      new Date(alcoDayFirst[0]) - new Date(alcoDaySecond[0]),
  );
};

export default alcoDataSorting;
