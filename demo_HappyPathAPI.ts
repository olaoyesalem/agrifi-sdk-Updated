//import  express  from 'express';
const express = require('express');

import type { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

//import bodyParser from 'body-parser';
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
    //txnHash_poolCreationPermit
} from "./shared/utils";

const app = express();
const port = 3000;

app.use(bodyParser.json());

//1.   Define the API endpoint for requesting pool creation permit
app.post('/request-pool-creation-permit', async (req: Request, res: Response) => {
    try {
       
        const { walletAdmin, maxFractions, minFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, TestERC20Address } = req.body;

        // Call the SDK function to request pool creation permit
      const  response =   await request_PoolCreationPermit(walletAdmin, maxFractions, minFractions, pricePerFraction, interestPercentage, fundsProvisionDuration, poolDuration, TestERC20Address);
       
        res.status(200).json({ message: 'requesting pool creation permit successful',
        response:response
        });
    } catch (error) {
         
        console.error('Error requesting pool creation permit:', error);
        res.status(500).json({ error: 'An error occurred while requesting pool creation permit.' });
    }
});

 
app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
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

app.post('/whitelist-buyers', async (req: Request, res: Response) => {
    try {
        // Extract the list of buyers from the request body
        const { buyers } = req.body;

        await whiteList_Accounts(buyers);

        res.status(200).json({ message: 'Buyers whitelisted successfully.' });
    } catch (error) {
        console.error('Error whitelisting buyers:', error);
        res.status(500).json({ error: 'An error occurred while whitelisting buyers.' });
    }
});

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
app.post('/validate-pool-request', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { poolId, isValid } = req.body;

        // Call the SDK function to validate the pool creation request
        await validate_PoolRequest(poolId, isValid);

       
        res.status(200).json({ message: 'Pool creation request validated successfully.' });
    } catch (error) {
         
        console.error('Error validating pool creation request:', error);
        res.status(500).json({ error: 'An error occurred while validating pool creation request.' });
    }
});

 
// app.listen(port, () => {
//     console.log(`API server listening at http://localhost:${port}`);
// });

//Assert -->  
app.get('/read-agrifi-protocol-contract/:poolId', async (req: Request, res: Response) => {
    try {
        // Extract poolId from the request parameters
        const poolId = parseInt(req.params.poolId);

        // Call the SDK function to read data from AgrifiProtocol contract
        const contractData = await read_AgrifiProtocol_Contract(poolId);

        // Send the contract data as the response
        res.status(200).json(contractData);
    } catch (error) {
         
        console.error('Error reading AgrifiProtocol contract data:', error);
        res.status(500).json({ error: 'An error occurred while reading AgrifiProtocol contract data.' });
    }
});



//4.  Define the API endpoint for creating a pool
app.post('/create-pool', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { walletAdmin, poolId } = req.body;

        // Call the SDK function to create the pool
        await create_Pool(walletAdmin, poolId);

       
        res.status(200).json({ message: 'Pool created successfully.' });
    } catch (error) {
         
        console.error('Error creating the pool:', error);
        res.status(500).json({ error: 'An error occurred while creating the pool.' });
    }
});

// Assert ------> Define the API endpoint for reading data from the AgrifiProtocol contract
app.get('/read-agrifi-protocol-contract/:poolId', async (req: Request, res: Response) => {
    try {
     
        const _poolId =parseInt(req.params.poolId);

        const contractData = await read_AgrifiProtocol_Contract(_poolId);

        // Send the contract data as the response
        res.status(200).json(contractData);
    } catch (error) {
         
        console.error('Error reading AgrifiProtocol contract data:', error);
        res.status(500).json({ error: 'An error occurred while reading AgrifiProtocol contract data.' });
    }
});

// Assert ----->  Define the API endpoint for reading the balance of an account
app.get('/read-erc20-balance/:account', async (req: Request, res: Response) => {
    try {
    
        const account = req.params.account;

 
        const balance = await read_test_ERC20Contract(account);

        // Send the balance as the response
        res.status(200).json({ balance });
    } catch (error) {
         
        console.error('Error reading ERC20 balance:', error);
        res.status(500).json({ error: 'An error occurred while reading ERC20 balance.' });
    }
});

// Assert -----> // Define the API endpoint for reading data from the ERC20 contract for an account
app.get('/read-erc20-contract/:account', async (req: Request, res: Response) => {
    try {
    
        const account = req.params.account;

        const contractData = await read_test_ERC20Contract(account, true);

        // Send the contract data as the response
        res.status(200).json(contractData);
    } catch (error) {
         
        console.error('Error reading ERC20 contract data:', error);
        res.status(500).json({ error: 'An error occurred while reading ERC20 contract data.' });
    }
});

 
// app.listen(port, () => {
//     console.log(`API server listening at http://localhost:${port}`);
// });

