import { ethers } from 'hardhat';
import { MyContract } from '../typechain-types/contracts/NewUpgrade.sol/MyContract';

async function deploy() {
  const [a, b, c] = await ethers.getSigners();
  const V1 = await ethers.getContractFactory('MyContract', a);
  const v1a = await V1.deploy();
  console.log(`${v1a.target}`);
  const proxy = await ethers.getContractFactory('MyContractProxy', b);
  const proxya = await proxy.deploy(v1a.target);
  console.log(`${proxya.target}`);
}
async function main() {
  //   await deploy();
  //test
  //获取代理合约
  const proxy = await ethers.getContractAt(
    'MyContractProxy',
    '0xC469e7aE4aD962c30c7111dc580B4adbc7E914DD'
  );
  const MyContract1 = await ethers.getContractAt(
    'MyContract',
    '0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D'
  );
  const v1 = await MyContract1.getData();
  console.log(`${v1}`);
  await MyContract1.setData(30);
  const v2 = await MyContract1.getData();
  console.log(`${v2}`);

  //部署升级后合约
  const V2 = await ethers.getContractFactory('MyContract');
  const v2a = await V2.deploy();
  console.log(`${v2a.target}`);
  await proxy.upgrade(v2a.target);
  await MyContract1.setData(5);
  //   const [a, b, c] = await ethers.getSigners();
  const a = await ethers.getSigner(
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
  );
  const v3 = await MyContract1.connect(a).getData();
  console.log(`${v3}`);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
