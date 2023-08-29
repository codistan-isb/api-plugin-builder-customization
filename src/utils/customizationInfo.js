export default async function customizationInfo(
  context,
  cdvIds,
  topOnly,
  args
) {
  const { Customizations, CustomizationKeyValues } = context.collections;

  console.log("ids is ", cdvIds);

  //   console.log("in vehicle reslover function");

  //   console.log("arguments are ", args);

  const customData = await CustomizationKeyValues.find({
    _id: { $in: cdvIds },
  }).toArray();

  console.log("custom Data is ", customData);
  //   vehiclesData._id = encodeProductOpaqueId(vehiclesData._id);
  // console.log("Vehicles data is ", vehiclesData);
  return customData;
}
