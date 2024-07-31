import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import hre, { ethers } from 'hardhat';

describe('WsToken', function () {
  async function deployWsToken() {
    // Contracts are deployed using the first signer/account by default
    const [a, b] = await hre.ethers.getSigners();
    const deciamal = 10 * 18;
    const total = deciamal * 10000;
    const Ws = await hre.ethers.getContractFactory('WsToken');
    const ws = await Ws.deploy('ws', 'WST', total, deciamal);
    const usdt = await Ws.deploy('usdt', 'USDT', 100000, 6);

    return { ws, usdt, a, b };
  }

  describe('Deployment', function () {
    it('test token', async function () {
      const { ws, usdt, a, b } = await loadFixture(deployWsToken);
      console.log(`${ws.target}`);
      console.log(`${usdt.target}`);
      console.log(`${a.address}`);
      console.log(`${b.address}`);

      const tx = await usdt.transfer(ws.target, 10000);
      tx.wait();

      const balance = await ws.balanceOf(
        '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
      );
      console.log(`${balance}`);
      const mmintx = await usdt.mint(b.address, 10000);
      mmintx.wait();
      const balance2 = await usdt.balanceOf(b.address);
      console.log(`${balance2}`);
    });
  });
});
