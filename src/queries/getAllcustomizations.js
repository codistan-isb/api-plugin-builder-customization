export default async function getAllcustomizations(context, args) {
  const { collections } = context;
  const { Customizations } = collections;

  let { itemPerPage, PageNumber } = args;
  let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
  PageNumber = PageNumber ? PageNumber : 1;
  let skipAmount = (PageNumber - 1) * itemsPerPage;
  // console.log("In query inner function", custId);
  const totalCountValue = await Customizations.countDocuments({});
  const data = await Customizations.find({})
  .skip(skipAmount)
  .limit(itemsPerPage)
  .toArray();

  return {
    totalCount: totalCountValue,
    data,
  };
}
