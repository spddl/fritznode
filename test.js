const fritznode = require('./')
const util = require('util')
const cheerio = require('cheerio')

;(async () => {
  const con = await fritznode.fritz({
    password: '' // TODO: pw
  })

  const data = await con.getOverview()
  console.log(`> ${data.internet.up}, ${data.internet.down}, ${data.internet.txt[1]}`)

  const netCnt = await con.getInetStatCounter()
  const $ = cheerio.load(netCnt)
  const tabel = $('table#tStat > tr')
  if (tabel.length === 0) { console.warn('Not Found'); return }

  const obj = {}
  tabel.each((i, ele) => {
    const td = $(this).find('td')
    let objName = ''
    td.each(() => {
      const datalabel = $(this).attr('datalabel').replace(/Online-Zeit |Datenvolumen /, '')
      if (datalabel === '') {
        objName = $(this).text()
        obj[$(this).text()] = {}
      } else {
        obj[objName][datalabel] = $(this).text()
      }
    })
  })
  console.log(util.inspect(obj, false, null, true))
})()
