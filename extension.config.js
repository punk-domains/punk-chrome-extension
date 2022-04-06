module.exports = {
  
  manifest: {
    name: 'Punk Domains',
    description: 'This extension allows you to access Web3 domains such as .web3, .ape, .wagmi, etc.',
    version: '1.0',
    manifest_version: 3,
    background: {
      service_worker: 'background.js'
    },
    permissions: [
      "storage",
      'tabs',
      'webNavigation'
    ],
    icons: { 
      100: "logo.png"
    },
    action: {
      default_popup: 'index.html'
    },
  },
  
  entry: {
    main: './src/main.js',
    background: './src/background.js'
  }
  
}