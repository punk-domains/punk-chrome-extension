import { ethers } from "ethers";

export const getFallbackProvider = (networkId) => {
  let urls;

  if (networkId === 1) {
    // Ethereum
    urls = [
      "https://eth-rpc.gateway.pokt.network"
    ]; 
  } else if (networkId === 10) {
    // Optimism
    urls = [
      "https://mainnet.optimism.io"
    ]; 
  } else if (networkId === 16) {
    // Flare
    urls = [
      "https://coston-api.flare.network/ext/bc/C/rpc"
    ];
  } else if (networkId === 19) {
    // Songbird
    urls = [
      "https://songbird-api.flare.network/ext/C/rpc"
    ];
  } else if (networkId === 25) {
    // Cronos
    urls = [
      "https://evm.cronos.org"
    ];
  } else if (networkId === 56) {
    // BSC
    urls = [
      "https://bscrpc.com"
    ];
  } else if (networkId === 100) {
    // Gnosis Chain
    urls = [
      "https://rpc.gnosischain.com"
    ];
  } else if (networkId === 137) {
    // Polygon PoS Chain
    urls = [
      "https://polygon-rpc.com/"
    ];
  } else if (networkId === 288) {
    // Boba Ethereum
    urls = [
      "https://mainnet.boba.network"
    ];
  } else if (networkId === 42161) {
    // Arbitrum
    urls = [
      "https://arb1.arbitrum.io/rpc"
    ];
  } else if (networkId === 1313161554) {
    // Aurora
    urls = [
      "https://mainnet.aurora.dev"
    ];
  }

  if (urls) {
    const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
    return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
  } else {
    return null;
  }
}