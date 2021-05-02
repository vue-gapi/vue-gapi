const { fileTree } = require('../reference/config')

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
        title: 'Examples',
        collapsable: false,
        children: [
          ['/examples/authentication.md', 'Authentication'],
          ['/examples/vue-router.md', 'Vue Router'],
        ],
      },
      {
        title: 'Reference',
        collapsable: false,
        children: [
          ['/reference/_index', 'install'],
          [`/reference/${fullPathFromName('GoogleAuthService')}`, '$gapi'],
        ],
      },
    ],
  },
}
