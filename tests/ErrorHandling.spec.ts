import { use, expect } from 'chai';
import { waffle } from 'hardhat';

import ErrorHandlerJSON from '../_artifacts/contracts/ErrorHandling.sol/ErrorHandler.json';
import ErrorTriggerJSON from '../_artifacts/contracts/ErrorHandling.sol/ErrorTrigger.json';
import { ErrorHandler, ErrorTrigger } from '../_types';

use(waffle.solidity);

describe('Trigger & Handler', () => {
  let HandlerContract: ErrorHandler;
  let TriggerContract: ErrorTrigger;
  const [wallet] = waffle.provider.getWallets();

  before(async () => {
    HandlerContract = await waffle.deployContract(wallet, ErrorHandlerJSON) as ErrorHandler;
    TriggerContract = await waffle.deployContract(
      wallet,
      ErrorTriggerJSON,
      [HandlerContract.address],
    ) as ErrorTrigger;
  });

  it('contract state check', async () => {
    expect(await TriggerContract.error_contract()).to.be.eq(HandlerContract.address);
  });

  it('triggerRevert()', async () => {
    await expect(TriggerContract.triggerRevert()).to.be.revertedWith('REVERT');
    expect(await HandlerContract.revertEdit()).to.be.eq(10);
  });

  it('triggerRequire()', async () => {
    await expect(TriggerContract.triggerRequire()).to.be.revertedWith('REQUIRE');
    expect(await HandlerContract.requireEdit()).to.be.eq(10);
  });

  it('triggerSelfEdit()', async () => {
    await TriggerContract.triggerSelfEdit();
    expect(await HandlerContract.selfEdit()).eq(100);
  })
});
