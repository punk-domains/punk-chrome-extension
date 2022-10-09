import { ethers } from "ethers";

export const getTldInterface = () => {
  return new ethers.utils.Interface([
    "function getDomainData(string calldata) external view returns(string memory)",
    "function getDomainHolder(string calldata) external view returns(address)"
  ]);
}

export const getResolverInterface = () => {
  return new ethers.utils.Interface([
    "function getDomainData(string calldata, string calldata) external view returns(string memory)",
    "function getDomainHolder(string calldata, string calldata) external view returns(address)"
  ]);
}
