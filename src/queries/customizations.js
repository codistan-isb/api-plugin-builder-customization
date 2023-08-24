export default async function customizations(context, { prodId } = {}) {
  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations: modelCustomizations } = collections;

  console.log("In query inner function ", prodId);

  const data = await modelCustomizations.find({ productId: prodId }).toArray();
  console.log("Customizations are ", data);

  return data;
}
