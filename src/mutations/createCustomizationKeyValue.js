import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
// import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";
// import { encodeProductOpaqueId } from "../xforms/id.js";

export default async function createCustomizationKeyValue(context, input) {
  // inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations, CustomizationKeyValues } = collections;
  //const { product: productInput, shopId, shouldCreateFirstVariant = true } = input;
  const {
    // shopId,
    // serviceProductId,
    // variant,
    customizationId,
    customizationKeyValue,
  } = input;

  console.log("key value ", customizationId, customizationKeyValue);

  let findCustomization = await Customizations.findOne({
    _id: customizationId,
  });

  console.log("Found customizatio is ", findCustomization);
  let ckvId = Random.id();

  if (findCustomization) {
    let data1 = {
      _id: ckvId,
      ...customizationKeyValue,
    };

    let addedCustomizationKeyValues = await CustomizationKeyValues.insertOne(
      data1
    );

    console.log(
      "Added Customization key value is ",
      addedCustomizationKeyValues
    );

    let arr = findCustomization.customizationKeyValueIds;
    arr.push(ckvId);

    let updatedCustomization = await Customizations.findOneAndUpdate(
      {
        _id: customizationId,
      },
      {
        $set: { customizationKeyValueIds: arr },
      },
      { new: true }
    );

    console.log("Updated Customization is ", updatedCustomization);
  }

  return {
    check: true,
  };
}
