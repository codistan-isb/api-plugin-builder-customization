import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
// import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";
// import { encodeProductOpaqueId } from "../xforms/id.js";

export default async function createMultipleCustomizationKeyValue(
  context,
  input
) {
  // inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations, CustomizationKeyValues } = collections;
  const { customizationId, customizationKeyValue } = input;

  //   console.log("key value ", customizationId, customizationKeyValue);

  let findCustomization = await Customizations.findOne({
    _id: customizationId,
  });
  let arr = findCustomization?.customizationKeyValueIds;

  //   console.log("Found customizatio is ", findCustomization);
  let updatedCustomization;
  if (findCustomization) {
    for (let index = 0; index < customizationKeyValue?.length; index++) {
      let ckvId = Random.id();
      const element = customizationKeyValue[index];
      let data = {
        _id: ckvId,
        ...element,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      console.log("data1 ", data);
      let addedCustomizationKeyValues = await CustomizationKeyValues.insertOne(
        data
      );
      console.log("addedCustomizationKeyValues", addedCustomizationKeyValues);
      if (arr) {
        arr.push(ckvId);
      } else {
        arr = [];
        arr.push(ckvId);
      }
    } 
  }
  console.log("arr", arr);
    updatedCustomization = await Customizations.findOneAndUpdate(
      {
        _id: customizationId,
      },
      {
        $set: { customizationKeyValueIds: arr, updatedAt: new Date() },
      },
      { new: true }
    );
    console.log("updatedCustomization", updatedCustomization.ok);
  if (updatedCustomization) {
    return true;
  } else {
    return false;
  }
}
