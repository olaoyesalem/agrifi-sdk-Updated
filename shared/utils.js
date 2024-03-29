"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieve_Stuck_Funds = exports.receive_Funds_After_NonFunded = exports.receive_Funds_After_Payback = exports.payBack_Pool = exports.jump_NonFunded = exports.receive_Funds_FromPool = exports.pruchase_Fractions = exports.create_Pool = exports.validate_PoolRequest = exports.request_PoolCreationPermit = exports.change_StuckFundsDuration = exports.change_OrganizationFeePercentageOnInterest = exports.change_StartingOrganizationFeePercentage = exports.change_MaxPoolDuration = exports.change_MaxInterestRate = exports.change_MinInterestRate = exports.change_MaxFundsProvisionDuration = exports.remove_FundingCurrency = exports.add_Funding_Currency = exports.set_StuckFundsReceiver = exports.update_Pool_Operator = exports.revoke_Operator_Role = exports.grant_Operator_Role = exports.remove_Accounts_FromWhitelist = exports.whiteList_Accounts = exports.setApproval_ForAll_Fractions = exports.approve_AGRIFI_ForAmount_Erc20 = exports.mint_TestERC20_toAccount = exports.isWhitelistedAccount = exports.read_AgrifiProtocol_Contract = exports.read_Fractions_Contract = exports.read_test_ERC20Contract = exports.check = exports.check_provider = exports.getSDKwithSigner = exports.erc20_contract = exports.fractions_contract = exports.TestERC20Address = exports.FractionsContractAddress = exports.accountStuckFundsReceiver = exports.accountOperator = exports.accountBuyer = exports.accountAdmin = exports.walletStuckFundsReceiver = exports.walletOperator = exports.walletBuyer = exports.walletAdmin = void 0;
var agrifi_pm_sdk_1 = require("@nexeraprotocol/agrifi-pm-sdk");
var ethers_1 = require("ethers");
var contractsInterfaces_1 = require("./contractsInterfaces");
var constants_1 = require("./constants");
var dotenv = require("dotenv");
dotenv.config();
// _______________________________________________________________________________________________________________________
/*
  Block Explorer for TORONET TestNet https://testnet.toronet.org/

  You should be able to check the Txs (and Internal Txs) and Events emitted from the related contracts here :

  - AgrifiProtocol : https://testnet.toronet.org/address.html?address=0x4aDCB6AD7BcDB8963c4598a24D3FCFE73ecd07A5



  - ERC1155Fractions Contract: https://testnet.toronet.org/address.html?address=0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6



  - TestERC20 : https://testnet.toronet.org/address.html?address=0xf15eBb1E72Ae567303418bB2d7945d92256A0946

*/
// _________________________________________________________________________________________________________________________
//  =======================       Connection Provider
// Create a provider instance to establish a connection with Toronet Testnet
var provider_test = new ethers_1.ethers.providers.JsonRpcProvider(constants_1.toronet_testnet_rpc_url, constants_1.toronet_testnet_chainId);
//  ======================       Private Keys
// Private Key of ADMIN's (also Deployer) EOA
var privateKeyAdmin = process.env.ADMIN_TEST_KEY;
// Private Key of BUYER's EOA
var privateKeyBuyer = process.env.BUYER_TEST_KEY;
// Private Key of POOL OPERATOR's EOA
var privateKeyOperator = process.env.OPERATOR_TEST_KEY;
// Private Key of STUCK_FUNDS_RECEIVER's EOA
var privateKeyStuckFundsReceiver = process.env.STUCK_FUNDS_RECEIVER_TEST_KEY;
//  ======================     WALLETS (Signers)  
// Set Up the Wallets (Signers) instances
// We create a Wallet Instance as an EOA, we can sign Txs with the privateKey we provide to the constructor
exports.walletAdmin = new ethers_1.ethers.Wallet(privateKeyAdmin, provider_test);
exports.walletBuyer = new ethers_1.ethers.Wallet(privateKeyBuyer, provider_test);
exports.walletOperator = new ethers_1.ethers.Wallet(privateKeyOperator, provider_test);
exports.walletStuckFundsReceiver = new ethers_1.ethers.Wallet(privateKeyStuckFundsReceiver, provider_test);
//  ======================    Account Addresses
// Deployer's Account Address ---> ADMIN, Organization & TestErc20 Minter 
exports.accountAdmin = exports.walletAdmin.address; //'0x43f78b342084e370f10e0cd07d56d95c1728c9d4'
exports.accountBuyer = exports.walletBuyer.address;
exports.accountOperator = exports.walletOperator.address;
exports.accountStuckFundsReceiver = exports.walletStuckFundsReceiver.address;
//  ======================    Contract Addresses
// You can also query from the AgrifiProtocol (see fractionsContract, and Pool struct storage variables)
// This contract was deployed with the 1st Successful `requestPoolCreationPermit()` Tx
exports.FractionsContractAddress = '0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6';
exports.TestERC20Address = '0xf15eBb1E72Ae567303418bB2d7945d92256A0946';
//  ======================    Contract Instances
// Downgraded instances (connected to a provider **not connected to a signer**) only for read operations
exports.fractions_contract = new ethers_1.ethers.Contract(exports.FractionsContractAddress, contractsInterfaces_1.FractionsContract_Interface, provider_test);
exports.erc20_contract = new ethers_1.ethers.Contract(exports.TestERC20Address, contractsInterfaces_1.TestERC20_Interface, provider_test);
//  __________________________________________________________________________________________________________________________________
// ======================       GET AGRIFI     ======================================================
// chainID of TORONET testnet is : 54321 (on mainnet::  77777)
var getSDKwithSigner = function (signer) {
    var sdk = (0, agrifi_pm_sdk_1.getSDK)(constants_1.toronet_testnet_chainId, signer);
    return sdk;
};
exports.getSDKwithSigner = getSDKwithSigner;
//  __________________________________________________________________________________________________________________________________
// ========================================      READ  ops       ========================================================
var check_provider = function () { return __awaiter(void 0, void 0, void 0, function () {
    var isProvider, networkInfo, networkObj, latestBlock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isProvider = provider_test._isProvider;
                networkInfo = provider_test.network;
                return [4 /*yield*/, provider_test.getNetwork()];
            case 1:
                networkObj = _a.sent();
                return [4 /*yield*/, provider_test.getBlock("latest")];
            case 2:
                latestBlock = _a.sent();
                console.log("Is Provider:", isProvider);
                console.log("\nNetwork Info:", networkInfo);
                console.log("\nNetwork Object:", networkObj);
                console.log("\nLatest Block is : ", latestBlock);
                return [2 /*return*/];
        }
    });
}); };
exports.check_provider = check_provider;
var _check;
exports.check = _check;
var read_test_ERC20Contract = function (address, showAllowance) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, name, symbol, totalSup, decimals, isValidFundingCurrenty, error_1, balanceOfAddr, error_2, allowance, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                return [4 /*yield*/, exports.erc20_contract.name()];
            case 1:
                name = _a.sent();
                return [4 /*yield*/, exports.erc20_contract.symbol()];
            case 2:
                symbol = _a.sent();
                return [4 /*yield*/, exports.erc20_contract.totalSupply()];
            case 3:
                totalSup = _a.sent();
                return [4 /*yield*/, exports.erc20_contract.decimals()];
            case 4:
                decimals = _a.sent();
                console.log("\n\nREADING FROM Test_ERC20_CONTRACT ------------------------------------------------------------\n");
                console.log("Reading from address -> ".concat(exports.erc20_contract.address, " (ERC20 contract)"));
                console.log("Name of the ERC20 contract is : ".concat(name, "\nSymbol is : ").concat(symbol, "\nDecimals is : ").concat(decimals));
                console.log("The total supply of the ".concat(name, " Smart Contract is : ").concat(ethers_1.ethers.utils.formatUnits(totalSup, decimals)));
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, AGRIFI.isFundingCurrency(exports.erc20_contract.address)];
            case 6:
                isValidFundingCurrenty = _a.sent();
                console.log("\nIs testERC20 ".concat(exports.erc20_contract.address, " a valid funding currenty for AGRIFI ").concat(AGRIFI.address, ": ").concat(isValidFundingCurrenty, "\n"));
                _check = "\nIs testERC20 ".concat(exports.erc20_contract.address, " a valid funding currenty for AGRIFI ").concat(AGRIFI.address, ": ").concat(isValidFundingCurrenty, "\n");
                console.log(exports.check);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [3 /*break*/, 8];
            case 8:
                if (!address) return [3 /*break*/, 12];
                _a.label = 9;
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, exports.erc20_contract.balanceOf(address)];
            case 10:
                balanceOfAddr = _a.sent();
                console.log("The balance of account -> ".concat(address, " is : ").concat(ethers_1.ethers.utils.formatUnits(balanceOfAddr, decimals), " ").concat(symbol, " erc20 tokens"));
                return [3 /*break*/, 12];
            case 11:
                error_2 = _a.sent();
                console.log(error_2.message);
                return [3 /*break*/, 12];
            case 12:
                if (!showAllowance) return [3 /*break*/, 16];
                _a.label = 13;
            case 13:
                _a.trys.push([13, 15, , 16]);
                return [4 /*yield*/, exports.erc20_contract.allowance(address, AGRIFI.address)];
            case 14:
                allowance = _a.sent();
                console.log("Account --> ".concat(address, " has approved AGRIFIProtocol --> ").concat(AGRIFI.address, " for total ").concat(ethers_1.ethers.utils.formatUnits(allowance, decimals), " USDC erc20 tokens"));
                return [3 /*break*/, 16];
            case 15:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.read_test_ERC20Contract = read_test_ERC20Contract;
