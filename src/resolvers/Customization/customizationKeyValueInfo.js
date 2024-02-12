import customizationInfo from "../../utils/customizationInfo.js";

export default  async function customizationKeyValueInfo  (node, args, context, info)  {
  console.log("args are ", args);
  console.log("node arer ", node);
  return customizationInfo(context, node.customizationKeyValueIds, true, args);
};
