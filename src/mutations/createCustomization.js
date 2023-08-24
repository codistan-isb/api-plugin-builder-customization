import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
// import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";
// import { encodeProductOpaqueId } from "../xforms/id.js";

export default async function createCustomization(context, input) {
  // inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations, CustomizationKeyValues } = collections;
  //const { product: productInput, shopId, shouldCreateFirstVariant = true } = input;
  const {
    shopId,
    serviceProductId,
    variant,
    customization,
    customizationKeyValue,
  } = input;

  let ckvId = Random.id();

  let data1 = {
    _id: ckvId,
    ...customizationKeyValue,
  };

  console.log("in inner function ", customization, customizationKeyValue);

  let addedCustomizationKeyValues = await CustomizationKeyValues.insertOne(
    data1
  );

  console.log("Added Customization key value is ", addedCustomizationKeyValues);

  if (addedCustomizationKeyValues?.result?.ok) {
    let arr = [];
    arr.push(ckvId);

    let data = {
      _id: Random.id(),
      ...customization,
      customizationKeyValueIds: arr,
    };

    let addedCustomization = await Customizations.insertOne(data);

    console.log("Added Customization is ", addedCustomization);
  }

  return {
    check: true,
  };
}
