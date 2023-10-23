import { getSDK, ChainId, ERC20__factory, ERC1155__factory } from "@nexeraprotocol/agrifi-pm-sdk";
import {BigNumber, BigNumberish, BytesLike, ethers} from "ethers";
import { FractionsContract_Interface, TestERC20_Interface } from "./contractsInterfaces";
import dotenv from "dotenv";

dotenv.config();


// -----------------------------------------------------------------------------------------------------
/* 
  Block Explorer for TORONET TestNet https://testnet.toronet.org/ 

  You should be able to check the Txs (and Internal Txs) and Events emited of the related contracts here :

  - AgrifiProtocol : https://testnet.toronet.org/address.html?address=0x4aDCB6AD7BcDB8963c4598a24D3FCFE73ecd07A5



  - ERC1155Fractions Contract: https://testnet.toronet.org/address.html?address=0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6



  - TestERC20 : https://testnet.toronet.org/address.html?address=0xf15eBb1E72Ae567303418bB2d7945d92256A0946

*/
// -------------------------------------------------------------------------------------------------------------------------------


// Create a provider instance (via the infura url endpoint that connects us to the web3 provider)
const provider_test = new ethers.providers.JsonRpcProvider("http://testnet.toronet.org/rpc/", 54321);

// Private Key of accountDeployer (Each Account has its own private KEY)
const privateKeyDeployer = process.env.TORONET_TEST_KEY as BytesLike;



/*  =================================     Accounts Addresses    ============================================================  */

// Deployer's Account Address ---> ADMIN, Organization & TestErc20 Minter 
const accountDeployer = '0x43f78b342084e370f10e0cd07d56d95c1728c9d4';



/*  =============================================   WALLETS   =============================================================  */

// Set Up the Wallets (Signers) 
// We create a Wallet Instance as an EOA, we can sign Txs with the privateKey we provide to the constructor
const walletDeployer = new ethers.Wallet(privateKeyDeployer, provider_test);



// ----------------------------------- Contracts (not `directly` from SDK) -------------------------------------
// You can also query from the AgrifiProtocol (see fractionsContract, and Pool struct storage variables)

const TestERC20Address= '0xf15eBb1E72Ae567303418bB2d7945d92256A0946';

// This contract was deployed with the 1st Successful `requestPoolCreationPermit()` Tx
// You can also query this address from the AgrifiProtocol
const FractionsContractAddress = '0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6';



/* ============================       CONTRACTS INSTANCES     ========================================= */

// Downgraded instances (provider & !signer) only for read operations (no gasFees involved);

//export const erc20_contract = new ethers.Contract(TestERC20Address, TestERC20_Interface, provider_test);
//const erc20_contract = ERC20__factory.connect(TestERC20Address, provider_test);

//const fractions_contract_ = ERC1155__factory.connect(FractionsContractAddress, provider_test); (We need ERC1155MinterGovernedChoice Factory ...)

const erc20_contract = new ethers.Contract(TestERC20Address, TestERC20_Interface, provider_test);

const fractions_contract = new ethers.Contract(FractionsContractAddress, FractionsContract_Interface, provider_test);



/* ________________________________________________________________________________________________________________________ */

/* =======================================               GET SDK           =============================================================== */ 

const getSDKwithSigner = (signer: ethers.Signer | ethers.providers.Provider)  => {
    const sdk = getSDK(54321, signer); // chainID of TORONET testnet is : 54321 (on mainnet::  77777)
    return sdk;
}

/* ________________________________________________________________________________________________________________________ */



/* ========================================      READ  ops       ======================================================== */


const debug_provider = async () => {

    const isProvider = provider_test._isProvider;
    const networkInfo = provider_test.network;
    const networkObj = await provider_test.getNetwork();
    const latestBlock = await provider_test.getBlock("latest");

    console.log("Is Provider:",isProvider);
    console.log("\nNetwork Info:", networkInfo);
    console.log("\nNetwork Object:", networkObj);
    console.log("\nLatest Block is : ", latestBlock);
}



