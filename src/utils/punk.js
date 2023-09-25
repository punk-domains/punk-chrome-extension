import { ethers } from "ethers";
import { getFallbackProvider } from "./network";
import { getTldInterface } from "./interfaces";

export const getDomainDataUrl = async (domainName, tld, tldAddress, chainId, mode) => {
  let baseUrl = "https://punk.domains";

  if (tld === "klima") {
    baseUrl = "https://www.kns.earth";
  } else if (tld === "smol") {
    baseUrl = "https://smol.domains";
  // +
  } else if (tld === "sgb") {
    baseUrl = "https://sgb.chat";
  } else if (tld === "flr") {
    baseUrl = "https://flr.chat";
  } else if (tld === "basebook") {
    baseUrl = "https://basebook.xyz";
  }
  

  const punkUrl = baseUrl + "/#/domain/"+chainId+"/"+tld+"/"+domainName;

  if (mode === "Normal") {
    try {
      // create TLD contract
      const fProvider = getFallbackProvider(chainId);
      const tldInterface = getTldInterface();
      const tldContract = new ethers.Contract(tldAddress, tldInterface, fProvider);
  
      const domainData = await tldContract.getDomainData(domainName);
  
      if (domainData) {
        const dataObj = JSON.parse(domainData);
  
        if (dataObj.url && dataObj.url.startsWith("http")) {
          return dataObj.url;
        }
      }
  
      return punkUrl;
    } catch (error) {
      return punkUrl;
    }
  } else {
    return punkUrl;
  }
  
}

export const getDomainHolder = async (domainName, tldAddress, chainId) => {

  try {
    // create TLD contract
    const fProvider = getFallbackProvider(chainId);
    const tldInterface = getTldInterface();
    const tldContract = new ethers.Contract(tldAddress, tldInterface, fProvider);

    const domainHolder = await tldContract.getDomainHolder(domainName);

    return domainHolder;
  } catch (error) {
    return "";
  }
  
}
