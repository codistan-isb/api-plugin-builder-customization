export default async function getAllcustomizations(_, args, context, info) {
    // const { custId, selectedDependentCustomizationKeyValue } = args;
    // console.log("IN main function ", custId);
  
    let getAllcustomizationsReports = await context.queries.getAllcustomizations(context,args);
  
    console.log("return getAllcustomizationsReports are ", getAllcustomizationsReports);
    // console.log("before return");
  
    return getAllcustomizationsReports;
  }
  