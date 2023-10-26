import {
    accountAdmin,
    walletAdmin,
    accountBuyer,
    accountOperator,
    accountStuckFundsReceiver,
    walletStuckFundsReceiver,
    walletBuyer,
    walletOperator,
    FractionsContractAddress,
    TestERC20Address,
    check_provider,
    approve_AGRIFI_ForAmount_Erc20,
    setApproval_ForAll_Fractions,
    mint_TestERC20_toAccount,
    read_AgrifiProtocol_Contract,
    read_Fractions_Contract,
    read_test_ERC20Contract,
    change_MaxFundsProvisionDuration,
    change_MaxInterestRate,
    change_MaxPoolDuration,
    change_MinInterestRate,
    change_OrganizationFeePercentageOnInterest,
    change_StartingOrganizationFeePercentage,
    change_StuckFundsDuration,
    grant_Operator_Role,
    revoke_Operator_Role,
    update_Pool_Operator,
    set_StuckFundsReceiver,
    whiteList_Accounts,
    remove_Accounts_FromWhitelist,
    add_Funding_Currency,
    remove_FundingCurrency,
    request_PoolCreationPermit,
    validate_PoolRequest,
    create_Pool,
    pruchase_Fractions,
    payBack_Pool,
    receive_Funds_FromPool,
    receive_Funds_After_Payback,
    receive_Funds_After_NonFunded,
    jump_NonFunded,
    retrieve_Stuck_Funds,
} from "./shared/utils";
import { AgrifiProtocol_Addr } from "./shared/constants";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();


// -----------------------------------------------------------------------------------------------------
/* 
  Block Explorer for TORONET TestNet https://testnet.toronet.org/ 

  You should be able to check the Txs (and Internal Txs) and Events emitted from the related contracts here :

  - AgrifiProtocol : https://testnet.toronet.org/address.html?address=0x4aDCB6AD7BcDB8963c4598a24D3FCFE73ecd07A5



  - ERC1155Fractions Contract: https://testnet.toronet.org/address.html?address=0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6



  - TestERC20 : https://testnet.toronet.org/address.html?address=0xf15eBb1E72Ae567303418bB2d7945d92256A0946

*/
// -------------------------------------------------------------------------------------------------------------------------------

// _____________________________________________________________________________________________________________________


/* ======================================   1st Check   ============================================================== */

//check_provider();
//read_Fractions_Contract(accountAdmin, 1, true);
//read_test_ERC20Contract(accountAdmin, true);
//read_AgrifiProtocol_Contract(2);


/* ======================================   TEST SHOWCASE    =================================================== */
const zeroAddress = ethers.constants.AddressZero;
const sevenMinutesToSecs = 420;
const threeMinutesToSecs = 180;
const poolId_ = 3;
const maxFractions = 500;
const minFractions = 200;
const payBackAmount = "600";


// --------------------------- Reverts

//set_StuckFundsReceiver(zeroAddress);
//grant_Operator_Role(zeroAddress);
//update_Pool_Operator(1, zeroAddress);
//whiteList_Accounts([zeroAddress]);
//remove_Accounts_FromWhitelist([]);
//add_Funding_Currency(zeroAddress);
//remove_FundingCurrency(accountAdmin);
//change_MaxFundsProvisionDuration(0);
//change_MinInterestRate("0");
//change_MaxInterestRate("0");
//change_MaxPoolDuration(0);
//change_StartingOrganizationFeePercentage("1");
//change_OrganizationFeePercentageOnInterest("1");
//change_StuckFundsDuration(100);


// ---------------------------  Txs


/* 
    1. Request Pool Creation (admin or operator) 
        `10` minutes for fundsProvision &  `20` minutes for pool duration
        15% interest (not accounted for at pilot phase)
        PoolOperator is the Admin
*/ 
//request_PoolCreationPermit(walletDeployer, maxFractions, minFractions, "1", "0.15", threeMinutesToSecs, 1200, TestERC20Address);



/* 2. Whitelist buyers (onlyAdmin) */
//whiteList_Accounts([accountBuyer]);




/* 3. Validate the requested Pool Creation Request */
//validate_PoolRequest(poolId_, true);



/* --------- Assert ------------------------------------ */
//read_AgrifiProtocol_Contract(poolId_);



/* 
    4.  Create the Pool
        After this Tx is successful Buyers have a maximum time window of `fundsProvisionDuration` seconds to buy fractions
*/
//create_Pool(walletDeployer, poolId_);



/* --------- Assert ------------------------------------ */
//read_AgrifiProtocol_Contract(poolId_);



/* 
    5.  Buyers Approve the AgrifiProtocol for the erc20 respective amount
        Say he wants to buy 500 fractions.. each fraction costs 1 erc20 token (configured at request step (1.))
*/
//approve_AGRIFI_ForAmount_Erc20(walletBuyer, "500");



/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountAdmin, true);


/* 6. Buyers purchase fractions */
//pruchase_Fractions(walletBuyer, poolId_, maxFractions);


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountBuyer, true);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_Fractions_Contract(accountBuyer, poolId_);
//read_AgrifiProtocol_Contract(poolId_);



/* 7. Pool Operator starts the pool (FundsProvisionDuration must have already elapsed) */
//receive_Funds_FromPool(walletDeployer, poolId_);


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountAdmin, true);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_AgrifiProtocol_Contract(poolId_);



/* 8. Pool Operator pays back the Pool (before the poolDuration Ends) */

/* 8.1 Pool Operator approves AgrifiProtocol for the payBack Amount */
//approve_AGRIFI_ForAmount_Erc20(walletDeployer, payBackAmount);


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountAdmin, true);



/* 8.2 Pool Operator pays back the Pool */
//payBack_Pool(walletDeployer, poolId_, payBackAmount);



/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountAdmin, true);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_AgrifiProtocol_Contract(poolId_);



/* 9. Buyers Receive their Funds and upsides */

/* 9.1 Buyers approve AgrifiProtocol as operator for their fractions */
//setApproval_ForAll_Fractions(walletBuyer);



/* --------- Assert ------------------------------------ */
//read_Fractions_Contract(accountBuyer, poolId_, true);



/* 9.2 Buyer receive their funds & upsides after pool's pyaback */
//receive_Funds_After_Payback(walletBuyer, poolId_);



/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountAdmin);
//read_test_ERC20Contract(accountBuyer);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_Fractions_Contract(accountAdmin, poolId_);
