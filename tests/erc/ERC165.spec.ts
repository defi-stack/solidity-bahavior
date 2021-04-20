import { use, expect } from 'chai';
import { waffle } from 'hardhat';
import { keccak256 } from '@ethersproject/keccak256';
import { BigNumber } from '@ethersproject/bignumber';

import BasicERC165JSON from '../../_artifacts/contracts/erc/ERC165/BasicERC165.sol/BasicERC165.json';
import ERC165StorageJSON from '../../_artifacts/contracts/erc/ERC165/ERC165.sol/ERC165Storage.json';
import ERC165AdvanceStorageJSON from '../../_artifacts/contracts/erc/ERC165/AdvanceERC165.sol/ERC165AdvanceStorage.json';

import {
  ERC165Storage,
  BasicERC165,
  ERC165AdvanceStorage,
} from '../../_types';

use(waffle.solidity);

function interfaceId(str: string): string {
  const re = /^0x[a-z0-9]{8}/i;
  return keccak256(Buffer.from(str)).match(re)?.[0] || '';
}

// interface ID
const supportsInterfaceID = interfaceId('supportsInterface(bytes4)');
const getID = interfaceId('get()');
const setID = interfaceId('set(uint32)');
const IAdvanceStorageID = BigNumber.from(getID).xor(BigNumber.from(setID)).toHexString();

describe('BasicERC165', () => {
  let contract: BasicERC165;
  const [wallet] = waffle.provider.getWallets();

  it('supportsInterface', async () => {
    contract = await waffle.deployContract(wallet, BasicERC165JSON) as BasicERC165;
    expect(await contract.supportsInterface(supportsInterfaceID)).to.be.true;
  });
});

describe('ERC165Storage', () => {
  let contract: ERC165Storage;
  const [wallet] = waffle.provider.getWallets();

  before(async () => {
    contract = await waffle.deployContract(wallet, ERC165StorageJSON) as ERC165Storage;
  });

  it('supportsInterface', async () => {
    expect(await contract.supportsInterface(supportsInterfaceID)).to.be.true;
  });

  it('get', async () => {
    expect(await contract.supportsInterface(getID)).to.be.true;
  });

  it('set', async () => {
    expect(await contract.supportsInterface(setID)).to.be.true;
  });
})


describe('ERC165AdvanceStorage', () => {
  let contract: ERC165AdvanceStorage;
  const [wallet] = waffle.provider.getWallets();

  before(async () => {
    contract = await waffle.deployContract(wallet, ERC165AdvanceStorageJSON) as ERC165AdvanceStorage;
  });

  it('supportsInterface', async () => {
    expect(await contract.supportsInterface(supportsInterfaceID)).to.be.true;
  });

  it('type(IAdvanceStorage).interfaceId', async () => {
    expect(await contract.supportsInterface(IAdvanceStorageID)).to.be.true;
  });
})
