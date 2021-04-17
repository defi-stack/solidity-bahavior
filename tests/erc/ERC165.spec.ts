import { use, expect } from 'chai';
import { waffle } from 'hardhat';
import { keccak256 } from '@ethersproject/keccak256';

import ERC165StorageJSON from '../../_artifacts/contracts/erc/ERC165.sol/ERC165Storage.json';
import { ERC165Storage } from '../../_types';

use(waffle.solidity);

function interfaceId(str: string): string {
  const re = /^0x[a-z0-9]{8}/i
  return keccak256(Buffer.from(str)).match(re)?.[0] || '';
}

describe('ERC165Storage', () => {
  let contract: ERC165Storage;
  const [wallet] = waffle.provider.getWallets();

  before(async () => {
    contract = await waffle.deployContract(wallet, ERC165StorageJSON) as ERC165Storage;
  });

  it('ERC165 supportsInterface', async () => {
    expect(await contract.supportsInterface(interfaceId('supportsInterface(bytes4)'))).to.be.true;
  });

  it('ERC165Storage get', async () => {
    expect(await contract.supportsInterface(interfaceId('get()'))).to.be.true;
  });

  it('ERC165Storage set', async () => {
    expect(await contract.supportsInterface(interfaceId('set(uint32)'))).to.be.true;
  });
})
