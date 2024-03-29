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
//import  express  from 'express';
var express = require('express');
var bodyParser = require("body-parser");
//import bodyParser from 'body-parser';
var utils_1 = require("./shared/utils");
var app = express();
var port = 3000;
app.use(bodyParser.json());
//1.   Define the API endpoint for requesting pool creation permit
app.post('/request-pool-creation-permit', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAdmin_1, maxFractions, minFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, TestERC20Address_1, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletAdmin_1 = _a.walletAdmin, maxFractions = _a.maxFractions, minFractions = _a.minFractions, pricePerFraction = _a.pricePerFraction, interestPercentage = _a.interestPercentage, fundsProvisionDuration = _a.fundsProvisionDuration, poolDuration = _a.poolDuration, TestERC20Address_1 = _a.TestERC20Address;
                return [4 /*yield*/, (0, utils_1.request_PoolCreationPermit)(walletAdmin_1, maxFractions, minFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, TestERC20Address_1)];
            case 1:
                response = _b.sent();
                res.status(200).json({ message: 'requesting pool creation permit successful',
                    response: response
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error requesting pool creation permit:', error_1);
                res.status(500).json({ error: 'An error occurred while requesting pool creation permit.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("API server listening at http://localhost:".concat(port));
});
//2.  Define the API endpoint for whitelisting buyers
// app.post('/whitelist-buyers', async (req: Request, res: Response) => {
//     try {
//         // Extract the list of buyers from the request body
//         const { buyers } = req.body;
//         await whiteList_Accounts(buyers);
//         res.status(200).json({ message: 'Buyers whitelisted successfully.' });
//     } catch (error) {
//         console.error('Error whitelisting buyers:', error);
//         res.status(500).json({ error: 'An error occurred while whitelisting buyers.' });
//     }
// });
// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());
app.post('/whitelist-buyers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var buyers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                buyers = req.body.buyers;
                return [4 /*yield*/, (0, utils_1.whiteList_Accounts)(buyers)];
            case 1:
                _a.sent();
                res.status(200).json({ message: 'Buyers whitelisted successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error whitelisting buyers:', error_2);
                res.status(500).json({ error: 'An error occurred while whitelisting buyers.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// // Assuming you have a function to start your server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
// app.listen(port, () => {
//     console.log(`API server listening at http://localhost:${port}`);
// });
// Send a Post request to this endpoint like this
/*
 {
    "buyers": ["buyer1", "buyer2", "buyer3"]
}
  
 */
//3. Define the API endpoint for validating a pool creation request
app.post('/validate-pool-request', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, poolId, isValid, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, poolId = _a.poolId, isValid = _a.isValid;
                // Call the SDK function to validate the pool creation request
                return [4 /*yield*/, (0, utils_1.validate_PoolRequest)(poolId, isValid)];
            case 1:
                // Call the SDK function to validate the pool creation request
                _b.sent();
                res.status(200).json({ message: 'Pool creation request validated successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('Error validating pool creation request:', error_3);
                res.status(500).json({ error: 'An error occurred while validating pool creation request.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// app.listen(port, () => {
//     console.log(`API server listening at http://localhost:${port}`);
// });
//Assert -->  
app.get('/read-agrifi-protocol-contract/:poolId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var poolId, contractData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                poolId = parseInt(req.params.poolId);
                return [4 /*yield*/, (0, utils_1.read_AgrifiProtocol_Contract)(poolId)];
            case 1:
                contractData = _a.sent();
                // Send the contract data as the response
                res.status(200).json(contractData);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error reading AgrifiProtocol contract data:', error_4);
                res.status(500).json({ error: 'An error occurred while reading AgrifiProtocol contract data.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//4.  Define the API endpoint for creating a pool
app.post('/create-pool', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAdmin_2, poolId, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletAdmin_2 = _a.walletAdmin, poolId = _a.poolId;
                // Call the SDK function to create the pool
                return [4 /*yield*/, (0, utils_1.create_Pool)(walletAdmin_2, poolId)];
            case 1:
                // Call the SDK function to create the pool
                _b.sent();
                res.status(200).json({ message: 'Pool created successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.error('Error creating the pool:', error_5);
                res.status(500).json({ error: 'An error occurred while creating the pool.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Assert ------> Define the API endpoint for reading data from the AgrifiProtocol contract
app.get('/read-agrifi-protocol-contract/:poolId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _poolId, contractData, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _poolId = parseInt(req.params.poolId);
                return [4 /*yield*/, (0, utils_1.read_AgrifiProtocol_Contract)(_poolId)];
            case 1:
                contractData = _a.sent();
                // Send the contract data as the response
                res.status(200).json(contractData);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error reading AgrifiProtocol contract data:', error_6);
                res.status(500).json({ error: 'An error occurred while reading AgrifiProtocol contract data.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Assert ----->  Define the API endpoint for reading the balance of an account
app.get('/read-erc20-balance/:account', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var account, balance, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                account = req.params.account;
                return [4 /*yield*/, (0, utils_1.read_test_ERC20Contract)(account)];
            case 1:
                balance = _a.sent();
                // Send the balance as the response
                res.status(200).json({ balance: balance });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Error reading ERC20 balance:', error_7);
                res.status(500).json({ error: 'An error occurred while reading ERC20 balance.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Assert -----> // Define the API endpoint for reading data from the ERC20 contract for an account
app.get('/read-erc20-contract/:account', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var account, contractData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                account = req.params.account;
                return [4 /*yield*/, (0, utils_1.read_test_ERC20Contract)(account, true)];
            case 1:
                contractData = _a.sent();
                // Send the contract data as the response
                res.status(200).json(contractData);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Error reading ERC20 contract data:', error_8);
                res.status(500).json({ error: 'An error occurred while reading ERC20 contract data.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// app.listen(port, () => {
//     console.log(`API server listening at http://localhost:${port}`);
// });
// 5.  Define the API endpoint for approving ERC20 tokens
app.post('/approve-erc20', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletBuyer_1, amount, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletBuyer_1 = _a.walletBuyer, amount = _a.amount;
                return [4 /*yield*/, (0, utils_1.approve_AGRIFI_ForAmount_Erc20)(walletBuyer_1, amount)];
            case 1:
                _b.sent();
                res.status(200).json({ message: 'ERC20 tokens approved successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _b.sent();
                console.error('Error approving ERC20 tokens:', error_9);
                res.status(500).json({ error: 'An error occurred while approving ERC20 tokens.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// 6 // Define the API endpoint for purchasing fractions
app.post('/purchase-fractions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletBuyer_2, poolId, fractions, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletBuyer_2 = _a.walletBuyer,poolId = _a.poolId, fractions = _a.fractions;
                return [4 /*yield*/, (0, utils_1.pruchase_Fractions)(walletBuyer_2, poolId, fractions)];
            case 1:
                _b.sent();
                res.status(200).json({ message: 'Fractions purchased successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _b.sent();
                console.error('Error purchasing fractions:', error_10);
                res.status(500).json({ error: 'An error occurred while purchasing fractions.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Assert ---> Define the API endpoint for reading ERC20 token balances
app.get('/read-erc20-balances', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, accountBuyer_1, assert, balances, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, accountBuyer_1 = _a.accountBuyer, assert = _a.assert;
                return [4 /*yield*/, (0, utils_1.read_test_ERC20Contract)(accountBuyer_1 === null || accountBuyer_1 === void 0 ? void 0 : accountBuyer_1.toString(), assert === 'true')];
            case 1:
                balances = _b.sent();
                res.status(200).json({ balances: balances });
                return [3 /*break*/, 3];
            case 2:
                error_11 = _b.sent();
                console.error('Error reading ERC20 token balances:', error_11);
                res.status(500).json({ error: 'An error occurred while reading ERC20 token balances.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Assert -----> 
app.get('/read-erc20-contract', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Agrifi_Addr, contractInfo, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Agrifi_Addr = req.query.Agrifi_Addr;
                return [4 /*yield*/, (0, utils_1.read_test_ERC20Contract)(Agrifi_Addr === null || Agrifi_Addr === void 0 ? void 0 : Agrifi_Addr.toString())];
            case 1:
                contractInfo = _a.sent();
                // Send the contract information as the response
                res.status(200).json({ contractInfo: contractInfo });
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                console.error('Error reading ERC20 contract information:', error_12);
                res.status(500).json({ error: 'An error occurred while reading ERC20 contract information.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Assert ---->
// Define the API endpoint for reading fractions contract information
app.get('/read-fractions-contract', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, accountBuyer_2, poolId, buyerAccount, parsedPoolId, fractionsInfo, error_13;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, accountBuyer_2 = _a.accountBuyer, poolId = _a.poolId;
                buyerAccount = typeof accountBuyer_2 === 'string' ? accountBuyer_2 : '';
                parsedPoolId = parseInt(poolId);
                return [4 /*yield*/, (0, utils_1.read_Fractions_Contract)(buyerAccount, parsedPoolId)];
            case 1:
                fractionsInfo = _b.sent();
                // Send the fractions contract information as the response
                res.status(200).json({ fractionsInfo: fractionsInfo });
                return [3 /*break*/, 3];
            case 2:
                error_13 = _b.sent();
                console.error('Error reading fractions contract information:', error_13);
                res.status(500).json({ error: 'An error occurred while reading fractions contract information.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//8
// Define the API endpoint for starting the pool and receiving funds
app.post('/start-pool', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAdmin_3, poolId, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletAdmin_3 = _a.walletAdmin, poolId = _a.poolId;
                // Call the SDK function to start the pool and receive funds
                return [4 /*yield*/, (0, utils_1.receive_Funds_FromPool)(walletAdmin_3, poolId)];
            case 1:
                // Call the SDK function to start the pool and receive funds
                _b.sent();
                // Send a success response
                res.status(200).json({ message: 'Pool started and funds received successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_14 = _b.sent();
                console.error('Error starting the pool and receiving funds:', error_14);
                res.status(500).json({ error: 'An error occurred while starting the pool and receiving funds.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//8.2 / Define the API endpoint for paying back the pool
app.post('/pay-back-pool', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletAdmin_4, poolId, payBackAmount, error_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletAdmin_4 = _a.walletAdmin, poolId = _a.poolId, payBackAmount = _a.payBackAmount;
                // Call the SDK function to pay back the pool
                return [4 /*yield*/, (0, utils_1.payBack_Pool)(walletAdmin_4, poolId, payBackAmount)];
            case 1:
                // Call the SDK function to pay back the pool
                _b.sent();
                // Send a success response
                res.status(200).json({ message: 'Pool paid back successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_15 = _b.sent();
                console.error('Error paying back the pool:', error_15);
                res.status(500).json({ error: 'An error occurred while paying back the pool.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//9 // Define the API endpoint for setting approval for all fractions
app.post('/set-approval-for-all-fractions', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var walletBuyer_3, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                walletBuyer_3 = req.body.walletBuyer;
                // Call the SDK function to set approval for all fractions
                return [4 /*yield*/, (0, utils_1.setApproval_ForAll_Fractions)(walletBuyer_3)];
            case 1:
                // Call the SDK function to set approval for all fractions
                _a.sent();
                // Send a success response
                res.status(200).json({ message: 'Approval for all fractions set successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_16 = _a.sent();
                console.error('Error setting approval for all fractions:', error_16);
                res.status(500).json({ error: 'An error occurred while setting approval for all fractions.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//9.1 
app.post('/receive-funds-after-payback', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, walletBuyer_4, poolId, error_17;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, walletBuyer_4 = _a.walletBuyer, poolId = _a.poolId;
                // Call the SDK function to allow the buyer to receive funds after payback
                return [4 /*yield*/, (0, utils_1.receive_Funds_After_Payback)(walletBuyer_4, poolId)];
            case 1:
                // Call the SDK function to allow the buyer to receive funds after payback
                _b.sent();
                // Send a success response
                res.status(200).json({ message: 'Funds and upsides received after payback successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_17 = _b.sent();
                console.error('Error receiving funds after payback:', error_17);
                res.status(500).json({ error: 'An error occurred while receiving funds after payback.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
