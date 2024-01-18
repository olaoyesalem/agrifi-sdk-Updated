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
import { oneMinuteToSecs } from "./shared/constants";
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
// _____________________________________________________________________________________________________________________




/* ========================================================    UNHAPPY PATH SHOWCASE Scenario 1    ======================================================= 

    - Pool is Created (i.e. Requested --> Validated --> Created) but minimum fractions are not purchased by buyers within `fundsProvisionDuration`
      time-window.
    - Because Pool failed to raise enough funds ---> We jump to `NON_FUNDED` state.
    - Buyers (if any) Should be able to receive their funds back
_________________________________________________________________________________________________________________________________________________________*/




/* ======================================   1st Check   ============================================================== */

//read_Fractions_Contract(accountAdmin, 1, true);
//read_test_ERC20Contract(accountBuyer, true);
//read_AgrifiProtocol_Contract(4);
//isWhitelistedAccount(accountOperator);



/* ======================================   TEST SHOWCASE    =================================================== */
const zeroAddress = ethers.constants.AddressZero;
const fundsProvisionDuration_ = oneMinuteToSecs * 3;
const poolDuration_ = oneMinuteToSecs * 10;
const pricePerFraction_ = "1"
const interestPercentage_ = "0.15"

//const poolId_ = 5;
const maxFractions_ = 200;
const minFractions_ = 200;

const fractionsToBuy_ = 150;


// ---------------------------  Txs


/* 
    1. Request Pool Creation (admin or operator) 
        `3` minutes for fundsProvision &  `10` minutes for pool duration
        15% interest (not accounted for at pilot phase)
        price per fraction : 1 ERC20 token (funding currency) 
*/ 
//request_PoolCreationPermit(walletOperator, maxFractions_, minFractions_, pricePerFraction_, interestPercentage_, fundsProvisionDuration_, poolDuration_, TestERC20Address);



/* 2. Whitelist buyers (onlyAdmin) -- No need to whitelist already whitelisted accounts */
//whiteList_Accounts([accountBuyer]);



/* 3. Validate the requested Pool Creation Request (onlyAdmin) */
//validate_PoolRequest(poolId_, true);



/* --------- Assert ------------------------------------ */
//read_AgrifiProtocol_Contract(poolId_);



/* 
    4.  Create the Pool (only designated Pool Operator)
        After this Tx is successful Buyers have a maximum time window of `fundsProvisionDuration` seconds to buy fractions
*/
//create_Pool(walletOperator, poolId_);



/* --------- Assert ------------------------------------ */
//read_AgrifiProtocol_Contract(poolId_);



/* 
    5.  Buyers Approve the AgrifiProtocol for the erc20 respective amount
        Say he wants to buy 150 fractions.. each fraction costs 1 erc20 token (configured at request step (1.))
*/
//approve_AGRIFI_ForAmount_Erc20(walletBuyer, "150");


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountBuyer, true);


/* 6. Buyers purchase fractions */
//pruchase_Fractions(walletBuyer, poolId_, fractionsToBuy_);


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountBuyer, true);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_Fractions_Contract(accountBuyer, poolId_);
//read_AgrifiProtocol_Contract(poolId_);



/* 
  X. -- The Pool didn't raise enough funds to be set as `FUNDED`.
        The Pool cannot start regardless of whether the `FundsProvisionDuration` has already elapsed
        This Tx will revert. 
*/
//receive_Funds_FromPool(walletOperator, poolId_);



/* 7. `jumpToNotFunded()` is called (no access control) */
//jump_NonFunded(walletBuyer, poolId_);


/* --------- Assert ------------------------------------ */
//read_AgrifiProtocol_Contract(poolId_);



/* 8. Buyers able to receive their funds back (their fractions are burnt in return) */

/* 8.1 Buyer approves AgrifiProtocol as operator for their fractions */
//setApproval_ForAll_Fractions(walletBuyer);


/* 9.2 Buyer receives their funds from the `NON_FUNDED` Pool */
//receive_Funds_After_NonFunded(walletBuyer, poolId_);


/* --------- Assert ------------------------------------ */
//read_test_ERC20Contract(accountBuyer, true);
//read_test_ERC20Contract(AgrifiProtocol_Addr);
//read_Fractions_Contract(accountBuyer, poolId_);
//read_AgrifiProtocol_Contract(poolId_);
