export default async function sortedCustomizations(context, { prodId } = {}) {
  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations: modelCustomizations } = collections;

  console.log("In query inner function ", prodId);

  const data = await modelCustomizations
    .find({ productId: prodId })
    .sort({ orderCustomization: 1 })
    .project({ _id: 1 }) // Use 1 for ascending order, -1 for descending
    .toArray();
  console.log("Customizations are ", data);

  const arr = data.map((obj) => {
    return obj._id;
  });

  return arr;
}
