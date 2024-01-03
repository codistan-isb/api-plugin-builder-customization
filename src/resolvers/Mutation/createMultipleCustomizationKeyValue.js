export default async function createMultipleCustomizationKeyValue(
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
  
    // console.log("In started quote shown user",customizationKeyValue);
    // console.log("In started quote shown user customizationId",customizationId);
    const createdMultipleCustomization =
      await context.mutations.createMultipleCustomizationKeyValue(context, {
        //   shopId,
        //   serviceProductId,
        customizationId,
        customizationKeyValue,
      });
  
    console.log("created createdMultipleCustomization ", createdMultipleCustomization);
    // console.log("check plugin added");
  
    return {
      check:createdMultipleCustomization
    };
  }
  