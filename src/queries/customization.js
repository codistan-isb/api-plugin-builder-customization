export default async function customization(context, { custId } = {}) {
  const { collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations: modelCustomizations } = collections;

  console.log("In query inner function", custId);

  const data = await modelCustomizations.findOne({ _id: custId });

  return data;
}
