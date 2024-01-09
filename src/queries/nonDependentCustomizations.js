import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function nonDependentCustomizations(args, context) {
  let { collections } = context;
  const { Customizations, CustomizationKeyValues } = collections;
  let { variantId } = args;
  console.log("variantId", variantId);
  console.log(
    " encodeProductOpaqueId(variantId)",
    decodeProductOpaqueId(variantId)
  );
  let nonDependentCustomizations = await Customizations.find({
    productId: decodeProductOpaqueId(variantId),
  }).toArray();
  console.log("nonDependentCustomizations", nonDependentCustomizations);
  return nonDependentCustomizations;
}
