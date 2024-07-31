import { ethers, upgrades } from 'hardhat';

async function deploy_first() {
  const UP = await ethers.getContractFactory('MyToken');

  const up = await upgrades.deployProxy(UP);
  await up.waitForDeployment();
  console.log(`${up.target}`);
}
async function getfirt() {
  const up = await ethers.getContractAt(
    'MyToken',
    '0xAbB12158488d9C9Bd52C14B9AE4C835eCE4A6e13'
  );
  const [owner] = await ethers.getSigners();
  console.log(`${owner.address}`);
  await up.mint(owner, 10000);
  console.log(`${await up.balanceOf(owner)}`);
}
async function deploy_two() {
  const two = await ethers.getContractFactory('MyToken2');
  const t = await upgrades.upgradeProxy(
    '0xAbB12158488d9C9Bd52C14B9AE4C835eCE4A6e13',
    two
  );
  console.log(`${t.target}`);
}
async function gettwo() {
  const up = await ethers.getContractAt(
    'MyToken2',
    '0xAbB12158488d9C9Bd52C14B9AE4C835eCE4A6e13'
  );
  const [owner] = await ethers.getSigners();
  console.log(`${owner.address}`);
  await up.burn(owner, 10000);
  console.log(`${await up.balanceOf(owner)}`);
}
async function main() {
  //   await deploy_first();
  //   await getfirt();
  //   await deploy_two();
  await gettwo();
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