const read_test_ERC20Contract = async (address?: BytesLike, showAllowance?: boolean) => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
    const name: string = await erc20_contract.name();
    const symbol: string = await erc20_contract.symbol();
    const totalSup: BigNumberish = await erc20_contract.totalSupply();
    const decimals: BigNumberish = await erc20_contract.decimals();

    console.log(`\n\nREADING FROM Test_ERC20_CONTRACT ------------------------------------------------------------\n`);

    console.log(`Reading from address -> ${erc20_contract.address} (ERC20 contract)`);
    console.log(`Name of the ERC20 contract is : ${name}\nSymbol is : ${symbol}\nDecimals is : ${decimals}`);
    console.log(`The total supply of the ${name} Smart Contract is : ${ethers.utils.formatEther(totalSup)}`);

    try {
        const isValidFundingCurrenty = await AGRIFI.isFundingCurrency(erc20_contract.address);
        console.log(`\nIs testERC20 ${erc20_contract.address} a valid funding currenty for AGRIFI ${AGRIFI.address}: ${isValidFundingCurrenty}\n`);

    } catch (error: any) {
        console.log(error.message);
    }

    if (address) {
        try {
            const balanceOfAddr = await erc20_contract.balanceOf(address as string);
            console.log(`The balance of account -> ${address} is : ${ethers.utils.formatEther(balanceOfAddr)} ${symbol} erc20 tokens`);
        } catch (error: any) {
            console.log(error.message);
        }   
    }

    if (showAllowance) {
        try {
            const allowance = await erc20_contract.allowance(address as string, AGRIFI.address);
            console.log(`Account --> ${address} has approved AGRIFIProtocol --> ${AGRIFI.address} for total ${ethers.utils.formatEther(allowance)} USDC erc20 tokens`);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}



const read_Fractions_Contract = async (account: string, poolId: BigNumberish, showApproval? : boolean) => {
    // Public variables have getters implicitely (you can call them like functions and query their data)
    const fractionsContractAddrFromAgrifi: string = await getSDKwithSigner(walletDeployer).AgrifiProtocol.fractionsContract();
    
    /*
       ERC1155 (and ERC721) contracts do NOT have a `decimals` parameter because
       every token is a whole unit by itself (each token is non-fungible and exists as a whole or doesn’t.)
       Thus, we do not parse the result                                                                     
    */
    try {
        const totalSupplyOfFractionsForPoolId: BigNumber = await fractions_contract.totalSupply(poolId)
        const balanceOfAccount: BigNumber = await fractions_contract.balanceOf(account, poolId);
        const poolIdExists: boolean = await fractions_contract.exists(poolId);

        console.log(`\n\nREADING FROM FRACTIONS_CONTRACT  ----------------------------------------------------------\n`)
        console.log(`Reading from address -> ${fractions_contract.address} (ERC1155 contract)`);
        console.log(`Does ERC1155 with ID : ${poolId} exist? : ${poolIdExists}`);
        console.log(`Total Supply of ERC1155 tokens with ID : ${poolId} is : ${totalSupplyOfFractionsForPoolId.toNumber()}`);
        console.log(`The balance of account -> ${account} for ID: ${poolId} is : ${balanceOfAccount.toNumber()}  erc1155 tokens`);
    } catch (error: any) {
        console.log(error.message);
    }
  
    if (fractionsContractAddrFromAgrifi === fractions_contract.address) {
      console.log(`\nERC1155Fractions Contract has been created`);
    } else {
      console.log(`\nNo Match:`);
      console.log(`Either  ERC1155 Fractions Contract no yet deployed.. A successfull requestPoolCreationPermit() Tx is needed`);
      console.log(`Or you have wrong hardcoded the address of the ERC1155Fractions Contract`);
    }
    
    if (showApproval) {
        try {
            const isAgrifiApproved: boolean = await fractions_contract
                                  .isApprovedForAll(account, getSDKwithSigner(walletDeployer).AgrifiProtocol.address);

            console.log(`Is AgrifiProtocol approved by Account --> ${account} for all its fractions? : ${isAgrifiApproved}`);
        } catch (error: any) {
            console.log(error.message);
        } 
    }
}


export const read_AgrifiProtocol_Contract = async (poolId?: number) => {
    const AGRIFI = getSDKwithSigner(provider_test).AgrifiProtocol;

    try {
        const fractionsContract: BytesLike = await AGRIFI.fractionsContract(); // if it's zeroAddress we know that no POOL has ever been requested
        const isFundingCurrency: boolean = await AGRIFI.isFundingCurrency(erc20_contract.address);
        const poolCounter: BigNumber = await AGRIFI.poolCount();
        const maxFundsProvisionDuration: BigNumber = await AGRIFI.maxFundsProvisionDuration();
        const minInterestRate: BigNumber = await AGRIFI.minInterestRate();
        const maxInterestRate: BigNumber = await AGRIFI.maxInterestRate();
        const maxPoolDuration: BigNumber = await AGRIFI.maxPoolDuration();
        const startingOrgFeePercentage: BigNumber = await AGRIFI.startingOrganizationFeePercentage();
        const orgFeePercentageOnInterest: BigNumber = await AGRIFI.organizationFeePercentageOnInterest();
        const stuckFundsDuration: BigNumber = await AGRIFI.stuckFundsDuration();

        console.log(`\n\nREADING FROM Agrifirotocol Contract ---------------------------------------------------------------------\n`);

        console.log(`The address of the ERC1155 fractionsContract is --> ${fractionsContract}`);
        console.log(`Is testERC20 a valid funding currency: ${isFundingCurrency}`);
        console.log(`Amount of 'Pools' that the Protocol has generated: ${poolCounter}`);

        console.log(`\nCrucial parameters of Agrifi Protocol---------------------------------------`);
        
        console.log(`\nTime-based parameters.................................`);
        /*
        console.log(`MaxFundsProvisionDuration:\t\t ${maxFundsProvisionDuration}`);
        console.log(`MaxBuybackDuration:\t\t\t ${maxBuybackDuration} seconds`);
        console.log(`MarginCallPeriod:\t\t\t ${marginCallPeriod}`);
        console.log(`AcceptedPeriodBetweenMarginCalls:\t ${acceptedPeriodBetweenMarginCalls}`); */
        
        console.log(`MaxFundsProvisionDuration:\t\t ${maxFundsProvisionDuration} seconds or ${maxFundsProvisionDuration.toNumber()/3600} hours or ${maxFundsProvisionDuration.toNumber()/(3600*24)} days`);
        console.log(`maxPoolDuration:\t\t\t ${maxPoolDuration} seconds or ${maxPoolDuration.toNumber()/3600} hours or ${maxPoolDuration.toNumber()/(3600*24)} days`);
        console.log(`stuckFundsDuration:\t\t\t ${stuckFundsDuration} seconds or ${stuckFundsDuration.toNumber()/3600} hours or ${stuckFundsDuration.toNumber()/(3600*24)} days`);

        console.log(`\nFees Percentages & Rates...............................`);
        console.log(`MinInterestRate: ${(minInterestRate.toNumber()/1_000_000) * 100} %`);
        console.log(`MaxInterestRate: ${(maxInterestRate.toNumber()/1_000_000) * 100} %`);
        console.log(`startingOrgFeePercentage: ${startingOrgFeePercentage.toNumber()/1_000_000 * 100} %`);
        console.log(`orgFeePercentageOnInterest: ${(orgFeePercentageOnInterest.toNumber()/1_000_000) * 100} %`);
    } catch (error: any) {
        console.log(error.message);
    }

    if (poolId) {
        try {
            const poolStruct = await AGRIFI.pools(poolId);
            const poolMonetaryInfoStruct = await AGRIFI.poolsMonetaryInfo(poolId);
            console.log(`\nReading Pool with ID == ${poolId} -------------------------------------------------`);
            console.log(`Operator is --> ${poolStruct[9]}`);
            console.log(`MetaNFT iD associated with Pool_${poolId} is: ${poolStruct[7]}`);
            console.log(`Pool of poolID:${poolId} status is ${poolStruct[5]}`);
            console.log(`Funding Currency of Pool --> poolID:${poolId} is ${poolStruct[0]}`);
            console.log(`Funds Provision Duration of Pool--> poolID:${poolId} is ${poolStruct[1]}`);
            console.log(`Duration of Pool--> poolID:${poolId} is ${poolStruct[2]}`);
            console.log(`Stuck Funds Timestamp of Pool--> poolID:${poolId} is ${poolStruct[6]}`);
            console.log(`Starting Timestamp of Pool--> poolID:${poolId} is ${poolStruct[3]}`);
            console.log(`Ending Timestamp of Pool--> poolID:${poolId} is ${poolStruct[4]}`);

            console.log(`Max Fractions of Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[0]}`);
            console.log(`Min Fractions of Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[1]}`);
            console.log(`Price per Fraction of Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[2]}`);
            console.log(`Total funds Provided to Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[3]}`);
            console.log(`Fractions purchased from Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[7]}`);
            console.log(`Fractions redeemed from Pool--> poolID:${poolId} is ${poolMonetaryInfoStruct[8]}`);
         
        } catch (error: any) {
            console.log(error.message);
        }
    }
}



/* ========================================================    WRITE OPs   ======================================================================= */

export const mint_TestERC20_toAccount = async (account: string, amount: string) => {
    const erc20contract = erc20_contract.connect(walletDeployer);

    try {
      const balanceBefore: BigNumber = await erc20contract.balanceOf(account);
  
      console.log("\nBalances before Minting-----------------------------------------------------");
      console.log(`\nBalance of Account --> ${account} is: ${ethers.utils.formatEther(balanceBefore)} test USDC ERC20 tokens`);
  
      console.log(`\n..............    Miniting    ...............`);
    
      const txRes: ethers.providers.TransactionResponse = await erc20contract.mint(account, ethers.utils.parseEther(amount));
      const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
      if (txRec.status == 1) {
        const balanceAfter: BigNumber = await erc20contract.balanceOf(account);
  
        console.log("\nBalances after Minting-----------------------------------------------------");
        console.log(`\nBalance of Account --> ${account} is: ${ethers.utils.formatEther(balanceAfter)} test USDC ERC20 tokens`);
      }

    } catch (error: any) {
      console.log(error.reason); 
    }
}


export const approve_AGRIFI_ForAmount_Erc20 = async (wallet: ethers.Wallet, amount: string) => {
    const AGRIFIaddr = getSDKwithSigner(wallet).AgrifiProtocol.address;
    const erc20contract = erc20_contract.connect(wallet);
    console.log(`\n--------------------------   APPROVAL: ALLOWANCE -------------------------------------`);
    console.log(`\nAccount --> ${wallet.address}\napproves AgrifiProtocol--> ${AGRIFIaddr}`);
    console.log(`for for ${amount} erc20 tokens --> ${erc20contract.address}`);

    try {
      const txRes: ethers.providers.TransactionResponse = await erc20contract.approve(AGRIFIaddr, ethers.utils.parseEther(amount));
      const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
      if (txRec.status == 1) {
        console.log('Tx succeeded');
      } 

    } catch (error: any) {
      console.log(error.reason);
    }
}

export const setApproval_ForAll_Fractions = async (wallet: ethers.Wallet) => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
    const fractionsContractAddress: string = await AGRIFI.fractionsContract();
  
    const fractionContract = new ethers.Contract(fractionsContractAddress, FractionsContract_Interface, provider_test);
  
    const contract = fractionContract.connect(wallet);
  
    console.log(`${wallet.address} Approving AgrifiProtocol for All fractions (erc1155).............................`);
    console.log(`Fractions Contract --> ${fractionsContractAddress}`);

    try {
      const txRes: ethers.providers.TransactionResponse = await contract.setApprovalForAll(AGRIFI.address, true);
  
      const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
      if (txRec.status == 1) {
        const txLogs = txRec.logs;
        console.log('Tx Succeeded');
      } 

    } catch (error: any) {
      console.log(error.reason);
    }
}

