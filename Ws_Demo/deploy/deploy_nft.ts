import { ethers } from 'hardhat';

async function deploy_nft() {
  const Nft = await ethers.getContractFactory('WsNft');
  const nft = await Nft.deploy();
  await nft.waitForDeployment();
  console.log(`${nft.target}`);
}
async function get_nft() {
  const Nft = await ethers.getContractAt(
    'WsNft',
    '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'
  );
  const [owner] = await ethers.getSigners();
  console.log(`${await Nft.balanceOf(owner)}`);
  console.log(`${await Nft.ownerOf(0)}`);
  //   await Nft.connect(owner).mint(owner);
  console.log(`${await Nft.balanceOf(owner)}`);
  console.log(`${await Nft.ownerOf(1)}`);
}
async function main() {
  //   await deploy_nft();
  await get_nft();
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
