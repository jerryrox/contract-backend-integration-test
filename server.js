const express = require("express");
require('dotenv').config();

const web3Bridge = require("./src/web3Bridge");

const portNumber = 4000;

// Setup
const app = express();
app.use(express.urlencoded());
app.use(express.json());

// Simple routes
app.post("/send", (req, res) => {
    const { address, amount } = req.body;
    if(address === undefined || amount === undefined) {
        console.log(`address and amount mustn't be undefined!`);
        res.sendStatus(400);
        return;
    }
    web3Bridge.sendTokens(address, amount);
    res.send("Pending");
});

app.post("/mint", (req, res) => {
    console.log(req.body);
    const { amount } = req.body;
    if(amount === undefined) {
        console.log(`amount mustn't be undefined!`);
        res.sendStatus(400);
        return;
    }
    web3Bridge.mintTokens(amount);
    res.send("Pending");
});

app.listen(portNumber, () => {
    console.log(`Server started on port ${portNumber}`);
});