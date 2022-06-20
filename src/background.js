import { getDomainDataUrl, getDomainHolder } from "./utils/punk";
import { getTlds } from "./utils/tlds";

chrome.webNavigation.onBeforeNavigate.addListener(function(data) {

  chrome.storage.local.get(['punkExtensionEnabled', 'punkFastMode'], function(result) {
    if (result.punkExtensionEnabled === "Enabled") {
      const url = new URL(data.url);
      const urlParams = new URLSearchParams(url.search);
      const query = urlParams.get('q');

      if (query && query.includes(".") && !query.includes(" ")) {
        const queryParts = query.split(".");

        if (queryParts.length === 2) {
          const domainName = queryParts[0].toLowerCase();
          const tld = "." + queryParts[1].toLowerCase();

          if (Object.keys(getTlds()).includes(tld)) {
            const tldData = getTlds()[tld];

            // check if request comes from a block explorer search
            if (
              url.href.startsWith("https://optimistic.etherscan.io/search?") ||
              url.href.startsWith("https://polygonscan.com/search?") ||
              url.href.startsWith("https://arbiscan.io/search?")
            ) {
              // if so, redirect user to domain owner's address page on block explorer
              getDomainHolder(domainName, tldData.address, tldData.chainId).then(function(resp) {
                if (resp && resp.startsWith("0x")) {
                  return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/address/" + resp });
                }
              });
            } else if (url.href.startsWith("https://blockscout.com/xdai/mainnet/search")) {
              // gnosis chain explorer support
              getDomainHolder(domainName, tldData.address, tldData.chainId).then(function(resp) {
                if (resp && resp.startsWith("0x")) {
                  return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/xdai/mainnet/address/" + resp });
                }
              });
            } else {
              // otherwise check if user has a URL stored in domain data and redirect there, or redirect to domain page on Punk Domains
              getDomainDataUrl(domainName, queryParts[1].toLowerCase(), tldData.address, tldData.chainId, result.punkFastMode).then(function(resp) {
                if (resp && resp.startsWith("http")) {
                  return chrome.tabs.update(data.tabId, { url: resp });
                }
              });
            }
            
          }
        }
      }
    }
  });

});
