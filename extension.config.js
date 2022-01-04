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
      16: "logo16.png",
      48: "logo48.png",
      128: "logo128.png" 
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