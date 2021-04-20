pragma solidity >=0.5.0 <0.8.0;

import "./interface/IERC165.sol";

contract BasicERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceID) public override pure returns (bool) {
        return interfaceID == bytes4(keccak256('supportsInterface(bytes4)'));
    }
}
