const LEVEL = ['TRACE','DEBUG','INFO','WARN','ERROR']

let isEnabled = true
module.exports = {
	enabled: (bool) =>    { isEnabled = bool }
    trace  : (msg)  =>    { if(isEnabled) console.log('TRACE : '+msg) },
    debug  : (msg)  =>    { if(isEnabled) console.log('DEBUG : '+msg) },
    info   : (msg)  =>    { if(isEnabled) console.log('INFO  : '+msg) },
    warn   : (msg)  =>    { if(isEnabled) console.log('WARN  : '+msg) },
    error  : (msg)  =>    { if(isEnabled) console.log('ERROR : '+msg) }
}