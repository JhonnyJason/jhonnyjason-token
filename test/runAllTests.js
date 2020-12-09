const JhonnyJasonToken = artifacts.require("JhonnyJasonToken")

contract("JhonnyJasonToken", (accounts) => {

    //############################################################
    //#region ReadOnly Tests
    it("...have decimals of 18.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        const decimals = await jjt.decimals()
        // console.log("decimals: " + decimals)

        assert.equal(decimals, 18, "The decimals were not 18.")
    })

    it("...have symbol of JJT.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        const symbol = await jjt.symbol()

        assert.equal(symbol, "JJT", "The symbol was not JJT.")
    })

    it("...have a name of The JhonnyJason Token.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        const name = await jjt.name()

        assert.equal(name, "JhonnyJason Token", "The name was not The JhonnyJason Token.")
    })

    it("...have the owner being accounts[0].", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        const owner = await jjt.owner()

        assert.equal(owner, accounts[0], "The owner was not accounts[0].")
    })

    //#endregion


    //############################################################
    //#region Write Tests
    it("...have transferred the ownership.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const oldOwner = accounts[0]
        const newOwner = accounts[1]

        const result = await jjt.transferOwnership(newOwner, { from: oldOwner })
        console.log("transferOwnership gas: "+ result.receipt.gasUsed)

        const owner = await jjt.owner()

        assert.equal(owner, newOwner, "The Ownership was not transferred.")
    })

    it("...have went brrr.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const owner = await jjt.owner()
        const amount = 666
        const prevBalance = (await jjt.balanceOf(owner)).toNumber()

        const result = await jjt.goBrrr(amount, { from: owner })
        console.log("goBrrr gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(owner)).toNumber()
        const desiredBalance = (prevBalance + amount)

        assert.equal(balance, desiredBalance, "The amount was correctly minted.")
    })

    it("...have went brrr a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const owner = await jjt.owner()
        const amount = 666
        const prevBalance = (await jjt.balanceOf(owner)).toNumber()

        const result = await jjt.goBrrr(amount, { from: owner })
        console.log("goBrrr gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(owner)).toNumber()
        const desiredBalance = (prevBalance + amount)

        assert.equal(balance, desiredBalance, "The minter went Brrr correctly.")
    })


    it("...have mined 10 JJTs.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const ETHValue = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const mintableProETH = (await jjt.mintableProETH()).toNumber()
        const desiredBalance = prevBalance + (ETHValue * mintableProETH)

        const result = await jjt.mint({ from: account, value: ETHValue })
        console.log("mint gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()

        assert.equal(balance, desiredBalance, "The amount was correctly minted.")
    })

    it("...have mined 10 JJTs a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const ETHValue = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const mintableProETH = (await jjt.mintableProETH()).toNumber()
        const desiredBalance = prevBalance + (ETHValue * mintableProETH)

        const result = await jjt.mint({ from: account, value: ETHValue })
        console.log("mint gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()

        assert.equal(balance, desiredBalance, "The amount was correctly minted.")
    })

    it("...have burned 1 JJT.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const toBurn = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const desiredBalance = prevBalance - toBurn

        const result = await jjt.burn(toBurn, { from: account})
        console.log("burn gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()
        
        assert.equal(balance, desiredBalance, "The amount was correctly burned.")
    })

    it("...have burned 1 JJT a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const toBurn = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const desiredBalance = prevBalance - toBurn

        const result = await jjt.burn(toBurn, { from: account})
        console.log("burn gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()

        assert.equal(balance, desiredBalance, "The amount was correctly burned.")
    })

    it("...have transferred 1 JJT to recevier.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[3]
        const receiver = accounts[4]

        const amount = 1
        const prevBalanceSender = (await jjt.balanceOf(sender)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const desiredBalanceSender = prevBalanceSender - amount
        const desiredBalanceReceiver = prevBalanceReceiver + amount


        const result = await jjt.transfer(receiver, amount, { from: sender})
        console.log("transfer gas: "+ result.receipt.gasUsed)

        const balanceSender = (await jjt.balanceOf(sender)).toNumber()
        const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()

        assert.equal(balanceSender, desiredBalanceSender, "Balance of Sender changed Correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver changed Correctly.")
    })

    it("...have transferred 1 JJT to recevier a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[3]
        const receiver = accounts[4]

        const amount = 1
        const prevBalanceSender = (await jjt.balanceOf(sender)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const desiredBalanceSender = prevBalanceSender - amount
        const desiredBalanceReceiver = prevBalanceReceiver + amount

        const result = await jjt.transfer(receiver, amount, { from: sender})
        console.log("transfer gas: "+ result.receipt.gasUsed)

        const balanceSender = (await jjt.balanceOf(sender)).toNumber()
        const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()

        assert.equal(balanceSender, desiredBalanceSender, "Balance of Sender changed Correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver changed Correctly.")
    })
    
    it("...have approved 1 JJT to be spend by accounts[5].", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]

        const toAllow = 1

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)

        const allowance = (await jjt.allowance(allower, sender)).toNumber()
        
        assert.equal(allowance, toAllow, "Approved amount Correctly to spender.")

    })

    it("... accounts[5] could spend 1 JJT on behalf of accounts[3].", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]
        const receiver = accounts[4]

        const amount = 1
        const prevBalanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const desiredBalanceAllower = prevBalanceAllower - amount
        const desiredBalanceReceiver = prevBalanceReceiver + amount

        const result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
        console.log("transferFrom gas: "+ result.receipt.gasUsed)

        const balanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        
        assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")

    })

    it("...have approved 1 JJT to be spend by accounts[5] a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]

        const toAllow = 1

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)

        const allowance = (await jjt.allowance(allower, sender)).toNumber()
        
        assert.equal(allowance, toAllow, "Approved amount Correctly to spender.")

    })

    it("... accounts[5] could spend 1 JJT on behalf of accounts[3] a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]
        const receiver = accounts[4]

        const amount = 1
        const prevBalanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const desiredBalanceAllower = prevBalanceAllower - amount
        const desiredBalanceReceiver = prevBalanceReceiver + amount

        const result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
        console.log("transferFrom gas: "+ result.receipt.gasUsed)

        const balanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        
        assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")

    })
    //#endregion


    //############################################################
    //#region Should fail Tests

    // it("... .", async () => {
    //     const jjt = await JhonnyJasonToken.deployed()
        
    //     const allower = accounts[3]
    //     const sender = accounts[5]
    //     const receiver = accounts[4]

    //     const amount = 1
    //     const prevBalanceAllower = (await jjt.balanceOf(allower)).toNumber()
    //     const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
    //     const desiredBalanceAllower = prevBalanceAllower - amount
    //     const desiredBalanceReceiver = prevBalanceReceiver + amount

    //     const result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
    //     console.log("transferFrom gas: "+ result.receipt.gasUsed)

    //     const balanceAllower = (await jjt.balanceOf(allower)).toNumber()
    //     const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        
    //     assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
    //     assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")

    // })
    
    //#endregion

})
