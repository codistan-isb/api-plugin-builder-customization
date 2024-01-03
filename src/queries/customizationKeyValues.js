

export default async function customizationKeyValues(
  context,
  { customizationKeyValueArray, selectedDependentCustomizationKeyValue } = {}
) {
  const { collections, simpleSchemas } = context;
  const { Product } = simpleSchemas;
  const { CustomizationKeyValues } = collections;

  console.log(
    "selected Dependent Customization Key Value ",
    selectedDependentCustomizationKeyValue
  );

  console.log("Array is ", customizationKeyValueArray);
  let keyValues = [];
  if (selectedDependentCustomizationKeyValue) {
    keyValues = await CustomizationKeyValues.find({
      _id: { $in: customizationKeyValueArray },
    }).toArray();

    const filteredData = keyValues.filter((item) =>
      item.dependentCustomizationKeyValueIds.includes(
        selectedDependentCustomizationKeyValue
      )
    );

    console.log("Found custom ids are ", filteredData);
    keyValues = filteredData;
  } else {
    keyValues = await CustomizationKeyValues.find({
      _id: { $in: customizationKeyValueArray },
    }).toArray();
  }

  console.log("Key values are ", keyValues);

  return keyValues;
}
