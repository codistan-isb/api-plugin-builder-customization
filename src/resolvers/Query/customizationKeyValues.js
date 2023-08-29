export default async function customizationKeyValues(_, args, context, info) {
  const { customizationKeyValueArray, selectedDependentCustomizationKeyValue } =
    args;
  //   console.log("IN main function ", custId);

  let customizationReports = await context.queries.customizationKeyValues(
    context,
    {
      customizationKeyValueArray,
      selectedDependentCustomizationKeyValue,
    }
  );

  console.log("before return");

  return customizationReports;
}
