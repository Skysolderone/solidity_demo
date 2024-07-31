import { ethers } from 'hardhat';
import { expect } from 'chai';
async function deploy_Ws() {
  const WS = await ethers.getContractFactory('WsToken');
  const ws = await WS.deploy('WS', 'WS', 1000000, 6);
  await ws.waitForDeployment();
  console.log(`${ws.target}`);
  const PrizePool = await ethers.getContractFactory('PrizePool');
  const prizepool = await PrizePool.deploy(
    '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'
  );
  await prizepool.waitForDeployment();
  console.log(`${prizepool.target}`);
}
async function getContract() {
  const [owner] = await ethers.getSigners();
  const ws = await ethers.getContractAt(
    'WsToken',
    '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'
  );
  const prizepool = await ethers.getContractAt(
    'PrizePool',
    '0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D'
  );
  //   console.log(`${owner.address}`);
  const a = await ethers.getSigner(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  );
  const b = await ethers.getSigner(
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
  );
  const c = await ethers.getSigner(
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
  );
  const d = await ethers.getSigner(
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906'
  );
  await prizepool.AddList(a);
  await prizepool.AddList(b);
  await prizepool.AddList(c);
  await prizepool.AddList(d);
  const tx = await ws.transfer(prizepool.target, 999);
  tx.wait();
  console.log(`${await ws.balanceOf(prizepool.target)}`);
  await prizepool.connect(owner).sendShareList();
  console.log(`${await ws.balanceOf(a)}`);
  console.log(`${await ws.balanceOf(b)}`);
  console.log(`${await ws.balanceOf(c)}`);
  console.log(`${await ws.balanceOf(d)}`);
  //   const tx = await ws.connect(owner).transfer(a.address, 123123);
  //   tx.wait();

  //   console.log(`${await ws.balanceOf(a.address)}`);
  //   console.log(`${await ws.balanceOf(owner.address)}`);
  //   await ws.connect(owner).mint(owner.address, 1000000);
  //   console.log(`${await ws.balanceOf(owner.address)}`);
}

async function main() {
  //   deploy_Ws();
  await getContract();
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
