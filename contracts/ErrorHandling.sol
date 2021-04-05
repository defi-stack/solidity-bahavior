pragma solidity >=0.5.0 <0.8.0;

interface IErrorHandler {
    function shouldRevert() external returns(bool);
    function shouldRequire() external returns(bool);
    function shouldRetFalse() external returns(bool);
}

contract ErrorHandler is IErrorHandler {
    int32 public revertEdit;
    int32 public requireEdit;
    int32 public selfEdit;

    constructor() {
        revertEdit = 10;
        requireEdit = 10;
    }

    function shouldRevert() external override returns(bool result) {
        revertEdit = 100;
        revert("REVERT");
        result = true;
    }

    function shouldRequire() external override returns(bool result) {
        requireEdit = 100;
        require(false, "REQUIRE");
        result = true;
    }

    function shouldRetFalse() external override returns(bool result) {
        selfEdit = 100;
        return false;
    }
}

contract ErrorTrigger {
    IErrorHandler public error_contract;

    constructor(address _addr) {
        error_contract = IErrorHandler(_addr);
    }

    function triggerRevert() public returns(bool result) {
        result = error_contract.shouldRevert();
    }

    function triggerRequire() public returns(bool result) {
        result = error_contract.shouldRequire();
    }

    function triggerSelfEdit() public returns(bool) {
        if (error_contract.shouldRetFalse()) {
            return false;
        }
        return true;
    }
}
