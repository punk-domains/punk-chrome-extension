import { ethers } from "ethers";
import { getFallbackProvider } from "./network";
import { getTldInterface } from "./interfaces";

export const getDomainDataUrl = async (domainName, tld, tldAddress, chainId) => {
  let baseUrl = "https://punk.domains";

  if (tld === "klima") {
    baseUrl = "https://www.kns.earth";
  }

  const punkUrl = baseUrl + "/#/domain/"+chainId+"/"+tld+"/"+domainName;

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
  
}
