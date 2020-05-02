// Simple Backend. Queries Servers from GET params.

const express = require('express');
const app = express();
const Gamedig = require('gamedig');
const cors = require('cors');
const port = 1234;
const reactPort = "3000"; // The port that the React Instance will run on.

app.use(cors({origin: 'http://localhost:' + reactPort}));


app.get('/', function(req, res) {
    // Pull the params from browser URL
    var ip = req.query.ip;
    var gPort = req.query.port;
    var type = req.query.type; // Must be a Gamedig game type! List at: https://www.npmjs.com/package/gamedig

    if (!ip | !gPort | !type) {
        res.send("Invalid!");
    } else {
        // Params are not empty - Perform Game Query
        Gamedig.query({
            type: type,
            host: ip,
            port: gPort
        }).then((state) => {
            var ping = state.ping;
            if (ping == null) {
                res.send("offline");
            } else {
                res.send(ping.toString());
            }
        }).catch((error) => {
            res.send("offline");
            console.error(error);
        });
    }

});


app.listen( port, () => {
    console.log(`Backend for Status Running on port ${port}! Access via localhost:${port}`);
})