import Random from "@reactioncommerce/random";
import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function updateCustomization(context, input) {
  try{
    console.log("inside updateCustomization")
    const { collections } = context;
    const { Customizations, CustomizationKeyValues } = collections;
    const { updateCustomization, updateCustomizationKeyValue } = input;
  
    console.log("updateCustomization", updateCustomization, "updateCustomizationKeyValue", updateCustomizationKeyValue)
    const existingValues = await Customizations.findOne({
      _id: updateCustomization._id
    })
    
    console.log("existingValues", existingValues);

    
    // filter updated & newly created & deleted customization key vlaues
   
    await Promise.all(await updateCustomizationKeyValue?.filter?.(value => value?._id)?.map(async(cutomizationValue) => {
      return await CustomizationKeyValues.updateOne({  _id: cutomizationValue._id }, { $set:  cutomizationValue })
    }))

    const createdValuesIds = await Promise.all(await updateCustomizationKeyValue?.filter?.(value => !value?._id)?.map(async(cutomizationValue) => {
      let ckvId = Random.id();
    
      let data1 = {
        _id: ckvId,
        ...cutomizationValue,
        isVisible:true,
        isDeleted:false,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const record = await CustomizationKeyValues.insertOne(data1)
      // return { ckvId, record: await CustomizationKeyValues.insertOne({ data1 })}
      if(record?.result?.ok) {
        return ckvId
      }
    }))
   

    console.log("createdValues", createdValuesIds)

    const toBeDeleteIds = existingValues?.customizationKeyValueIds?.filter?.((id) => !updateCustomizationKeyValue?.some?.(value => value._id === id))

    console.log("toBeDeleteIds", toBeDeleteIds)

    await CustomizationKeyValues.deleteMany({ _id: { $in: toBeDeleteIds}})

    let updatedValuesIds = existingValues?.customizationKeyValueIds?.filter?.((id) => updateCustomizationKeyValue?.some?.(value => value._id === id))

    console.log("updatedValuesIds", updatedValuesIds)

    updatedValuesIds = [...updatedValuesIds, ...createdValuesIds]

    console.log("updatedValuesIds", updatedValuesIds)
    


    let data = {
      ...updateCustomization,
      customizationKeyValueIds: updatedValuesIds
    };
  
    await Customizations.updateOne({_id: updateCustomization?._id}, {$set: data});
  
    return true

  } catch(err){
    console.log("error inside update customization")
    return err
  }
}
