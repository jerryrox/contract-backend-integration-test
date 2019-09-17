const BearToken = artifacts.require("BearToken");
const CubToken = artifacts.require("CubToken");

module.exports = (deployer) => {
    deployer.deploy(BearToken);
    deployer.deploy(CubToken);
}