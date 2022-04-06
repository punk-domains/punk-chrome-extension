import { ethers } from "ethers";

export const getTldInterface = () => {
  return new ethers.utils.Interface([
    "function getDomainData(string calldata) public view returns(string memory)"
  ]);
}
