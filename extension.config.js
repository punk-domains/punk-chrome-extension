module.exports = {
  
  manifest: {
    name: 'Punk Domains',
    description: 'This extension allows you to access Web3 domains such as .ape, .wagmi, ".l2", .op", ".smol", etc.',
    version: '1.1',
    manifest_version: 3,
    background: {
      service_worker: 'background.js'
    },
    permissions: [
      "storage",
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