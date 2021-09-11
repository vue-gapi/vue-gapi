const { fileTree } = require('../reference/config')

function fullPathFromName(fileName) {
  for (const file of fileTree) {
    if (file.name === fileName) {
      return `${fileName}${file.children[0].path}`
    }
  }
}

module.exports = {
  base: '/vue-gapi/',
  title: 'VueGapi',
  description: 'Google API Client Library wrapper for Vue.js',
  plugins: ['@vuepress/plugin-search'],
  themeConfig: {
    navbar: [
      {
        text: 'GitHub',
        link: 'https://github.com/vue-gapi/vue-gapi',
      },
    ],
    sidebar: [
      {
        text: 'Overview',
        link: '/',
      },
      {
        text: 'Examples',
        children: [
          {
            text: 'Authentication',
            link: '/examples/authentication.md',
          },
          {
            text: 'Vue Router',
            link: '/examples/vue-router.md',
          },
        ],
      },
      {
        text: 'Reference',
        children: [
          {
            text: 'install',
            link: '/reference/__index__',
          },
          {
            text: '$gapi',
            link: `/reference/${fullPathFromName('GoogleAuthService')}`,
          },
        ],
      },
    ],
  },
}
