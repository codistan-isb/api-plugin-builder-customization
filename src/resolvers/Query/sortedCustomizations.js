export default async function sortedCustomizations(_, args, context, info) {
  const { prodId } = args;
  console.log("IN main function ", prodId);

  let customizationReports = await context.queries.sortedCustomizations(
    context,
    {
      prodId,
    }
  );

  //console.log("return getQuotes are ", getQuotesReport);
  console.log("before return");

  return customizationReports;
  //   return getPaginatedResponse(getQuotesReport, connectionArgs, {
  //     includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
  //     includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
  //     includeTotalCount: wasFieldRequested("totalCount", info),
  //   });
}
