import path from 'path';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import "hardhat-typechain";

const DEFAULT_BLOCK_GAS_LIMIT = 12450000;
const HARD_FORK = 'istanbul';

const config: HardhatUserConfig = {
  // default network
  defaultNetwork: 'hardhat',

  // network config
  networks: {
    hardhat: {
      hardfork: HARD_FORK,
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gas: DEFAULT_BLOCK_GAS_LIMIT,
      gasPrice: 8000000000,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true
    }
  },

  // solidity config
  solidity: {
    compilers: [
      {
        version: '0.7.5',
        settings: {
          optimizer: { enabled: true, runs: 200 },
          evmVersion: 'istanbul'
        }
      },
      {
        version: '0.6.5',
        settings: {
          optimizer: { enabled: true, runs: 200 },
          evmVersion: 'istanbul'
        }
      },
      {
        version: '0.5.5',
        settings: {
          optimizer: { enabled: true, runs: 200 },
          evmVersion: 'istanbul'
        }
      }
    ]
  },

  // repository config
  paths: {
    sources: path.resolve(__dirname, 'contracts'),
    tests: path.resolve(__dirname, 'tests'),
    cache: path.resolve(__dirname, '_caches'),
    artifacts: path.resolve(__dirname, '_artifacts')
  },

  // mocha
  mocha: {},

  // type chain
  typechain: {
    outDir: '_types',
    target: 'ethers-v5'
  },
};

export default config;
