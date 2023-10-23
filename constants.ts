export const maxFundsProvisionDuration = 60 * 60 * 24 * 7; // 1 week
export const minInterestRate = 50000; //ethers.utils.parseUnits('0.05', 6); // 5%
export const maxInterestRate = 150000; //ethers.utils.parseUnits('0.15', 6); // 15%
export const maxPoolDuration = 60 * 60 * 24 * 360; // 1 year
export const startingOrganizationFeePercentage = 20000; // 2 % // ethers.utils.parseUnits('0.02', 6)
export const organizationFeePercentageOnInterest = 50000; // 5 % // ethers.utils.parseUnits('0.05', 6)
export const stuckFundsDuration = 60 * 60 * 24 * 30 * 6; // 6 months