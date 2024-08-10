import { createRequire } from "module";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  console.log("CUstom plugin");
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    collections: {
      Customizations: {
        name: "Customizations",
      },
      CustomizationKeyValues: {
        name: "CustomizationKeyValues",
      },
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
    queries,
  });
}