// -------------------------        Whitelisting OPs  -----------------------------------

const whiteList_Accounts_Static = async (
    addrToWhitelist: string[]
): Promise<boolean> => {
  
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.addUsersToWhitelist(addrToWhitelist);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}
  
  
export const whiteList_Accounts = async (addrToWhitelist: string[]) => {
  
    const status = await whiteList_Accounts_Static(addrToWhitelist);
  
    if (status) {
        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
        try {
  
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.addUsersToWhitelist(
                addrToWhitelist
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            } 
  
        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const remove_Accounts_FromWhitelist_Static = async (
    addrToRemoveFromWhitelist: string[]
): Promise<boolean> => {

    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.removeUsersFromWhitelist(addrToRemoveFromWhitelist);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const remove_Accounts_FromWhitelist = async (addrToRemoveFromWhitelist: string[]) => {

    const status = await remove_Accounts_FromWhitelist_Static(addrToRemoveFromWhitelist);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.removeUsersFromWhitelist(
                addrToRemoveFromWhitelist
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



const grant_Operator_Role_Static = async (address: string): Promise<boolean> => {

    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.grantOperatorRole(address);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const grant_Operator_Role = async (address: string) => {

    const status = await grant_Operator_Role_Static(address);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.grantOperatorRole(
                address
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________

const revoke_Operator_Role_Static = async (address: string): Promise<boolean> => {

    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.revokeOperatorRole(address);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const revoke_Operator_Role = async (address: string) => {

    const status = await revoke_Operator_Role_Static(address);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.revokeOperatorRole(
                address
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________

const update_Pool_Operator_Static = async (poolId: BigNumberish, newOperatorAddr: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.updatePoolOperator(poolId, newOperatorAddr);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const update_Pool_Operator = async (poolId: BigNumberish, newOperatorAddr: string) => {

    const status = await update_Pool_Operator_Static(poolId, newOperatorAddr);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.updatePoolOperator(
                poolId,
                newOperatorAddr
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const set_StuckFundsReceiver_Static = async (address: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.setStuckFundsReceiverAddress(address);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const set_StuckFundsReceiver = async (address: string) => {

    const status = await set_StuckFundsReceiver_Static(address);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.setStuckFundsReceiverAddress(
                address
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const add_Funding_Currency_Static = async (fundingCurrencyAddr: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.addFundingCurrency(fundingCurrencyAddr);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const add_Funding_Currency = async (fundingCurrencyAddr: string) => {

    const status = await add_Funding_Currency_Static(fundingCurrencyAddr);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.addFundingCurrency(
                fundingCurrencyAddr
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const remove_FundingCurrency_Static = async (fundingCurrencyAddr: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.removeFundingCurrency(fundingCurrencyAddr);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const remove_FundingCurrency = async (fundingCurrencyAddr: string) => {

    const status = await remove_FundingCurrency_Static(fundingCurrencyAddr);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.removeFundingCurrency(
                fundingCurrencyAddr
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


// ================================================== PARAMETERS CHANGE


const change_MaxFundsProvisionDuration_Static = async (duration: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeMaxFundsProvisionDuration(duration);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const change_MaxFundsProvisionDuration = async (duration: BigNumberish) => {

    const status = await change_MaxFundsProvisionDuration_Static(duration);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeMaxFundsProvisionDuration(
                duration
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const change_MinInterestRate_Static = async (rate: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeMinInterestRate(ethers.utils.parseUnits(rate, 6));
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const change_MinInterestRate = async (rate: string) => {

    const status = await change_MinInterestRate_Static(rate);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeMinInterestRate(
                ethers.utils.parseUnits(rate, 6)
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const change_MaxInterestRate_Static = async (rate: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeMaxInterestRate(ethers.utils.parseUnits(rate, 6));
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const change_MaxInterestRate = async (rate: string) => {

    const status = await change_MaxInterestRate_Static(rate);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeMaxInterestRate(
                ethers.utils.parseUnits(rate, 6)
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const change_MaxPoolDuration_Static = async (duration: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeMaxPoolDuration(duration);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const change_MaxPoolDuration = async (duration: BigNumberish) => {

    const status = await change_MaxPoolDuration_Static(duration);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeMaxPoolDuration(
                duration
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const change_StartingOrganizationFeePercentage_Static = async (percentage: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeStartingOrganizationFeePercentage(ethers.utils.parseUnits(percentage, 6));
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const change_StartingOrganizationFeePercentage = async (percentage: string) => {

    const status = await change_StartingOrganizationFeePercentage_Static(percentage);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeStartingOrganizationFeePercentage(
                ethers.utils.parseUnits(percentage, 6)
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const change_OrganizationFeePercentageOnInterest_Static = async (percentage: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeOrganizationFeePercentageOnInterest(ethers.utils.parseUnits(percentage, 6));
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const change_OrganizationFeePercentageOnInterest = async (percentage: string) => {

    const status = await change_OrganizationFeePercentageOnInterest_Static(percentage);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeOrganizationFeePercentageOnInterest(
                ethers.utils.parseUnits(percentage, 6)
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



const change_StuckFundsDuration_Static = async (duration: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.changeStuckFundsDuration(duration);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const change_StuckFundsDuration = async (duration: BigNumberish) => {

    const status = await change_StuckFundsDuration_Static(duration);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.changeStuckFundsDuration(
                duration
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



// ================================================== POOL CREATION REQUEST & VALIDATION


const request_PoolCreationPermit_Static = async (
    wallet: ethers.Wallet,
    maxAmountOfFractions: BigNumberish,
    minAmountOfFractions: BigNumberish,
    pricePerFraction: string,
    interestPercentage: string,
    fundsProvisionDuration: BigNumberish,
    poolDuration: BigNumberish,
    fundingCurrency: string
): Promise<boolean> => {

    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.requestPoolCreationPermit(
            maxAmountOfFractions,
            minAmountOfFractions,
            ethers.utils.parseEther(pricePerFraction),
            ethers.utils.parseUnits(interestPercentage, 6),
            fundsProvisionDuration,
            poolDuration,
            fundingCurrency
        );
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}


export const request_PoolCreationPermit = async (
    wallet: ethers.Wallet,
    maxAmountOfFractions: BigNumberish,
    minAmountOfFractions: BigNumberish,
    pricePerFraction: string,
    interestPercentage: string,
    fundsProvisionDuration: BigNumberish,
    poolDuration: BigNumberish,
    fundingCurrency: string
) => {

    const status = await request_PoolCreationPermit_Static(
        wallet,
        maxAmountOfFractions,
        minAmountOfFractions,
        pricePerFraction,
        interestPercentage,
        fundsProvisionDuration,
        poolDuration,
        fundingCurrency
    );

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.requestPoolCreationPermit(
                maxAmountOfFractions,
                minAmountOfFractions,
                ethers.utils.parseEther(pricePerFraction),
                ethers.utils.parseUnits(interestPercentage, 6),
                fundsProvisionDuration,
                poolDuration,
                fundingCurrency
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



const validate_PoolRequest_Static = async (poolId: BigNumberish, approved: boolean): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.validatePoolRequest(poolId, approved);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const validate_PoolRequest = async (poolId: BigNumberish, approved: boolean) => {

    const status = await validate_PoolRequest_Static(poolId, approved);

    if (status) {

        const AGRIFI = getSDKwithSigner(walletDeployer).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.validatePoolRequest(
                poolId,
                approved
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const create_Pool_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.createPool(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const create_Pool = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await create_Pool_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.createPool(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const pruchase_Fractions_Static = async (wallet: ethers.Wallet, poolId: BigNumberish, fractionsAmount: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.purchase(poolId, fractionsAmount);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const pruchase_Fractions = async (wallet: ethers.Wallet, poolId: BigNumberish, fractionsAmount: BigNumberish) => {

    const status = await pruchase_Fractions_Static(wallet, poolId, fractionsAmount);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.purchase(
                poolId,
                fractionsAmount
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



const receive_Funds_FromPool_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.receiveFundsFromPool(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const receive_Funds_FromPool = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await receive_Funds_FromPool_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.receiveFundsFromPool(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}


// _____________________________________________________________________________________________________________________


const jump_NonFunded_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.jumpToNonFunded(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const jump_NonFunded = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await jump_NonFunded_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.jumpToNonFunded(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const payBack_Pool_Static = async (wallet: ethers.Wallet, poolId: BigNumberish, payBackAmount: string): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.payBack(poolId, ethers.utils.parseEther(payBackAmount));
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const payBack_Pool = async (wallet: ethers.Wallet, poolId: BigNumberish, payBackAmount: string) => {

    const status = await payBack_Pool_Static(wallet, poolId, payBackAmount);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.payBack(
                poolId,
                ethers.utils.parseEther(payBackAmount)
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________



const receive_Funds_After_Payback_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.receiveFundsAfterPayback(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const receive_Funds_After_Payback = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await receive_Funds_After_Payback_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.receiveFundsAfterPayback(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const receive_Funds_After_NonFunded_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.receiveFundsAfterNonFunded(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const receive_Funds_After_NonFunded = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await receive_Funds_After_NonFunded_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.receiveFundsAfterNonFunded(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


const retrieve_Stuck_Funds_Static = async (wallet: ethers.Wallet, poolId: BigNumberish): Promise<boolean> => {
    const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;
  
    try {
  
        await AGRIFI.callStatic.retrieveStuckFunds(poolId);
  
    } catch (error: any) {
        console.log(`\nTx Failed with Error: ${error.reason}`);
        return false;
    }
  
    return true;
}

export const retrieve_Stuck_Funds = async (wallet: ethers.Wallet, poolId: BigNumberish) => {

    const status = await retrieve_Stuck_Funds_Static(wallet, poolId);

    if (status) {

        const AGRIFI = getSDKwithSigner(wallet).AgrifiProtocol;

        try {
            
            const txRes: ethers.providers.TransactionResponse = await AGRIFI.retrieveStuckFunds(
                poolId
            );
  
            const txRec: ethers.providers.TransactionReceipt = await txRes.wait();
  
            if (txRec.status == 1) {
                console.log(`\nTx Succeded`);
            }  

        } catch (error: any) {
            console.log(`\nTx failed:\n ${error?.["message"]}`);
            console.log(`\nHash of failed Tx: ${error?.transactionHash}`);
        }
    }
}

// _____________________________________________________________________________________________________________________


/* ======================================   1st Check   ============================================================== */

//debug_provider();
read_Fractions_Contract(accountDeployer, 1, true);
//read_test_ERC20Contract(accountDeployer, true);
//read_AgrifiProtocol_Contract(1);


/* ======================================   SHOWCASE    =================================================== */

// --------------------------- Reverts
const zeroAddress = ethers.constants.AddressZero;

//set_StuckFundsReceiver(zeroAddress);
//grant_Operator_Role(zeroAddress);
//update_Pool_Operator(1, zeroAddress);
//whiteList_Accounts([zeroAddress]);
//remove_Accounts_FromWhitelist([]);
//add_Funding_Currency(zeroAddress);
//remove_FundingCurrency(accountDeployer);
//change_MaxFundsProvisionDuration(0);
//change_MinInterestRate("0");
//change_MaxInterestRate("0");
//change_MaxPoolDuration(0);
//change_StartingOrganizationFeePercentage("1");
//change_OrganizationFeePercentageOnInterest("1");
//change_StuckFundsDuration(100);


// --------------------------- Admin-wise Txs

//request_PoolCreationPermit(walletDeployer, 500, 200, "1", "0.15", 600, 1200, TestERC20Address);