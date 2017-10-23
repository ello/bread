const envEl = document.querySelector('meta[name="breadEnv"]')
if (envEl) {
  const webappEnv = JSON.parse(decodeURI(envEl.getAttribute('content')))
  module.exports = {
    OAUTH_CLIENT_ID: webappEnv.OAUTH_CLIENT_ID,
    APP_DEBUG:       webappEnv.APP_DEBUG,
  }
} else {
  module.exports = {
    OAUTH_CLIENT_ID: process.env.REACT_APP_OAUTH_CLIENT_ID,
    APP_DEBUG:       process.env.REACT_APP_DEBUG,
  }
}
