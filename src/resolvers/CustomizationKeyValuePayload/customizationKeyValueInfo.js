import { decodeProductOpaqueId } from "../../xforms/id.js";

export default async function customizationKeyValueInfo(
  parent,
  args,
  context,
  info
) {
  // console.log("parent", parent);
  // console.log("args", args);
  let { customizationKeyValueIds } = parent;
  let { collections } = context;
  let { CustomizationKeyValues } = collections;
  // console.log("customizationKeyValueIds", customizationKeyValueIds);
  let customizationKeyValueInfo = await CustomizationKeyValues.find({
    _id: { $in: customizationKeyValueIds },
  }).toArray();
  // console.log("customizationKeyValueInfo", customizationKeyValueInfo);
  return customizationKeyValueInfo;
}
