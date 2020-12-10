var JhonnyJasonToken = artifacts.require("JhonnyJasonToken");

module.exports = function(deployer) {
    

    // var meta = "0x0000000000000000000000000000000000000000000000000000000000000000"
    // deployer.deploy(JhonnyJasonToken, meta);
    deployer.deploy(JhonnyJasonToken, "JhonnyJason Token", "JJT")
};
