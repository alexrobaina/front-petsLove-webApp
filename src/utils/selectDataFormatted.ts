export const selectDataFormatted = (data: any) => {
  const dataFormatted: any = [];

  data.forEach((element: any) => {
    dataFormatted.push({ label: element.email, value: element._id });
  });

  return dataFormatted;
};
