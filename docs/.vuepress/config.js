const { fileTree } = require('../config')

function fullPathFromName(fileName) {
  for (const file of fileTree) {
    if (file.name === fileName) {
      return file.children[0].fullPath
    }
  }
}

module.exports = {
  base: '/vue-gapi/',
  title: 'VueGapi',
  description: 'Google API Client Library wrapper for Vue.js',
  themeConfig: {
    sidebarDepth: 4,
    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/vue-gapi/vue-gapi',
      },
    ],
    sidebar: [
      {
        title: 'Overview',
        collapsable: false,
        path: '/',
      },
      {
        title: 'Reference',
        collapsable: false,
        children: [
          ['_index', 'install'],
          [fullPathFromName('GoogleAuthService'), '$gapi'],
        ],
      },
    ],
  },
}
