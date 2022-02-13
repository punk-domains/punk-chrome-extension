module.exports = {
  
  manifest: {
    name: 'Web3Panda Domains',
    description: 'This extension allows you to access Web3 domains such as .panda, .web3, etc.',
    version: '1.0',
    manifest_version: 3,
    background: {
      service_worker: 'background.js'
    },
    permissions: [
      'webNavigation',
      'tabs'
    ],
    icons: { 
      16: "panda500.png",
      48: "panda500.png",
      128: "panda500.png" 
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