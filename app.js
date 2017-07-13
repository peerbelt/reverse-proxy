
// # Peerbelt tests
// 127.0.0.1       ssl-test.peerbelt.com
// 127.0.0.1       pronto.peerbelt.com
// 127.0.0.1       internal.pronto.peerbelt.com
// 127.0.0.1       google.pronto.peerbelt.com
// 127.0.0.1       yarn.pronto.peerbelt.com

var httpProxy = require( "http-proxy" );
var fs = require( "fs" );
var webHost = process.env.WEB_HOST || "192.168.1.14";
var radioHost = process.env.RADIO_HOST || "192.168.1.19";
//
// Create the HTTPS proxy server in front of a HTTP server
//
var binding = {
    "saas.peerbelt.com": {
        target: {
            host: webHost,
            port: 3200
      }
    },   
    "www.peerbelt.com": {
        target: {
            host: webHost,
            port: 3001
      }
    },
    "peerbelt.com": {
        target: {
            host: webHost,
            port: 3001
      }
    },
    "*.peerbelt.com": {
        target: {
            host: webHost,
            port: 3000
      }
    },
    "*.dyndns.info": {
        target: {
            host: webHost,
            port: 3001
        }
    },
    "sonos.radionet.live": {
        target: {
            host: radioHost,
            port: 8000
        }      
    },
    "publisher.radionet.live" : {
        target: {
            host: radioHost,
            port: 4000
        }      
    },
    "*.radionet.live": {
        target: {
            host: radioHost,
            port: 3000
        }      
    }
};


function socketErrorHandler( err, req ) {
    if ( req && ( req = req.socket ) ) {
        try {
            req.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        } catch( e ) {
            ;
        }
    }
};

httpProxy.createServer({
  binding: binding,
  target: {
    host: webHost,
    port: 3000
  },
  ssl: {
    key: fs.readFileSync("../ssl-certificates/peerbelt.com/STAR_peerbelt_com-2017/peerbelt.com_pk.txt", "utf8"),
    cert: fs.readFileSync("../ssl-certificates/peerbelt.com/STAR_peerbelt_com-2017/peerbelt.com_crt.txt", "utf8")
  }
})
.listen(3443)
.on( "error", socketErrorHandler );

httpProxy.createServer({
  binding: binding,
  target: {
    host: webHost,
    port: 3001
  }
}).listen(3080)
.on( "error", socketErrorHandler );
