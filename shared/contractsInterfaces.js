"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestERC20_Interface = exports.FractionsContract_Interface = void 0;
exports.FractionsContract_Interface = [
    "function setApprovalForAll(address, bool) public",
    "function isApprovedForAll(address, address) public view returns (bool)",
    "function balanceOf(address, uint256) public view returns (uint256)",
    "function totalSupply(uint256) public view returns (uint256)",
    "function exists(uint256 id) public view returns (bool)",
    "function isWhitelistedForId(address, uint256) public view returns (bool)"
];
exports.TestERC20_Interface = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function allowance(address, address) public view returns (uint256)",
    "function approve(address, uint256) public returns (bool)",
    "function mint(address, uint256) public"
];
