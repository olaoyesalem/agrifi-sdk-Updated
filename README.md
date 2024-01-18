# SDK demo for AgrifiProtocol

This project demonstrates the utilization of the agrifi-pm-sdk package, a TypeScript SDK designed for secure interaction with AgrifiProtocol Smart Contract.

The main feature exported from the module is the `getSDK` typescript function.

```typescript
// Import the module
import { getSDK } from "@nexeraprotocol/agrifi-pm-sdk";

// Define the 'chainId' and 'signer' variables as per your network configuration

// Get the sdk object configured with `chainId` of the network & a Signer connected to that network 
const sdk = getSDK(chainId, signer);

// Access the on-chain Smart Contract instance connected with the Signer
const AgrifiProtocol_OnChain_Contract_Instance = sdk.AgrifiProtocol;
```


## How to use

This project requires some familiarity with :

- Typescript: https://www.typescriptlang.org/
- EthersJS: https://docs.ethers.org/v5/
- ts-node: https://www.npmjs.com/package/ts-node
- dotenv: https://www.npmjs.com/package/dotenv


### Setup

- Install typescript compiler : `npm install -g typescript` or `yarn global add typescript`
- Install TS node : `npm install -g ts-node` or `yarn global add ts-node`
- Copy `.nmprc.example`, paste it into the root directory, rename it to `.npmrc` & Add yout GitHub PAT in the `.npmrc` file (***_authToken=<GITHUB_PERSONAL_ACCESS_TOKEN>***)
    - make sure your GitHub account has access to the **Agrifi-PM** repo
- Install dependencies: `yarn install` or `npm install`
- Copy `.env.example`, paste it into the root directory, rename it to `.env` & configure the related variables


### How to execute code/scripts 

**To execute a TypeScript file, write in the CLI (in the directory of the file)** :
`ts-node <nameOfTsFile>.ts`

In each demo script sequentially uncomment and execute one function invocation at a time to ensure proper order of execution for the transactions in the blockchain. Since the demos are already executed, if you want to re-execute one, you should provide the correct `poolId` to the functions.
(i.e when `requestPoolCreationPermit()` is executed a new `poolId` is generated)


## Regarding callStatic & Error-handling

- `callStatic` : The `callStatic` method (provided by EthersJS) is used to call a function on a contract without actually sending a Tx (without modifying the state of the contract and blockchain). This method basically simulates a Tx, thus, **callStatic** in some cases can be used to determine if a Tx will fail or succeed.

- `Error-handling` : When it comes to asynchronous operations, such as fetching data from an API, errors can occur at various stages of the operation. Asynchronous operations typically involve promises, callbacks, or async/await syntax. The **try** and **catch** blocks are particularly useful in these scenarios to handle errors that may arise during asynchronous code execution. Asyncrhonous code should be enclosed within a try {} block and if an error occurs the execution is immediately transferred to the catch block. The catch block is responsible for handling the error by providing an appropriate response or taking corrective action.


## Happy & Unhappy paths 

- **Happy Path** : Pool sucessfully gets paid back and eligible parties receive their funds, fees and upsides respectively
    - `startingOrgFeePercentage` == 2% &rarr; At `receiveFundsFromPool()` 2% of total Provided amount is transferred to org. The rest is transferred to Operator. For example, if 500 fractions are purchased with price per fraction == 1 erc20 token, then when Pool starts, 500 * 0.02 == 10 erc20 tokens are transferred to Org.
    - `orgFeePercentageOnInterest == 5%` &rarr; At `payBack()` if **payBackAmount > totalAmountProvided**, then the org takes 5% of the upside. For example, if totalAmountProvided == 500 erc20 tokens, and payBackAmount == 600 erc20 tokens, then when Pool gets `CLOSED_BY_PAYBACK`, (600-500)*0.05 == 5 erc20 tokens are transferred to Org.

- **Unhappy Path** :

    - I. Pool is not funded. (the most trivial scenario). MinFractions are not purchased within the `fundsProvisionDuration` time-window.

    - II. ...TBD...


## Demos & Utils

- `shared/utils.ts`: A Module that exports necessary variables, objects and functions (SDK-wise) to be utilized in the demos
- `demo_HappyPath.ts`: Demo script showcasing a happy path scenario
- `demo_UnhappyPath_1.ts`: Demo script showcasing an unhappy path scenario (case1).
- `demo_UnhappyPath_2.ts`: Demo script showcasing an unhappy path scenario (case2). (..TBD..)
