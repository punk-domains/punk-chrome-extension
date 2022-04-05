//import { ethers } from "ethers";
//import { getFallbackProvider } from "./utils/network";
import { getTlds } from "./utils/tlds";

chrome.webNavigation.onBeforeNavigate.addListener(function(data) {
  const url = new URL(data.url);
  const urlParams = new URLSearchParams(url.search);
  const query = urlParams.get('q');

  if (query && query.includes(".") && !query.includes(" ")) {
    const queryParts = query.split(".");

    if (queryParts.length === 2) {
      if (Object.keys(getTlds()).includes("."+queryParts[1])) {
        const tldData = getTlds()["."+queryParts[1]];
        chrome.tabs.update(data.tabId, { url: "https://punk.domains/#/domain/"+tldData.chainId+"/"+queryParts[1]+"/"+queryParts[0] })

        // TODO: check if URL is in domain data and redirect there if it is
        //const provider = getFallbackProvider(tldData.chainId);
      }
    }
  }
});
