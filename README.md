# How to use

This project requires some familiarity with :

- Typescript: https://www.typescriptlang.org/
- EthersJS: https://docs.ethers.org/v5/
- ts-node: https://www.npmjs.com/package/ts-node
- dotenv: https://www.npmjs.com/package/dotenv


## Setup

- Install typescript compiler : `npm install -g typescript`
- Install TS node : `npm install -g ts-node`
- Copy `.nmprc.example`, paste it to root directory, rename it to `.npmrc` & Add yout GitHub PAT in the `.npmrc` file (***_authToken=<GITHUB_PERSONAL_ACCESS_TOKEN>***)
    - make sure your GitHub account has access to the ***agrifi-pm repo***
- Install dependencies: `yarn install`
- Copy `.env.example`, paste it to root directory, rename it to `.env` & configure the related variables


## How to execute code/scripts 

**To execute a TypeScript file, write in the CLI (in the directory of the file)** :
`ts-node <nameOfTsFile>.ts`

In each demo script sequentially uncomment and execute one function invocation at a time to ensure proper order of execution for the transactions in the blockchain. Since the demos are already executed, if you want to re-execute one, you should provide the correct `poolId` to the functions.
(i.e when `requestPoolCreationPermit()` is executed a new `poolId` is generated)


### Regarding callStatic & Error-handling

- `callStatic` : The callStatic method (provided by EthersJS) is used to call a function on a contract without actually sending a Tx (without modifying the state of the contract and blockchain). This method basically simulates a Tx, thus, **callStatic** in some cases can be used to determine if a Tx will fail or succeed.

- `Error-handling` : When it comes to asynchronous operations, such as fetching data from an API, errors can occur at various stages of the operation. Asynchronous operations typically involve promises, callbacks, or async/await syntax. The **try** and **catch** blocks are particularly useful in these scenarios to handle errors that may arise during asynchronous code execution. Asyncrhonous code should be enclosed within a try {} block and if an error occurs the execution is immediately transferred to the catch block. The catch block is responsible for handling the error by providing an appropriate response or taking corrective action.


## Happy & Unhappy paths 

- **Happy Path** : Pool sucessfully gets paid back and eligible parties receive their funds, fees and upsides

- **Unhappy Path** :

    - I. Pool is not funded. (the most trivial scenario)

    - II. ...TBD...


## Demos & Utils

- `utils`: A Module that exports necessary variables, objects and functions (SDK-wise) to be utilized in the demos
- `demo_HappyPath.ts`: Demo script showcasing a happy path scenario (..TBD..)
- `demo_UnhappyPath_1.ts`: Demo script showcasing an unhappy path scenario (case1). (..TBD..)
- `demo_UnhappyPath_2.ts`: Demo script showcasing an unhappy path scenario (case2). (..TBD..)
