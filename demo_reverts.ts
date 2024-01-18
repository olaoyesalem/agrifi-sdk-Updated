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
    isWhitelistedAccount,
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
import { maxPoolDuration, maxFundsProvisionDuration, oneMinuteToSecs, oneDayToSecs, oneMonthToSecs } from "./shared/constants";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();


/* ========================================================    REVERTS - Non permitted operations  ======================================================= 

    - Operations might not be permitted due to : 
        - Invalid states,
        - Wrong timestamps
        - Requirements not met
        - Access Control
_________________________________________________________________________________________________________________________________________________________*/


/* ======================================   1st Check   ============================================================== */

//read_Fractions_Contract(accountAdmin, 1, true);
//read_test_ERC20Contract(accountBuyer, true);
//read_AgrifiProtocol_Contract();
//isWhitelistedAccount(accountOperator);


/* ======================================   TEST SHOWCASE    =================================================== */
const zeroAddress = ethers.constants.AddressZero;

const fundsProvisionDuration_ = oneMinuteToSecs * 3;
const poolDuration_ = oneMinuteToSecs * 20;

const latestPoolId_ = 4;
const maxFractions_ = 0;
const minFractions_ = 0;

const pricePerFraction_ = "0"
const interestPercentage_1 = "0.045"  // MinInterest is currently set at 5%
const interestPercentage_2 = "0.155"  // MaxInterest is currently set at 15%


// --------------------------- Reverts

/* Cannot set zero-addeess as stuck Funds Receiver ------------------- */
//set_StuckFundsReceiver(zeroAddress);


/* Cannot grant zero-addeess Operator Role ----------------- */
//grant_Operator_Role(zeroAddress);


/* Cannot Update Pool Operator of non-existent Pool (i.e. PoolId == 100) -------------------- */
//update_Pool_Operator(100, accountOperator);


/* Cannot Update Pool Operator if account lacks Operator Role  ------------------------ */
//update_Pool_Operator(latestPoolId_, accountBuyer);


/* Cannot Update Pool Operator with the current Pool Operator ------------------ */
//update_Pool_Operator(1, accountAdmin);


/* Cannot Whitelist `nothing` ------------------ */
//whiteList_Accounts([]);


/* Cannot Whitelist the zero-address ------------------ */
//whiteList_Accounts([zeroAddress]);


/* Cannot Whitelist already whitelisted accounts ------------------ */
//whiteList_Accounts([accountBuyer]);


/* Cannot Remove from Whitelist `nothing` ------------------ */
//remove_Accounts_FromWhitelist([]);


/* Cannot Remove from Whitelist the zero-address ------------------ */
//remove_Accounts_FromWhitelist([zeroAddress]);


/* Cannot Remove from Whitelist accounts not present in the Whitelist ------------------ */
//remove_Accounts_FromWhitelist([accountAdmin]);


/* Cannot Add the zero-address as a valid funding currency ------------------ */
//add_Funding_Currency(zeroAddress);


/* Cannot Add twice the same address as a valid funding currency ------------------ */
//add_Funding_Currency(TestERC20Address);


/* Cannot remove an address from the valid Funding Currencies if it is not currently a valid funding currency  ------------------ */
//remove_FundingCurrency(accountAdmin);


/* Cannot set `maxFundsProvisionDuration` to 0 secs  ------------------ */
//change_MaxFundsProvisionDuration(0);


/* Cannot set `minInterestRate` to 0%  ------------------ */
//change_MinInterestRate("0");


/* Cannot set `minInterestRate` >  `maxInterestRate` ------------------ */
//change_MinInterestRate("0.151");


/* Cannot set `maxInterestRate` to 0%  ------------------ */
//change_MaxInterestRate("0");


/* Cannot set `maxInterestRate` < `minInterestRate`  ------------------ */
//change_MaxInterestRate("0.049");


/* Cannot set `maxPoolDuration` to 0 secs  ------------------ */
//change_MaxPoolDuration(0);


/* Cannot set `startingOrganizationFeePercentage` to 100% (or greater) ------------------ */
//change_StartingOrganizationFeePercentage("1");


/* Cannot set `organizationFeePercentageOnInterest` to 100% (or greater) ------------------ */
//change_OrganizationFeePercentageOnInterest("1");

/* Cannot set `stuckFundsDuration` less than 2 months ------------------ */
//change_StuckFundsDuration(oneMonthToSecs);


/* Cannot Request Pool when lacking Pool Operator Role (admin has Operator role by default) ------------------ */
//request_PoolCreationPermit(walletBuyer, 100, 100, "1", "0.1", fundsProvisionDuration_, poolDuration_, TestERC20Address);


/* Cannot Request Pool with pricePerFraction == 0 ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "0", "0.1", fundsProvisionDuration_, poolDuration_, TestERC20Address);


/* Cannot Request Pool with invalid funding currency ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "1", "0.1", fundsProvisionDuration_, poolDuration_, zeroAddress);


/* Cannot Request Pool with  minFractions > maxFractions ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 101, "1", "0.1", fundsProvisionDuration_, poolDuration_, TestERC20Address);


/* Cannot Request Pool with `poolDuration` > `maxPoolDuration` ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "1", "0.1", fundsProvisionDuration_, maxPoolDuration + 1, TestERC20Address);


/* Cannot Request Pool with `fundsProvisionDuration` > `maxfundsProvisionDuration` ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "1", "0.1", maxFundsProvisionDuration + 1, poolDuration_, TestERC20Address);


/* Cannot Request Pool with `interestRate` < `mininterestRate` ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "1", "0.049", fundsProvisionDuration_, poolDuration_, TestERC20Address);

/* Cannot Request Pool with `interestRate` > `maxinterestRate` ------------------ */
//request_PoolCreationPermit(walletOperator, 100, 100, "1", "0.151", fundsProvisionDuration_, poolDuration_, TestERC20Address);


/* Cannot Validate Pool Request if status of Pool is not `REQUESTED` ------------------ */
//validate_PoolRequest(100, true);
//validate_PoolRequest(100, false);
