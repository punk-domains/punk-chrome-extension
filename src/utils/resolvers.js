import { ethers } from "ethers";
import { getFallbackProvider } from "./network";
import { getResolverInterface, getTldInterface } from "./interfaces";
import { getTlds } from "./tlds";

const getResolvers = {
  1: "0x7e8aB50697C7Abe63Bdab6B155C2FB8D285458cB",
  10: "0xF20fc12a4955c9d47194B8fEd591Fe01777D2b06",
  19: "0x7e8aB50697C7Abe63Bdab6B155C2FB8D285458cB",
  56: "0x4aBf8b364ac4aF048Ea077AAA2EDF3e1e1EC0f9c",
  100: "0x7Df67B2ef4eEDf49Fc53Bb6E94e90e9546FC6c6B",
  137: "0x07884566cdED43eDaec7813C1523624202b060D3",
  42161: "0xd64A2DF9d73CD1Cb50139A3eC3176070e00C67cA"
}

export const getDomainDataUrl = async (domainName, tldName, mode) => {
  let punkUrl = "https://punk.domains";

  if (tldName === ".klima") {
    punkUrl = "https://www.kns.earth";
  } else if (tldName === ".ppl") {
    punkUrl = "https://ppl.domains";
  } else if (tldName === ".sgb" || tldName === ".songbird") {
    punkUrl = "https://songbird.domains";
  } else if (tldName === ".wildbunch") {
    punkUrl = "https://twb.punk.domains";
  }

  if (mode === "Normal") {
    // check tlds.json for address
    if (Object.keys(getTlds()).includes(tldName)) {
      try {
        const tldData = getTlds()[tldName];

        punkUrl = punkUrl + "/#/domain/"+tldData.chainId+"/"+tldName.replace(".", "")+"/"+domainName;

        const fProvider = getFallbackProvider(tldData.chainId);
        const tldContract = new ethers.Contract(tldData.address, getTldInterface(), fProvider);
        
        const domainData = await tldContract.getDomainData(domainName);
  
        if (domainData) {
          const dataObj = JSON.parse(domainData);
    
          if (dataObj.url && dataObj.url.startsWith("http")) {
            return dataObj.url;
          }
        }
        
        return punkUrl;
      } catch (error) {
        return null;
      }
    } else {
      // if not found, loop through all resolvers to check
      for (let resolver in getResolvers) {
        try {
          const fProvider = getFallbackProvider(Number(resolver));
          const resolverContract = new ethers.Contract(getResolvers[resolver], getResolverInterface(), fProvider);
          
          const domainHolder = await resolverContract.getDomainHolder(domainName, tldName);

          if (String(domainHolder) !== "0x0000000000000000000000000000000000000000") {
            const domainData = await resolverContract.getDomainData(domainName, tldName);
    
            if (domainData) {
              const dataObj = JSON.parse(domainData);
        
              if (dataObj.url && dataObj.url.startsWith("http")) {
                return dataObj.url;
              } else {
                punkUrl = punkUrl + "/#/domain/"+tldData.chainId+"/"+tldName.replace(".", "")+"/"+domainName;
              }
            } else {
              punkUrl = punkUrl + "/#/domain/"+tldData.chainId+"/"+tldName.replace(".", "")+"/"+domainName;
            }
          }
        } catch {
          continue;
        }
      }
    }

    // if still nothing, return null
    return null;
  } else {
    const tldData = getTlds()[tldName];

    if (tldData) {
      punkUrl = punkUrl + "/#/domain/"+tldData.chainId+"/"+tldName.replace(".", "")+"/"+domainName;
      return punkUrl;
    }

    return null;
  }
}

export const getDomainHolder = async (domainName, tldName) => {
  // check tlds.json for address
  if (Object.keys(getTlds()).includes(tldName)) {
    try {
      const tldData = getTlds()[tldName];
      const fProvider = getFallbackProvider(tldData.chainId);
      const tldContract = new ethers.Contract(tldData.address, getTldInterface(), fProvider);
      const domainHolder = await tldContract.getDomainHolder(domainName);

      if (String(domainHolder) === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      
      return domainHolder;
    } catch (error) {
      return null;
    }
  } else {
    // if not found, loop through all resolvers to check
    for (let resolver in getResolvers) {
      try {
        const fProvider = getFallbackProvider(Number(resolver));
        const resolverContract = new ethers.Contract(getResolvers[resolver], getResolverInterface(), fProvider);

        const domainHolder = await resolverContract.getDomainHolder(domainName, tldName);

        if (String(domainHolder) !== "0x0000000000000000000000000000000000000000") {
          return domainHolder;
        }
      } catch {
        continue;
      }
    }

    // if still nothing, return empty response
    return null;
  }

  return null;
}