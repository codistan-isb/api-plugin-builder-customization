export default async function updateCustomization(_, { input }, context) {
  console.log("inside updateCustomization")
  const {
    //   shopId,
    //   serviceProductId,
    updateCustomization,
    updateCustomizationKeyValue,
  } = input;

  console.log("In started quote shown user");
  const updatedCustomization = await context.mutations.updateCustomization(
    context,
    {
      //   shopId,
      //   serviceProductId,
      updateCustomization,
      updateCustomizationKeyValue,
    }
  );

  console.log("update Customization ", updatedCustomization);
  console.log("check plugin added");

  return updatedCustomization;
}
