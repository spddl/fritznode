Fritz Node
======================================
Uses node.js to access the fritz box with a minimal set of external dependencies. 
 

API calls provided
------------------

- getDeviceList

Returns active and inactive network devices known to the box.

- getBandwithUsage

Returns the current download and upload rate.

- getInetStatCounter

Returns the Traffic Monitor.

Example:
```javascript
const fritznode = require('fritznode')
const util = require('util')
const cheerio = require('cheerio')

const run = async () => {
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
}
run()
```

Produces
```json
> ↑ 31,3 Mbit/s, ↓ 58,5 Mbit/s, verbunden seit 13.10.2019, 04:06 Uhr
{ Heute:
   { '(hh:mm)': '11:03',
     'gesamt(MB)': '7027',
     'gesendet(MB)': '376',
     'empfangen(MB)': '6651',
     Verbindungen: '2' },
  Gestern:
   { '(hh:mm)': '24:00',
     'gesamt(MB)': '23350',
     'gesendet(MB)': '959',
     'empfangen(MB)': '22391',
     Verbindungen: '2' },
  'Aktuelle Woche':
   { '(hh:mm)': '155:00',
     'gesamt(MB)': '185555',
     'gesendet(MB)': '8633',
     'empfangen(MB)': '176922',
     Verbindungen: '14' },
  'Aktueller Monat':
   { '(hh:mm)': '298:42',
     'gesamt(MB)': '352260',
     'gesendet(MB)': '19026',
     'empfangen(MB)': '333234',
     Verbindungen: '42' },
  Vormonat:
   { '(hh:mm)': '719:22',
     'gesamt(MB)': '894949',
     'gesendet(MB)': '44390',
     'empfangen(MB)': '850559',
     Verbindungen: '88' } }
```

Environment variables supported
-------------------------------

| Name       | Description | Default
|------------|-------------|---------
| FRITZ_HOST | Fritz box host name or IP. | fritz.box
| FRITZ_USER | Fritz user name. | admin
| FRITZ_PASSWORD | Fritz box password.
