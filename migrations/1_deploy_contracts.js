var JhonnyJasonToken = artifacts.require("JhonnyJasonToken");

module.exports = function(deployer) {
        deployer.deploy(JhonnyJasonToken, "JhonnyJason Token", "JJT")
};
