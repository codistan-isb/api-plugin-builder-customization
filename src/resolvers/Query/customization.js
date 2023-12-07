export default async function customization(_, args, context, info) {
  const { custId, selectedDependentCustomizationKeyValue } = args;
  console.log("IN main function ", custId);

  let customizationReports = await context.queries.customization(context, {
    custId,
  });

  //console.log("return getQuotes are ", getQuotesReport);
  console.log("before return");

  return customizationReports;
}
