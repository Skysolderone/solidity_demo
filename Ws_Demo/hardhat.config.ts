import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    net: {
      url: 'http://127.0.0.1:8545',
      accounts: [
        '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e',
      ],
    },
  },
};

export default config;
