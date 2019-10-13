/**
 * Promise wrapper around simple get.
 */
const debug = require('debug')('fritznode_http')
const simpleget = require('simple-get') // https://www.npmjs.com/package/simple-get
const xml = require('xml2js-parser')

/**
 * Make a http call.
 *
 * @param opt  Used as options for simple get.
 */
const call = async (opt) => {
  return new Promise((resolve, reject) => {
    debug('http ' + opt.method + ' ' + opt.url)
    simpleget.concat(opt, (err, res, data) => {
      if (err) {
        reject(err)
      } else {
        debug('http data ' + data)
        resolve(data)
      }
    })
  })
}
// module.exports.call = async (opt) => {
//   return new Promise((resolve, reject) => {
//     log.trace('http ' + opt.method + ' ' + opt.url)
//     simpleget.concat(opt, (err, res, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         log.trace('http data ' + data)
//         resolve(data)
//       }
//     })
//   })
// }

/**
 * Make a POST call.
 *
 * @param url The target url.
 * @param data The body data.
 */
module.exports.post = async (url, data) => {
  const result = await call({
    method: 'POST',
    url: url,
    body: data
  })
  return result
}

/**
 * Make a POST as form data call.
 *
 * @param url The target url
 * @param data The form data.
 */
module.exports.postForm = async (url, data) => {
  const result = await call({
    method: 'POST',
    url: url,
    form: data
  })
  return result
}

/**
 * Makes a get call.
 *
 * @param url The target url.
 */
module.exports.get = async (url) => {
  const result = await call({
    method: 'GET',
    url: url
  })
  return result
}

/**
 * Executes a http get and returns the xml parsed as object.
 *
 * @param url The target url.
 */
module.exports.getXml = async (url) => {
  let xmlString = await module.exports.get(url)
  return xml.parseStringSync(xmlString)
}
