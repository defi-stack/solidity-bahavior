pragma solidity >=0.5.0 <0.8.0;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

abstract contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

contract ERC165Storage is ERC165 {
    uint32 public data;

    function get() public view returns (uint32) {
        return data;
    }

    function set(uint32 _data) public returns (bool) {
        data = _data;
        return true;
    }

    function supportsInterface(bytes4 interfaceId) public override view returns (bool) {
        return
            interfaceId == this.supportsInterface.selector ||
            interfaceId == this.get.selector ||
            interfaceId == this.set.selector;
    }
}
