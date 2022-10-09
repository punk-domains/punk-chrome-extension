import { getDomainHolder, getDomainDataUrl } from "./utils/resolvers";

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

          chrome.tabs.update(data.tabId, { url: "loading.html" });

          if (
            // etherscan explorers (blockscan)
            url.href.startsWith("https://optimistic.etherscan.io/search?") ||
            url.href.startsWith("https://polygonscan.com/search?") ||
            url.href.startsWith("https://aurorascan.dev/search?") ||
            url.href.startsWith("https://ftmscan.com/search?") ||
            url.href.startsWith("https://etherscan.io/search?") ||
            url.href.startsWith("https://snowtrace.io/search?") ||
            url.href.startsWith("https://gnosisscan.io/search?") ||
            url.href.startsWith("https://bscscan.com/search?") ||
            url.href.startsWith("https://cronoscan.com/search?") ||
            url.href.startsWith("https://bobascan.com/search?") ||
            url.href.startsWith("https://arbiscan.io/search?")
          ) {
            // if so, redirect user to domain owner's address page on block explorer
            getDomainHolder(domainName, tld).then(function(resp) {
              if (resp && resp.startsWith("0x")) {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/address/" + resp });
              } else {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/search?f=0&q=not+found" });
              }
            });
          } else if (url.href.startsWith("https://blockscout.com/xdai/mainnet/search")) {
            // gnosis chain explorer support
            getDomainHolder(domainName, tld).then(function(resp) {
              if (resp && resp.startsWith("0x")) {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/xdai/mainnet/address/" + resp });
              } else {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/search-results?q=not+found" });
              }
            });
          } else if (
            // blockscout
            url.href.startsWith("https://songbird-explorer.flare.network/search")
          ) {
            getDomainHolder(domainName, tld).then(function(resp) {
              if (resp && resp.startsWith("0x")) {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/address/" + resp });
              } else {
                return chrome.tabs.update(data.tabId, { url: "https://" + url.host + "/search-results?q=not+found" });
              }
            });
          } else {
            // otherwise check if user has a URL stored in domain data and redirect there, or redirect to domain page on Punk Domains
            getDomainDataUrl(domainName, tld, result.punkFastMode).then(function(resp) {
              if (resp && resp.startsWith("http")) {
                return chrome.tabs.update(data.tabId, { url: resp });
              } else {
                return chrome.tabs.update(data.tabId, { url: data.url });
              }
            });
          }
        }
      }
    }
  });

});