var read_Fractions_Contract = function (account, poolId, showApproval) { return __awaiter(void 0, void 0, void 0, function () {
    var fractionsContractAddrFromAgrifi, totalSupplyOfFractionsForPoolId, balanceOfAccount, poolIdExists, error_4, isAgrifiApproved, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol.fractionsContract()];
            case 1:
                fractionsContractAddrFromAgrifi = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, exports.fractions_contract.totalSupply(poolId)];
            case 3:
                totalSupplyOfFractionsForPoolId = _a.sent();
                return [4 /*yield*/, exports.fractions_contract.balanceOf(account, poolId)];
            case 4:
                balanceOfAccount = _a.sent();
                return [4 /*yield*/, exports.fractions_contract.exists(poolId)];
            case 5:
                poolIdExists = _a.sent();
                console.log("\n\nREADING FROM FRACTIONS_CONTRACT  ----------------------------------------------------------\n");
                console.log("Reading from address -> ".concat(exports.fractions_contract.address, " (ERC1155 contract)"));
                console.log("Does ERC1155 with ID : ".concat(poolId, " exist? : ").concat(poolIdExists));
                console.log("Total Supply of ERC1155 tokens with ID : ".concat(poolId, " is : ").concat(totalSupplyOfFractionsForPoolId.toString()));
                console.log("The balance of account -> ".concat(account, " for ID: ").concat(poolId, " is : ").concat(balanceOfAccount.toString(), "  erc1155 tokens"));
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                console.log(error_4.message);
                return [3 /*break*/, 7];
            case 7:
                if (fractionsContractAddrFromAgrifi === exports.fractions_contract.address) {
                    console.log("\nERC1155Fractions Contract has been created");
                }
                else {
                    console.log("\nNo Match:");
                    console.log("Either  ERC1155 Fractions Contract no yet deployed.. A successfull requestPoolCreationPermit() Tx is needed");
                    console.log("Or you have wrong hardcoded the address of the ERC1155Fractions Contract");
                }
                if (!showApproval) return [3 /*break*/, 11];
                _a.label = 8;
            case 8:
                _a.trys.push([8, 10, , 11]);
                return [4 /*yield*/, exports.fractions_contract
                        .isApprovedForAll(account, (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol.address)];
            case 9:
                isAgrifiApproved = _a.sent();
                console.log("Is AgrifiProtocol approved by Account --> ".concat(account, " for all its fractions? : ").concat(isAgrifiApproved));
                return [3 /*break*/, 11];
            case 10:
                error_5 = _a.sent();
                console.log(error_5.message);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.read_Fractions_Contract = read_Fractions_Contract;
var read_AgrifiProtocol_Contract = function (poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, fractionsContract, isFundingCurrency, poolCounter, maxFundsProvisionDuration, minInterestRate, maxInterestRate, maxPoolDuration, startingOrgFeePercentage, orgFeePercentageOnInterest, stuckFundsDuration, error_6, poolStruct, poolMonetaryInfoStruct, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(provider_test).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, AGRIFI.fractionsContract()];
            case 2:
                fractionsContract = _a.sent();
                return [4 /*yield*/, AGRIFI.isFundingCurrency(exports.erc20_contract.address)];
            case 3:
                isFundingCurrency = _a.sent();
                return [4 /*yield*/, AGRIFI.poolCount()];
            case 4:
                poolCounter = _a.sent();
                return [4 /*yield*/, AGRIFI.maxFundsProvisionDuration()];
            case 5:
                maxFundsProvisionDuration = _a.sent();
                return [4 /*yield*/, AGRIFI.minInterestRate()];
            case 6:
                minInterestRate = _a.sent();
                return [4 /*yield*/, AGRIFI.maxInterestRate()];
            case 7:
                maxInterestRate = _a.sent();
                return [4 /*yield*/, AGRIFI.maxPoolDuration()];
            case 8:
                maxPoolDuration = _a.sent();
                return [4 /*yield*/, AGRIFI.startingOrganizationFeePercentage()];
            case 9:
                startingOrgFeePercentage = _a.sent();
                return [4 /*yield*/, AGRIFI.organizationFeePercentageOnInterest()];
            case 10:
                orgFeePercentageOnInterest = _a.sent();
                return [4 /*yield*/, AGRIFI.stuckFundsDuration()];
            case 11:
                stuckFundsDuration = _a.sent();
                console.log("\n\nREADING FROM Agrifirotocol Contract ---------------------------------------------------------------------\n");
                console.log("The address of the ERC1155 fractionsContract is --> ".concat(fractionsContract));
                console.log("Is testERC20 a valid funding currency: ".concat(isFundingCurrency));
                console.log("Amount of 'Pools' that the Protocol has generated: ".concat(poolCounter));
                console.log("\nCrucial parameters of Agrifi Protocol---------------------------------------");
                console.log("\nTime-based parameters.................................");
                /*
                console.log(`MaxFundsProvisionDuration:\t\t ${maxFundsProvisionDuration}`);
                console.log(`MaxBuybackDuration:\t\t\t ${maxBuybackDuration} seconds`);
                console.log(`MarginCallPeriod:\t\t\t ${marginCallPeriod}`);
                console.log(`AcceptedPeriodBetweenMarginCalls:\t ${acceptedPeriodBetweenMarginCalls}`); */
                console.log("MaxFundsProvisionDuration:\t\t ".concat(maxFundsProvisionDuration, " seconds or ").concat(maxFundsProvisionDuration.toNumber() / 3600, " hours or ").concat(maxFundsProvisionDuration.toNumber() / (3600 * 24), " days"));
                console.log("maxPoolDuration:\t\t\t ".concat(maxPoolDuration, " seconds or ").concat(maxPoolDuration.toNumber() / 3600, " hours or ").concat(maxPoolDuration.toNumber() / (3600 * 24), " days"));
                console.log("stuckFundsDuration:\t\t\t ".concat(stuckFundsDuration, " seconds or ").concat(stuckFundsDuration.toNumber() / 3600, " hours or ").concat(stuckFundsDuration.toNumber() / (3600 * 24), " days"));
                console.log("\nFees Percentages & Rates...............................");
                console.log("MinInterestRate: ".concat((minInterestRate.toNumber() / 1000000) * 100, " %"));
                console.log("MaxInterestRate: ".concat((maxInterestRate.toNumber() / 1000000) * 100, " %"));
                console.log("startingOrgFeePercentage: ".concat(startingOrgFeePercentage.toNumber() / 1000000 * 100, " %"));
                console.log("orgFeePercentageOnInterest: ".concat((orgFeePercentageOnInterest.toNumber() / 1000000) * 100, " %"));
                return [3 /*break*/, 13];
            case 12:
                error_6 = _a.sent();
                console.log(error_6.message);
                return [3 /*break*/, 13];
            case 13:
                if (!poolId) return [3 /*break*/, 18];
                _a.label = 14;
            case 14:
                _a.trys.push([14, 17, , 18]);
                return [4 /*yield*/, AGRIFI.pools(poolId)];
            case 15:
                poolStruct = _a.sent();
                return [4 /*yield*/, AGRIFI.poolsMonetaryInfo(poolId)];
            case 16:
                poolMonetaryInfoStruct = _a.sent();
                console.log("\nReading Pool with ID == ".concat(poolId, " -------------------------------------------------"));
                console.log("Operator is --> ".concat(poolStruct[9]));
                console.log("MetaNFT iD associated with Pool_".concat(poolId, " is: ").concat(poolStruct[7]));
                console.log("Status of poolID:".concat(poolId, " Pool is ").concat(poolStruct[5]));
                console.log("Funding Currency of Pool --> poolID:".concat(poolId, " is ").concat(poolStruct[0]));
                console.log("Funds Provision Duration of Pool--> poolID:".concat(poolId, " is ").concat(poolStruct[1]));
                console.log("Duration of Pool--> poolID:".concat(poolId, " is ").concat(poolStruct[2]));
                console.log("Stuck Funds Timestamp of Pool--> poolID:".concat(poolId, " is ").concat(poolStruct[6]));
                console.log("Starting Timestamp of Pool--> poolID:".concat(poolId, " is ").concat(poolStruct[3]));
                console.log("Ending Timestamp of Pool--> poolID:".concat(poolId, " is ").concat(poolStruct[4]));
                console.log("Max Fractions of Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[0]));
                console.log("Min Fractions of Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[1]));
                console.log("Price per Fraction of Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[2]));
                console.log("Total funds Provided to Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[3]));
                console.log("Fractions purchased from Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[7]));
                console.log("Fractions redeemed from Pool--> poolID:".concat(poolId, " is ").concat(poolMonetaryInfoStruct[8]));
                return [3 /*break*/, 18];
            case 17:
                error_7 = _a.sent();
                console.log(error_7.message);
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.read_AgrifiProtocol_Contract = read_AgrifiProtocol_Contract;
var isWhitelistedAccount = function (account) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(provider_test).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.isWhitelisted(account)];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log(error_8.message);
                return [3 /*break*/, 4];
            case 4:
                if (result) {
                    console.log("Account: ".concat(account, " is whitelisted!"));
                }
                else {
                    console.log("Account ".concat(account, " is NOT whitelisted!"));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.isWhitelistedAccount = isWhitelistedAccount;
// ========================================================    WRITE OPs   =======================================================================
var mint_TestERC20_toAccount = function (account, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var erc20contract, decimals, balanceBefore, txRes, txRec, balanceAfter, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                erc20contract = exports.erc20_contract.connect(exports.walletAdmin);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, erc20contract.decimals()];
            case 2:
                decimals = _a.sent();
                return [4 /*yield*/, erc20contract.balanceOf(account)];
            case 3:
                balanceBefore = _a.sent();
                console.log("\nBalances before Minting-----------------------------------------------------");
                console.log("\nBalance of Account --> ".concat(account, " is: ").concat(ethers_1.ethers.utils.formatUnits(balanceBefore, decimals), " test USDC ERC20 tokens"));
                console.log("\n..............    Miniting    ...............");
                return [4 /*yield*/, erc20contract.mint(account, ethers_1.ethers.utils.parseUnits(amount, decimals))];
            case 4:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 5:
                txRec = _a.sent();
                if (!(txRec.status == 1)) return [3 /*break*/, 7];
                return [4 /*yield*/, erc20contract.balanceOf(account)];
            case 6:
                balanceAfter = _a.sent();
                console.log("\nBalances after Minting-----------------------------------------------------");
                console.log("\nBalance of Account --> ".concat(account, " is: ").concat(ethers_1.ethers.utils.formatUnits(balanceAfter, decimals), " test USDC ERC20 tokens"));
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_9 = _a.sent();
                console.log(error_9.reason);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.mint_TestERC20_toAccount = mint_TestERC20_toAccount;
var approve_AGRIFI_ForAmount_Erc20 = function (wallet, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFIaddr, erc20contract, txRes, txRec, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFIaddr = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol.address;
                erc20contract = exports.erc20_contract.connect(wallet);
                console.log("\n--------------------------   APPROVAL: ALLOWANCE -------------------------------------");
                console.log("\nAccount --> ".concat(wallet.address, "\napproves AgrifiProtocol--> ").concat(AGRIFIaddr));
                console.log("for ".concat(amount, " erc20 tokens --> ").concat(erc20contract.address));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, erc20contract.approve(AGRIFIaddr, ethers_1.ethers.utils.parseEther(amount))];
            case 2:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 3:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log('Tx succeeded');
                }
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                console.log(error_10.reason);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.approve_AGRIFI_ForAmount_Erc20 = approve_AGRIFI_ForAmount_Erc20;
var setApproval_ForAll_Fractions = function (wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, fractionsContractAddress, fractionContract, contract, txRes, txRec, txLogs, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                return [4 /*yield*/, AGRIFI.fractionsContract()];
            case 1:
                fractionsContractAddress = _a.sent();
                fractionContract = new ethers_1.ethers.Contract(fractionsContractAddress, contractsInterfaces_1.FractionsContract_Interface, provider_test);
                contract = fractionContract.connect(wallet);
                console.log("".concat(wallet.address, " Approving AgrifiProtocol for All fractions (erc1155)............................."));
                console.log("Fractions Contract --> ".concat(fractionsContractAddress));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, contract.setApprovalForAll(AGRIFI.address, true)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    txLogs = txRec.logs;
                    console.log('Tx Succeeded');
                }
                return [3 /*break*/, 6];
            case 5:
                error_11 = _a.sent();
                console.log(error_11.reason);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.setApproval_ForAll_Fractions = setApproval_ForAll_Fractions;
// -------------------------        Whitelisting OPs  -----------------------------------
// All the following **_Static functions are essentially simulating the respective Txs. If Tx simulation succeeds
// we return true, if it does not, we log the revert error message and return false.
var whiteList_Accounts_Static = function (addrToWhitelist) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.addUsersToWhitelist(addrToWhitelist)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_12.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var whiteList_Accounts = function (addrToWhitelist) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, whiteList_Accounts_Static(addrToWhitelist)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nWhitelisting accounts ------------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.addUsersToWhitelist(addrToWhitelist)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_13 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_13 === null || error_13 === void 0 ? void 0 : error_13["message"]));
                console.log("\nHash of failed Tx: ".concat(error_13 === null || error_13 === void 0 ? void 0 : error_13.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.whiteList_Accounts = whiteList_Accounts;
// _____________________________________________________________________________________________________________________
var remove_Accounts_FromWhitelist_Static = function (addrToRemoveFromWhitelist) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.removeUsersFromWhitelist(addrToRemoveFromWhitelist)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_14 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_14.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var remove_Accounts_FromWhitelist = function (addrToRemoveFromWhitelist) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, remove_Accounts_FromWhitelist_Static(addrToRemoveFromWhitelist)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nRevoking accounts from Whitelist ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.removeUsersFromWhitelist(addrToRemoveFromWhitelist)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_15 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_15 === null || error_15 === void 0 ? void 0 : error_15["message"]));
                console.log("\nHash of failed Tx: ".concat(error_15 === null || error_15 === void 0 ? void 0 : error_15.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.remove_Accounts_FromWhitelist = remove_Accounts_FromWhitelist;
// _____________________________________________________________________________________________________________________
var grant_Operator_Role_Static = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.grantOperatorRole(address)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_16 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_16.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var grant_Operator_Role = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, grant_Operator_Role_Static(address)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nGranting Operator Role ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.grantOperatorRole(address)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_17 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_17 === null || error_17 === void 0 ? void 0 : error_17["message"]));
                console.log("\nHash of failed Tx: ".concat(error_17 === null || error_17 === void 0 ? void 0 : error_17.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.grant_Operator_Role = grant_Operator_Role;
// _____________________________________________________________________________________________________________________
var revoke_Operator_Role_Static = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.revokeOperatorRole(address)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_18 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_18.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var revoke_Operator_Role = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, revoke_Operator_Role_Static(address)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nRevoking Operator Role ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.revokeOperatorRole(address)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_19 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_19 === null || error_19 === void 0 ? void 0 : error_19["message"]));
                console.log("\nHash of failed Tx: ".concat(error_19 === null || error_19 === void 0 ? void 0 : error_19.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.revoke_Operator_Role = revoke_Operator_Role;
// _____________________________________________________________________________________________________________________
var update_Pool_Operator_Static = function (poolId, newOperatorAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.updatePoolOperator(poolId, newOperatorAddr)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_20 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_20.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var update_Pool_Operator = function (poolId, newOperatorAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, update_Pool_Operator_Static(poolId, newOperatorAddr)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nUpdating Operator for ".concat(poolId, " Pool ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.updatePoolOperator(poolId, newOperatorAddr)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_21 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_21 === null || error_21 === void 0 ? void 0 : error_21["message"]));
                console.log("\nHash of failed Tx: ".concat(error_21 === null || error_21 === void 0 ? void 0 : error_21.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.update_Pool_Operator = update_Pool_Operator;
// _____________________________________________________________________________________________________________________
var set_StuckFundsReceiver_Static = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.setStuckFundsReceiverAddress(address)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_22 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_22.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var set_StuckFundsReceiver = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, set_StuckFundsReceiver_Static(address)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting Stuck Funds Receiver ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.setStuckFundsReceiverAddress(address)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_23 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_23 === null || error_23 === void 0 ? void 0 : error_23["message"]));
                console.log("\nHash of failed Tx: ".concat(error_23 === null || error_23 === void 0 ? void 0 : error_23.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.set_StuckFundsReceiver = set_StuckFundsReceiver;
// _____________________________________________________________________________________________________________________
var add_Funding_Currency_Static = function (fundingCurrencyAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.addFundingCurrency(fundingCurrencyAddr)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_24 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_24.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var add_Funding_Currency = function (fundingCurrencyAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_25;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, add_Funding_Currency_Static(fundingCurrencyAddr)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nAdding Funding Currency ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.addFundingCurrency(fundingCurrencyAddr)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_25 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_25 === null || error_25 === void 0 ? void 0 : error_25["message"]));
                console.log("\nHash of failed Tx: ".concat(error_25 === null || error_25 === void 0 ? void 0 : error_25.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.add_Funding_Currency = add_Funding_Currency;
// _____________________________________________________________________________________________________________________
var remove_FundingCurrency_Static = function (fundingCurrencyAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_26;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.removeFundingCurrency(fundingCurrencyAddr)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_26 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_26.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var remove_FundingCurrency = function (fundingCurrencyAddr) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_27;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, remove_FundingCurrency_Static(fundingCurrencyAddr)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nRemoving Funding Currency ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.removeFundingCurrency(fundingCurrencyAddr)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_27 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_27 === null || error_27 === void 0 ? void 0 : error_27["message"]));
                console.log("\nHash of failed Tx: ".concat(error_27 === null || error_27 === void 0 ? void 0 : error_27.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.remove_FundingCurrency = remove_FundingCurrency;
// _____________________________________________________________________________________________________________________
// ================================================== PARAMETERS CHANGE
var change_MaxFundsProvisionDuration_Static = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_28;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeMaxFundsProvisionDuration(duration)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_28 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_28.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_MaxFundsProvisionDuration = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_29;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_MaxFundsProvisionDuration_Static(duration)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new MaxFundsProvisionDuration ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeMaxFundsProvisionDuration(duration)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_29 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_29 === null || error_29 === void 0 ? void 0 : error_29["message"]));
                console.log("\nHash of failed Tx: ".concat(error_29 === null || error_29 === void 0 ? void 0 : error_29.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_MaxFundsProvisionDuration = change_MaxFundsProvisionDuration;
// _____________________________________________________________________________________________________________________
//export const txnHash_poolCreationPermit=0;
var change_MinInterestRate_Static = function (rate) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_30;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeMinInterestRate(ethers_1.ethers.utils.parseUnits(rate, 6))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_30 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_30.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_MinInterestRate = function (rate) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_31;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_MinInterestRate_Static(rate)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new MinInterestRate ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeMinInterestRate(ethers_1.ethers.utils.parseUnits(rate, 6))];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_31 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_31 === null || error_31 === void 0 ? void 0 : error_31["message"]));
                console.log("\nHash of failed Tx: ".concat(error_31 === null || error_31 === void 0 ? void 0 : error_31.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_MinInterestRate = change_MinInterestRate;
// _____________________________________________________________________________________________________________________
var change_MaxInterestRate_Static = function (rate) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_32;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeMaxInterestRate(ethers_1.ethers.utils.parseUnits(rate, 6))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_32 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_32.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_MaxInterestRate = function (rate) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_33;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_MaxInterestRate_Static(rate)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new MaxInterestRate ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeMaxInterestRate(ethers_1.ethers.utils.parseUnits(rate, 6))];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_33 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_33 === null || error_33 === void 0 ? void 0 : error_33["message"]));
                console.log("\nHash of failed Tx: ".concat(error_33 === null || error_33 === void 0 ? void 0 : error_33.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_MaxInterestRate = change_MaxInterestRate;
// _____________________________________________________________________________________________________________________
var change_MaxPoolDuration_Static = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_34;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeMaxPoolDuration(duration)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_34 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_34.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_MaxPoolDuration = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_35;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_MaxPoolDuration_Static(duration)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new MaxPoolDuration ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeMaxPoolDuration(duration)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_35 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_35 === null || error_35 === void 0 ? void 0 : error_35["message"]));
                console.log("\nHash of failed Tx: ".concat(error_35 === null || error_35 === void 0 ? void 0 : error_35.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_MaxPoolDuration = change_MaxPoolDuration;
// _____________________________________________________________________________________________________________________
var change_StartingOrganizationFeePercentage_Static = function (percentage) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_36;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeStartingOrganizationFeePercentage(ethers_1.ethers.utils.parseUnits(percentage, 6))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_36 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_36.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_StartingOrganizationFeePercentage = function (percentage) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_37;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_StartingOrganizationFeePercentage_Static(percentage)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new StartingOrganizationFeePercentage ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeStartingOrganizationFeePercentage(ethers_1.ethers.utils.parseUnits(percentage, 6))];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_37 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_37 === null || error_37 === void 0 ? void 0 : error_37["message"]));
                console.log("\nHash of failed Tx: ".concat(error_37 === null || error_37 === void 0 ? void 0 : error_37.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_StartingOrganizationFeePercentage = change_StartingOrganizationFeePercentage;
// _____________________________________________________________________________________________________________________
var change_OrganizationFeePercentageOnInterest_Static = function (percentage) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_38;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeOrganizationFeePercentageOnInterest(ethers_1.ethers.utils.parseUnits(percentage, 6))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_38 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_38.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_OrganizationFeePercentageOnInterest = function (percentage) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_39;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_OrganizationFeePercentageOnInterest_Static(percentage)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new OrganizationFeePercentageOnInterest ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeOrganizationFeePercentageOnInterest(ethers_1.ethers.utils.parseUnits(percentage, 6))];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_39 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_39 === null || error_39 === void 0 ? void 0 : error_39["message"]));
                console.log("\nHash of failed Tx: ".concat(error_39 === null || error_39 === void 0 ? void 0 : error_39.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_OrganizationFeePercentageOnInterest = change_OrganizationFeePercentageOnInterest;
// _____________________________________________________________________________________________________________________
var change_StuckFundsDuration_Static = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_40;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.changeStuckFundsDuration(duration)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_40 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_40.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var change_StuckFundsDuration = function (duration) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_41;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, change_StuckFundsDuration_Static(duration)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nSetting new StuckFundsDuration ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.changeStuckFundsDuration(duration)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_41 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_41 === null || error_41 === void 0 ? void 0 : error_41["message"]));
                console.log("\nHash of failed Tx: ".concat(error_41 === null || error_41 === void 0 ? void 0 : error_41.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.change_StuckFundsDuration = change_StuckFundsDuration;
// _____________________________________________________________________________________________________________________
// ================================================== POOL CREATION REQUEST & VALIDATION
var request_PoolCreationPermit_Static = function (wallet, maxAmountOfFractions, minAmountOfFractions, pricePerFraction, // price is a string that we parse with the decimals of the fundingCurrency ("1" is 1 erc20 token)
interestPercentage, // percentages are based on 1000000 (10^6):: "0.1" --> 10% --> 0.1 * 10^6 --> 100000
fundsProvisionDuration, // durations are in seconds
poolDuration, // durations are in seconds
fundingCurrency) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_42;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.requestPoolCreationPermit(maxAmountOfFractions, minAmountOfFractions, ethers_1.ethers.utils.parseEther(pricePerFraction), ethers_1.ethers.utils.parseUnits(interestPercentage, 6), fundsProvisionDuration, poolDuration, fundingCurrency)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_42 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_42.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var request_PoolCreationPermit = function (wallet, maxAmountOfFractions, minAmountOfFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, fundingCurrency) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_43;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_PoolCreationPermit_Static(wallet, maxAmountOfFractions, minAmountOfFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, fundingCurrency)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nRequesting new Pool ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.requestPoolCreationPermit(maxAmountOfFractions, minAmountOfFractions, ethers_1.ethers.utils.parseEther(pricePerFraction), ethers_1.ethers.utils.parseUnits(interestPercentage, 6), fundsProvisionDuration, poolDuration, fundingCurrency)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_43 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_43 === null || error_43 === void 0 ? void 0 : error_43["message"]));
                console.log("\nHash of failed Tx: ".concat(error_43 === null || error_43 === void 0 ? void 0 : error_43.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.request_PoolCreationPermit = request_PoolCreationPermit;
// _____________________________________________________________________________________________________________________
var validate_PoolRequest_Static = function (poolId, approved) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_44;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.validatePoolRequest(poolId, approved)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_44 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_44.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var validate_PoolRequest = function (poolId, approved) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_45;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validate_PoolRequest_Static(poolId, approved)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(exports.walletAdmin).AgrifiProtocol;
                console.log("\n\nValidating Pool creation request ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.validatePoolRequest(poolId, approved)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_45 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_45 === null || error_45 === void 0 ? void 0 : error_45["message"]));
                console.log("\nHash of failed Tx: ".concat(error_45 === null || error_45 === void 0 ? void 0 : error_45.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.validate_PoolRequest = validate_PoolRequest;
// _____________________________________________________________________________________________________________________
var create_Pool_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_46;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.createPool(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_46 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_46.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var create_Pool = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_47;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, create_Pool_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nCreating Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.createPool(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_47 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_47 === null || error_47 === void 0 ? void 0 : error_47["message"]));
                console.log("\nHash of failed Tx: ".concat(error_47 === null || error_47 === void 0 ? void 0 : error_47.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.create_Pool = create_Pool;
// _____________________________________________________________________________________________________________________
var pruchase_Fractions_Static = function (wallet, poolId, fractionsAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_48;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.purchase(poolId, fractionsAmount)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_48 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_48.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var pruchase_Fractions = function (wallet, poolId, fractionsAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_49;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pruchase_Fractions_Static(wallet, poolId, fractionsAmount)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nPurchasing Fractions  ------------------------------------------------------\n");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.purchase(poolId, fractionsAmount)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_49 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_49 === null || error_49 === void 0 ? void 0 : error_49["message"]));
                console.log("\nHash of failed Tx: ".concat(error_49 === null || error_49 === void 0 ? void 0 : error_49.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.pruchase_Fractions = pruchase_Fractions;
// _____________________________________________________________________________________________________________________
var receive_Funds_FromPool_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_50;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.receiveFundsFromPool(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_50 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_50.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var receive_Funds_FromPool = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_51;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, receive_Funds_FromPool_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nStarting Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.receiveFundsFromPool(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_51 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_51 === null || error_51 === void 0 ? void 0 : error_51["message"]));
                console.log("\nHash of failed Tx: ".concat(error_51 === null || error_51 === void 0 ? void 0 : error_51.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.receive_Funds_FromPool = receive_Funds_FromPool;
// _____________________________________________________________________________________________________________________
var jump_NonFunded_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_52;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.jumpToNonFunded(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_52 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_52.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var jump_NonFunded = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_53;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jump_NonFunded_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nSetting Non Funded State for Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.jumpToNonFunded(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_53 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_53 === null || error_53 === void 0 ? void 0 : error_53["message"]));
                console.log("\nHash of failed Tx: ".concat(error_53 === null || error_53 === void 0 ? void 0 : error_53.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.jump_NonFunded = jump_NonFunded;
// _____________________________________________________________________________________________________________________
var payBack_Pool_Static = function (wallet, poolId, payBackAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_54;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.payBack(poolId, ethers_1.ethers.utils.parseEther(payBackAmount))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_54 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_54.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var payBack_Pool = function (wallet, poolId, payBackAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_55;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, payBack_Pool_Static(wallet, poolId, payBackAmount)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nPaying back Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.payBack(poolId, ethers_1.ethers.utils.parseEther(payBackAmount))];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_55 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_55 === null || error_55 === void 0 ? void 0 : error_55["message"]));
                console.log("\nHash of failed Tx: ".concat(error_55 === null || error_55 === void 0 ? void 0 : error_55.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.payBack_Pool = payBack_Pool;
// _____________________________________________________________________________________________________________________
var receive_Funds_After_Payback_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_56;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.receiveFundsAfterPayback(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_56 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_56.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var receive_Funds_After_Payback = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_57;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, receive_Funds_After_Payback_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nReceiving funds after payback from Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.receiveFundsAfterPayback(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_57 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_57 === null || error_57 === void 0 ? void 0 : error_57["message"]));
                console.log("\nHash of failed Tx: ".concat(error_57 === null || error_57 === void 0 ? void 0 : error_57.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.receive_Funds_After_Payback = receive_Funds_After_Payback;
// _____________________________________________________________________________________________________________________
var receive_Funds_After_NonFunded_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_58;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.receiveFundsAfterNonFunded(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_58 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_58.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var receive_Funds_After_NonFunded = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_59;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, receive_Funds_After_NonFunded_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nReceiving funds after non funded Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.receiveFundsAfterNonFunded(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_59 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_59 === null || error_59 === void 0 ? void 0 : error_59["message"]));
                console.log("\nHash of failed Tx: ".concat(error_59 === null || error_59 === void 0 ? void 0 : error_59.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.receive_Funds_After_NonFunded = receive_Funds_After_NonFunded;
// _____________________________________________________________________________________________________________________
var retrieve_Stuck_Funds_Static = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var AGRIFI, error_60;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, AGRIFI.callStatic.retrieveStuckFunds(poolId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_60 = _a.sent();
                console.log("\nTx Failed with Error: ".concat(error_60.reason));
                return [2 /*return*/, false];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var retrieve_Stuck_Funds = function (wallet, poolId) { return __awaiter(void 0, void 0, void 0, function () {
    var status, AGRIFI, txRes, txRec, error_61;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, retrieve_Stuck_Funds_Static(wallet, poolId)];
            case 1:
                status = _a.sent();
                if (!status) return [3 /*break*/, 6];
                AGRIFI = (0, exports.getSDKwithSigner)(wallet).AgrifiProtocol;
                console.log("\n\nRetrieving stuck funds from Pool ".concat(poolId, "  ------------------------------------------------------\n"));
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, AGRIFI.retrieveStuckFunds(poolId)];
            case 3:
                txRes = _a.sent();
                return [4 /*yield*/, txRes.wait()];
            case 4:
                txRec = _a.sent();
                if (txRec.status == 1) {
                    console.log("\nTx Succeded\nTx Hash: ".concat(txRec.transactionHash));
                }
                return [3 /*break*/, 6];
            case 5:
                error_61 = _a.sent();
                console.log("\nTx failed:\n ".concat(error_61 === null || error_61 === void 0 ? void 0 : error_61["message"]));
                console.log("\nHash of failed Tx: ".concat(error_61 === null || error_61 === void 0 ? void 0 : error_61.transactionHash));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.retrieve_Stuck_Funds = retrieve_Stuck_Funds;
