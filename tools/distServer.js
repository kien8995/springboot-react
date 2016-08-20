import express from "express";
import path from "path";
import open from "open";
import compression from "compression";
import {DEST} from "./constant";
/*eslint-disable no-console */

const port = 9000;
const app = express();

app.use(compression());
app.use(express.static(DEST));

app.get("*", function (req, res) {
    res.sendFile(DEST + "/index.html");
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});
