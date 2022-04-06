//import { ethers } from "ethers";
//import { getFallbackProvider } from "./utils/network";
import { getTlds } from "./utils/tlds";

chrome.webNavigation.onBeforeNavigate.addListener(function(data) {

  chrome.storage.local.get(['punkExtensionEnabled'], function(result) {
    if (result.punkExtensionEnabled === "Enabled") {
      const url = new URL(data.url);
      const urlParams = new URLSearchParams(url.search);
      const query = urlParams.get('q');

      if (query && query.includes(".") && !query.includes(" ")) {
        const queryParts = query.split(".");

        if (queryParts.length === 2) {
          const tld = "." + queryParts[1];

          if (Object.keys(getTlds()).includes(tld)) {
            const tldData = getTlds()[tld];
            
            let baseUrl = "https://punk.domains";

            if (tld === ".klima") {
              baseUrl = "https://www.kns.earth";
            }

            chrome.tabs.update(data.tabId, { url: baseUrl+"/#/domain/"+tldData.chainId+"/"+queryParts[1]+"/"+queryParts[0] })

            // TODO: check if URL is in domain data and redirect there if it is
            //const provider = getFallbackProvider(tldData.chainId);
          }
        }
      }
    }
  });

});
