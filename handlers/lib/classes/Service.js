const { addElement } = require('../../../generators/lib/AddElement');
const generators = require('../../../generators/');
const { addToObjectsSet, getType, parsed } = require('../Utils');
const lut = require('../../../lookup-tables/');

const handleService = (
  jsonLDGraph,
  mediaContractualObjects,
  classData,
  element,
  parentContractId,
  traversedIds
) => {
  if (parsed(mediaContractualObjects, element)) return;
  // generate a service object
  const serviceObj = generators.generateService(classData, element);
  traversedIds.ids.push(serviceObj.identifier);
  traversedIds.objects.push(serviceObj.identifier);
  // save the object
  addToObjectsSet(mediaContractualObjects, serviceObj.identifier, serviceObj);

  // update contract
  const referencedContract = mediaContractualObjects[parentContractId];
  addElement(
    { objects: 'array' },
    referencedContract,
    'objects',
    serviceObj.identifier
  );
};

module.exports = { handleService };
