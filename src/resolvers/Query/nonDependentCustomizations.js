export default async function nonDependentCustomizations(
  _,
  args,
  context,
  info
) {
//   console.log("args", args);

  let nonDependentCustomizationsResponse =
    await context.queries.nonDependentCustomizations(args, context);
    // console.log("nonDependentCustomizationsResponse",nonDependentCustomizationsResponse);
    return nonDependentCustomizationsResponse;
}
