"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toronet_testnet_chainId = exports.toronet_testnet_rpc_url = exports.Buyer_Addr = exports.StuckFundsReceiver_Addr = exports.Operator_Addr = exports.Admin_Addr = exports.FractionsContract_Addr = exports.FundingCurrency_Addr = exports.AgrifiProtocol_Addr = exports.PoolStatus = exports.oneMonthToSecs = exports.oneDayToSecs = exports.oneMinuteToSecs = exports.stuckFundsDuration = exports.organizationFeePercentageOnInterest = exports.startingOrganizationFeePercentage = exports.maxPoolDuration = exports.maxInterestRate = exports.minInterestRate = exports.maxFundsProvisionDuration = void 0;
exports.maxFundsProvisionDuration = 60 * 60 * 24 * 7; // 1 week
exports.minInterestRate = 50000; //ethers.utils.parseUnits('0.05', 6); // 5%
exports.maxInterestRate = 150000; //ethers.utils.parseUnits('0.15', 6); // 15%
exports.maxPoolDuration = 60 * 60 * 24 * 360; // 1 year
exports.startingOrganizationFeePercentage = 20000; // 2 % // ethers.utils.parseUnits('0.02', 6)
exports.organizationFeePercentageOnInterest = 50000; // 5 % // ethers.utils.parseUnits('0.05', 6)
exports.stuckFundsDuration = 60 * 60 * 24 * 30 * 6; // 6 months
exports.oneMinuteToSecs = 60;
exports.oneDayToSecs = exports.oneMinuteToSecs * 60 * 24;
exports.oneMonthToSecs = exports.oneDayToSecs * 30;
var PoolStatus;
(function (PoolStatus) {
    PoolStatus[PoolStatus["NON_EXISTENT"] = 0] = "NON_EXISTENT";
    PoolStatus[PoolStatus["REQUESTED"] = 1] = "REQUESTED";
    PoolStatus[PoolStatus["APPROVED"] = 2] = "APPROVED";
    PoolStatus[PoolStatus["REJECTED"] = 3] = "REJECTED";
    PoolStatus[PoolStatus["CREATED"] = 4] = "CREATED";
    PoolStatus[PoolStatus["FUNDED"] = 5] = "FUNDED";
    PoolStatus[PoolStatus["NOT_FUNDED"] = 6] = "NOT_FUNDED";
    PoolStatus[PoolStatus["STARTED"] = 7] = "STARTED";
    PoolStatus[PoolStatus["CLOSED_BY_PAYBACK"] = 8] = "CLOSED_BY_PAYBACK";
    PoolStatus[PoolStatus["RETRIEVED_BY_OPERATOR"] = 9] = "RETRIEVED_BY_OPERATOR";
})(PoolStatus || (exports.PoolStatus = PoolStatus = {}));
// --------- ADDRESSES
exports.AgrifiProtocol_Addr = '0x4aDCB6AD7BcDB8963c4598a24D3FCFE73ecd07A5';
exports.FundingCurrency_Addr = '0xf15eBb1E72Ae567303418bB2d7945d92256A0946';
exports.FractionsContract_Addr = '0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6';
exports.Admin_Addr = '0x43F78b342084e370f10e0Cd07d56d95c1728C9D4';
exports.Operator_Addr = '0x881c04BBaF07FC840332DA2Ce055C7d63eA66272';
exports.StuckFundsReceiver_Addr = '0x174E2d25C119209384D48223dae048696D2Da314';
exports.Buyer_Addr = '0x0546F34f7bA2e53E5DaFd18fb66f164803eBDed7';
// -------------------------------------------------------------------------
exports.toronet_testnet_rpc_url = "http://testnet.toronet.org/rpc/";
exports.toronet_testnet_chainId = 54321;
