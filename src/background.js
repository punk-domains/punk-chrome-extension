import { ethers } from "ethers";

console.log("background.js file here!!!");

const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com");

const blockNumber = await provider.getBlockNumber();
console.log("block number: " + blockNumber);

chrome.webNavigation.onBeforeNavigate.addListener(function(data) {
  
  if (data.url.includes("q=tempe.punk")) {
    console.log("PUNK!!!")
    chrome.tabs.update(data.tabId, { url: "https://www.ethereum.org" })
  }
    
});
