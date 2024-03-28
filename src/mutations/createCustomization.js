import SimpleSchema from "simpl-schema";
import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function createCustomization(context, input) {
  // inputSchema.validate(input);

  const { appEvents, collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { Customizations, CustomizationKeyValues } = collections;
  const { customization, customizationKeyValue } = input;

  let arr = [];
  if (customizationKeyValue.length > 0) {
    for (let index = 0; index < customizationKeyValue?.length; index++) {
      let ckvId = Random.id();
      let element = customizationKeyValue[index];
      let data1 = {
        _id: ckvId,
        ...element,
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // console.log("in inner function ", customization, customizationKeyValue);

      let addedCustomizationKeyValues = await CustomizationKeyValues.insertOne(
        data1
      );

      console.log(
        "Added Customization key value is :- ",
        addedCustomizationKeyValues?.result?.ok
      );

      if (addedCustomizationKeyValues?.result?.ok) {
        arr.push(ckvId);

        console.log("arr in loop ", arr);
      }
    }
  }
  console.log("arr after loop ", arr);
  let data = {
    _id: Random.id(),
    productId: decodeProductOpaqueId(customization?.productId),
    ...customization,
    customizationKeyValueIds: arr,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  let addedCustomization = await Customizations.insertOne(data);
  // let data1 = {
  //   _id: ckvId,
  //   ...customizationKeyValue,
  //   updatedAt: new Date(),
  //   createdAt: new Date(),
  // };

  // console.log("in inner function ", customization, customizationKeyValue);

  // let addedCustomizationKeyValues = await CustomizationKeyValues.insertOne(
  //   data1
  // );

  // console.log(
  //   "Added Customization key value is :- ",
  //   addedCustomizationKeyValues
  // );

  // if (addedCustomizationKeyValues?.result?.ok) {
  //   let arr = [];
  //   arr.push(ckvId);

  //   let data = {
  //     _id: Random.id(),
  //     productId: decodeProductOpaqueId(customization?.productId),
  //     ...customization,
  //     customizationKeyValueIds: arr,
  //     updatedAt: new Date(),
  //     createdAt: new Date(),
  //   };

  //   let addedCustomization = await Customizations.insertOne(data);

  //   console.log("Added Customization is ", addedCustomization);
  // }

  return {
    check: true,
  };
}
