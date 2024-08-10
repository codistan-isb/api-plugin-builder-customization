export default async function createCustomization(_, { input }, context) {
  const {
    //   shopId,
    //   serviceProductId,
    customization,
    customizationKeyValue,
  } = input;

  console.log("In started quote shown user");
  const createdCustomization = await context.mutations.createCustomization(
    context,
    {
      //   shopId,
      //   serviceProductId,
      customization,
      customizationKeyValue,
    }
  );

  console.log("created Customization ", createdCustomization);
  console.log("check plugin added");

  return createdCustomization;
}
