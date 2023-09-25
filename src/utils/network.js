import { ethers } from "ethers";

export const getFallbackProvider = (networkId) => {
  let urls;

  if (networkId === 10) {
    // Optimism
    urls = [
      "https://mainnet.optimism.io"
    ]; 
  } else if (networkId === 100) {
    // Gnosis Chain
    urls = [
      "https://rpc.xdaichain.com",
      "https://rpc.gnosischain.com"
    ];
  } else if (networkId === 137) {
    // Polygon PoS Chain
    urls = [
      "https://polygon-rpc.com/"
    ];
  } else if (networkId === 42161) {
    // Arbitrum
    urls = [
      "https://arb1.arbitrum.io/rpc"
    ];
  // +
  } else if (networkId === 19) {
    // Songbird Canary-Network
    urls = [
      "https://rpc.ftso.au/songbird"
    ];
  } else if (networkId === 14) {
    // Flare Mainnet
    urls = [
      "https://flare-api.flare.network/ext/C/rpc"
    ];
  } else if (networkId === 8453) {
    // Flare Mainnet
    urls = [
      "https://rpc.notadegen.com/base"
    ];
  }

  if (urls) {
    const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
    return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
  } else {
    return null;
  }
}
