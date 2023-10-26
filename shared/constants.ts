export const maxFundsProvisionDuration = 60 * 60 * 24 * 7; // 1 week
export const minInterestRate = 50000; //ethers.utils.parseUnits('0.05', 6); // 5%
export const maxInterestRate = 150000; //ethers.utils.parseUnits('0.15', 6); // 15%
export const maxPoolDuration = 60 * 60 * 24 * 360; // 1 year
export const startingOrganizationFeePercentage = 20000; // 2 % // ethers.utils.parseUnits('0.02', 6)
export const organizationFeePercentageOnInterest = 50000; // 5 % // ethers.utils.parseUnits('0.05', 6)
export const stuckFundsDuration = 60 * 60 * 24 * 30 * 6; // 6 months


export enum PoolStatus {
    NON_EXISTENT = 0,
    REQUESTED = 1,
    APPROVED = 2,
    REJECTED = 3,
    CREATED = 4,
    FUNDED = 5,
    NOT_FUNDED = 6,
    STARTED = 7,
    CLOSED_BY_PAYBACK = 8,
    RETRIEVED_BY_OPERATOR = 9,
}

// --------- ADDRESSES
export const AgrifiProtocol_Addr = '0x4aDCB6AD7BcDB8963c4598a24D3FCFE73ecd07A5';
export const FundingCurrency_Addr = '0xf15eBb1E72Ae567303418bB2d7945d92256A0946';
export const FractionsContract_Addr = '0x0b9891E8cDfd3dDcfb25a193abdBB6EdA4C539A6';

export const Admin_Addr = '0x43F78b342084e370f10e0Cd07d56d95c1728C9D4';
export const Operator_Addr = '0x881c04BBaF07FC840332DA2Ce055C7d63eA66272';
export const StuckFundsReceiver_Addr = '0x174E2d25C119209384D48223dae048696D2Da314';
export const Buyer_Addr = '0x0546F34f7bA2e53E5DaFd18fb66f164803eBDed7';


// -------------------------------------------------------------------------
export const toronet_testnet_rpc_url = "http://testnet.toronet.org/rpc/";
export const toronet_testnet_chainId = 54321;

