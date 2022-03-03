/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond () {
 
    // Get the NewFactory and deploy to generate address
  const NewFacet = await ethers.getContractFactory('NewCheck');
  const newFacet = await NewFacet.deploy();
  await newFacet.deployed();

//   Diamond Address 
const diamondAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

let cut = []

cut.push({
  facetAddress: newFacet.address,
  action: FacetCutAction.Add,
  functionSelectors: getSelectors(newFacet)
})


  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddr)
  let tx
  let receipt


//   call the addValue function from NewFacet Contract
  let payload = newFacet.interface.encodeFunctionData("helloWorld");
  tx = await diamondCut.diamondCut(cut, diamondAddr, payload);

//   Console log the tx hash.
  console.log('Diamond cut tx: ', tx.hash)
  
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  return diamondAddr;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond
