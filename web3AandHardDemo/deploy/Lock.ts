import { ethers } from 'hardhat';
async function main() {
  //   const web3 = new Web3('http://127.0.0.1:8545/');
  //   const chainid = await web3.eth.getChainId();
  //   console.log(`${chainid}`);
  //   const privatekey =
  //     '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
  //   const sender = web3.eth.accounts.wallet.add(privatekey)[0];
  //   const receiver = web3.eth.accounts.create();
  //   console.log(
  //     `sender balance  :` + (await web3.eth.getBalance(sender.address))
  //   );
  //   console.log(
  //     `reciver balance :` + (await web3.eth.getBalance(receiver.address))
  //   );
  //   //transfer
  //   const receipt = await web3.eth.sendTransaction({
  //     from: sender.address,
  //     to: receiver.address,
  //     value: 100,
  //   });
  //   console.log(receipt);
  //   console.log(
  //     'Final sender balance:',
  //     await web3.eth.getBalance(sender.address)
  //   );
  //   console.log(
  //     'Final receiver balance:',
  //     await web3.eth.getBalance(receiver.address)
  //   );
  //0x5FbDB2315678afecb367f032d93F642f64180aa3
  //   const contract = await ethers.deployContract('Lock');
  //   const result = await contract.waitForDeployment();
  //   console.log(`${result.target}`);
  const singer = await ethers.getSigners();
//   console.log(singer[0].address);
  const tx = await singer[0].sendTransaction({
    to: singer[1].address,
    value: ethers.parseEther('50'),
  });
  const result = await tx.wait();

  console.log(result);
  console.log(await ethers.provider.getBalance(singer[0].address));
  console.log(await ethers.provider.getBalance(singer[1].address));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
