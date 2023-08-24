import customizationInfo from "../utils/customizationInfo.js";

export default {
  //   _id: (node) => encodeProductOpaqueId(node._id),
  customizationKeyValueInfo: (node, args, context, info) => {
    console.log("args are ", args);
    console.log("node arer ", node);
    return customizationInfo(
      context,
      node.customizationKeyValueIds,
      true,
      args
    );
  },
};
