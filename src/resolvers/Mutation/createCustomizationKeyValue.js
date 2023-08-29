export default async function createCustomizationKeyValue(
  _,
  { input },
  context
) {
  const {
    //   shopId,
    //   serviceProductId,
    customizationId,
    customizationKeyValue,
  } = input;

  console.log("In started quote shown user");
  const createdCustomization =
    await context.mutations.createCustomizationKeyValue(context, {
      //   shopId,
      //   serviceProductId,
      customizationId,
      customizationKeyValue,
    });

  console.log("created Customization ", createdCustomization);
  console.log("check plugin added");

  return createdCustomization;
}