// 5.  Define the API endpoint for approving ERC20 tokens
app.post('/approve-erc20', async (req: Request, res: Response) => {
    try {
    
        const { walletBuyer, amount } = req.body;

    
        await approve_AGRIFI_ForAmount_Erc20(walletBuyer, amount);

       
        res.status(200).json({ message: 'ERC20 tokens approved successfully.' });
    } catch (error) {
         
        console.error('Error approving ERC20 tokens:', error);
        res.status(500).json({ error: 'An error occurred while approving ERC20 tokens.' });
    }
});


// 6 // Define the API endpoint for purchasing fractions
app.post('/purchase-fractions', async (req: Request, res: Response) => {
    try {

        const { walletBuyer, poolId, fractions } = req.body;

        
        await pruchase_Fractions(walletBuyer, poolId, fractions);

   
        res.status(200).json({ message: 'Fractions purchased successfully.' });
    } catch (error) {
     
        console.error('Error purchasing fractions:', error);
        res.status(500).json({ error: 'An error occurred while purchasing fractions.' });
    }
});

// Assert ---> Define the API endpoint for reading ERC20 token balances
app.get('/read-erc20-balances', async (req: Request, res: Response) => {
    try {
      
        const { accountBuyer, assert } = req.query;

         
        const balances = await read_test_ERC20Contract(accountBuyer?.toString(), assert === 'true');

                res.status(200).json({ balances });
    } catch (error) {
     
        console.error('Error reading ERC20 token balances:', error);
        res.status(500).json({ error: 'An error occurred while reading ERC20 token balances.' });
    }
});

//Assert -----> 
app.get('/read-erc20-contract', async (req: Request, res: Response) => {
    try {
      
        const { Agrifi_Addr } = req.query;

        // Call the SDK function to read ERC20 contract information
        const contractInfo = await read_test_ERC20Contract(Agrifi_Addr?.toString());

        // Send the contract information as the response
        res.status(200).json({ contractInfo });
    } catch (error) {
     
        console.error('Error reading ERC20 contract information:', error);
        res.status(500).json({ error: 'An error occurred while reading ERC20 contract information.' });
    }
});


//Assert ---->

// Define the API endpoint for reading fractions contract information
app.get('/read-fractions-contract', async (req: Request, res: Response) => {
    try {
      
        const { accountBuyer, poolId } = req.query;

        // Ensure accountBuyer is of type string
        const buyerAccount: string = typeof accountBuyer === 'string' ? accountBuyer : '';

        // Parse poolId to an integer
        const parsedPoolId: number = parseInt(poolId as string);

        // Call the SDK function to read fractions contract information
        const fractionsInfo = await read_Fractions_Contract(buyerAccount, parsedPoolId);

        // Send the fractions contract information as the response
        res.status(200).json({ fractionsInfo });
    } catch (error) {
     
        console.error('Error reading fractions contract information:', error);
        res.status(500).json({ error: 'An error occurred while reading fractions contract information.' });
    }
});

//8
// Define the API endpoint for starting the pool and receiving funds
app.post('/start-pool', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { walletAdmin, poolId } = req.body;

        // Call the SDK function to start the pool and receive funds
        await receive_Funds_FromPool(walletAdmin, poolId);

        // Send a success response
        res.status(200).json({ message: 'Pool started and funds received successfully.' });
    } catch (error) {
     
        console.error('Error starting the pool and receiving funds:', error);
        res.status(500).json({ error: 'An error occurred while starting the pool and receiving funds.' });
    }
});

//8.2 / Define the API endpoint for paying back the pool
app.post('/pay-back-pool', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { walletAdmin, poolId, payBackAmount } = req.body;

        // Call the SDK function to pay back the pool
        await payBack_Pool(walletAdmin, poolId, payBackAmount);
 
        // Send a success response
        res.status(200).json({ message: 'Pool paid back successfully.' });
    } catch (error) {
     
        console.error('Error paying back the pool:', error);
        res.status(500).json({ error: 'An error occurred while paying back the pool.' });
    }
});

//9 // Define the API endpoint for setting approval for all fractions
app.post('/set-approval-for-all-fractions', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { walletBuyer } = req.body;

        // Call the SDK function to set approval for all fractions
        await setApproval_ForAll_Fractions(walletBuyer);

        // Send a success response
        res.status(200).json({ message: 'Approval for all fractions set successfully.' });
    } catch (error) {
     
        console.error('Error setting approval for all fractions:', error);
        res.status(500).json({ error: 'An error occurred while setting approval for all fractions.' });
    }
});

//9.1 
app.post('/receive-funds-after-payback', async (req: Request, res: Response) => {
    try {
        // Extract parameters from the request body
        const { walletBuyer, poolId } = req.body;

        // Call the SDK function to allow the buyer to receive funds after payback
        await receive_Funds_After_Payback(walletBuyer, poolId);

        // Send a success response
        res.status(200).json({ message: 'Funds and upsides received after payback successfully.' });
    } catch (error) {
     
        console.error('Error receiving funds after payback:', error);
        res.status(500).json({ error: 'An error occurred while receiving funds after payback.' });
    }
});