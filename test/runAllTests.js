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

    it("...have a name of 'JhonnyJason Token'.", async () => {
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
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const desiredBalance = (prevBalance + amount)
        const desiredSupply = (prevSupply + amount)
        
        const result = await jjt.goBrrr(amount, { from: owner })
        console.log("goBrrr gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(owner)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(balance, desiredBalance, "The amount was not correctly minted.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })

    it("...have went brrr a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const owner = await jjt.owner()
        const amount = 666
        const prevBalance = (await jjt.balanceOf(owner)).toNumber()
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const desiredBalance = (prevBalance + amount)
        const desiredSupply = (prevSupply + amount)
        
        const result = await jjt.goBrrr(amount, { from: owner })
        console.log("goBrrr2 gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(owner)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(balance, desiredBalance, "The minter did not goBrrr correctly.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })


    it("...have minted JJTs.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const minter = accounts[3]
        const owner = await jjt.owner()
        const ETHValue = 1
        const prevBalance = (await jjt.balanceOf(minter))
        const prevETHBalanceMinter = BigInt(await web3.eth.getBalance(minter))
        const prevETHBalanceOWner = BigInt(await web3.eth.getBalance(owner))
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const mintableProETH = (await jjt.mintableProETH()).toNumber()
        const desiredBalance = prevBalance + (ETHValue * mintableProETH)
        const desiredSupply = (prevSupply + (ETHValue * mintableProETH))
        const desiredETHBalanceOwner = prevETHBalanceOWner + BigInt(ETHValue)

        const result = await jjt.mint({ from: minter, value: ETHValue, gasPrice: 20000000000 })
        console.log("mint gas: "+ result.receipt.gasUsed)

        const gasCosts = BigInt(result.receipt.gasUsed*20000000000)
        const desiredETHBalanceMinter = prevETHBalanceMinter -  BigInt(ETHValue) - gasCosts

        const ETHBalanceMinter = BigInt(await web3.eth.getBalance(minter))
        const ETHBalanceOwner = BigInt(await web3.eth.getBalance(owner))
        const balance = (await jjt.balanceOf(minter)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(ETHBalanceOwner.toString(), desiredETHBalanceOwner.toString(), "ETH Balance of Owner did not change correctly!")
        assert.equal(ETHBalanceMinter.toString(), desiredETHBalanceMinter.toString(), "ETH Balance of minter did not change correctly!")
        assert.equal(balance, desiredBalance, "The amount was not correctly minted.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })

    it("...have minted JJTs a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const minter = accounts[3]
        const owner = await jjt.owner()
        const ETHValue = 1
        const prevBalance = (await jjt.balanceOf(minter)).toNumber()
        const prevETHBalanceMinter = BigInt(await web3.eth.getBalance(minter))
        const prevETHBalanceOWner = BigInt(await web3.eth.getBalance(owner))
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const mintableProETH = (await jjt.mintableProETH()).toNumber()
        const desiredBalance = prevBalance + (ETHValue * mintableProETH)
        const desiredSupply = (prevSupply + (ETHValue * mintableProETH))
        const desiredETHBalanceOwner = prevETHBalanceOWner + BigInt(ETHValue)

        const result = await jjt.mint({ from: minter, value: ETHValue, gasPrice: 20000000000 })
        console.log("mint gas: "+ result.receipt.gasUsed)

        const gasCosts = BigInt(result.receipt.gasUsed*20000000000)
        const desiredETHBalanceMinter = prevETHBalanceMinter -  BigInt(ETHValue) - gasCosts

        const ETHBalanceMinter = BigInt(await web3.eth.getBalance(minter))
        const ETHBalanceOwner = BigInt(await web3.eth.getBalance(owner))
        const balance = (await jjt.balanceOf(minter)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(ETHBalanceOwner.toString(), desiredETHBalanceOwner.toString(), "ETH Balance of Owner did not change correctly!")
        assert.equal(ETHBalanceMinter.toString(), desiredETHBalanceMinter.toString(), "ETH Balance of minter did not change correctly!")
        assert.equal(balance, desiredBalance, "The amount was not correctly minted.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })


    it("...have burned 1wei of JJT.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const toBurn = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const desiredBalance = prevBalance - toBurn
        const desiredSupply = prevSupply - toBurn

        const result = await jjt.burn(toBurn, { from: account})
        console.log("burn gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(balance, desiredBalance, "The amount was not correctly burned.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })

    it("...have burned 1wei of JJT a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const toBurn = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const desiredBalance = prevBalance - toBurn
        const desiredSupply = prevSupply - toBurn

        const result = await jjt.burn(toBurn, { from: account})
        console.log("burn gas: "+ result.receipt.gasUsed)

        const balance = (await jjt.balanceOf(account)).toNumber()
        const totalSupply = (await jjt.totalSupply()).toNumber()

        assert.equal(balance, desiredBalance, "The amount was not correctly burned.")
        assert.equal(totalSupply, desiredSupply, "The totalSupply was not correctly adjusted.")
    })

    
    it("...have transferred 1wei of JJT to recevier.", async () => {
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

        assert.equal(balanceSender, desiredBalanceSender, "Balance of Sender did not change Correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change Correctly.")
    })

    it("...have transferred 1wei of JJT to recevier a second time.", async () => {
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

        assert.equal(balanceSender, desiredBalanceSender, "Balance of Sender did not change Correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change Correctly.")
    })
    
    it("...have approved 1wei of JJT to be spend by accounts[5].", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]

        const toAllow = 1

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)

        const allowance = (await jjt.allowance(allower, sender)).toNumber()
        
        assert.equal(allowance, toAllow, "Not approved amount correctly to spender.")

    })

    it("... accounts[5] could spend 1wei of JJT on behalf of accounts[3].", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]
        const receiver = accounts[4]

        const amount = 1

        const prevBalanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const prevAllowance = (await jjt.allowance(allower, sender)).toNumber()
        const desiredAllowance = prevAllowance - amount

        const desiredBalanceAllower = prevBalanceAllower - amount
        const desiredBalanceReceiver = prevBalanceReceiver + amount


        const result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
        console.log("transferFrom gas: "+ result.receipt.gasUsed)

        const balanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const allowance = (await jjt.allowance(allower, sender)).toNumber()

        assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")
        assert.equal(allowance, desiredAllowance, "Not used allowance correctly for spender.")

    })

    it("...have increasedAllowance by 10wei of JJT to be spend by accounts[5] a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]

        const prevAllowance = (await jjt.allowance(allower, sender)).toNumber()
        const toIncrease = 10
        const desiredAllowance = prevAllowance + toIncrease

        const result = await jjt.increaseAllowance(sender, toIncrease, { from: allower})
        console.log("increaseAllowance gas: "+ result.receipt.gasUsed)

        const allowance = (await jjt.allowance(allower, sender)).toNumber()
        
        assert.equal(allowance, desiredAllowance, "Not increased allowance correctly fors spender.")

    })

    it("... accounts[5] could spend 5wei of JJT two times on behalf of accounts[3] a second time.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const allower = accounts[3]
        const sender = accounts[5]
        const receiver = accounts[4]

        const amount = 5
        const prevBalanceAllower = (await jjt.balanceOf(allower)).toNumber()
        const prevBalanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        const prevAllowance = (await jjt.allowance(allower, sender)).toNumber()
        let desiredBalanceAllower = prevBalanceAllower - amount
        let desiredBalanceReceiver = prevBalanceReceiver + amount
        let desiredAllowance = prevAllowance - amount


        let result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
        console.log("transferFrom gas: "+ result.receipt.gasUsed)

        let balanceAllower = (await jjt.balanceOf(allower)).toNumber()
        let balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        let allowance = (await jjt.allowance(allower, sender)).toNumber()

        assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")
        assert.equal(allowance, desiredAllowance, "Not used allowance correctly for spender.")

        desiredBalanceAllower = balanceAllower - amount
        desiredBalanceReceiver = balanceReceiver + amount
        desiredAllowance = allowance - amount


        result = await jjt.transferFrom(allower, receiver, amount, { from: sender})
        console.log("transferFrom gas: "+ result.receipt.gasUsed)

        balanceAllower = (await jjt.balanceOf(allower)).toNumber()
        balanceReceiver = (await jjt.balanceOf(receiver)).toNumber()
        allowance = (await jjt.allowance(allower, sender)).toNumber()

        assert.equal(balanceAllower, desiredBalanceAllower, "Balance of Allower did not change correctly.")
        assert.equal(balanceReceiver, desiredBalanceReceiver, "Balance of Receiver did not change correctly.")
        assert.equal(allowance, desiredAllowance, "Not used allowance correctly for spender.")

    })
    //#endregion


    //############################################################
    //#region Should fail Tests

    it("...should have failed to burn with 0 Balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[7]
        const toBurn = 1
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const prevSupply = (await jjt.totalSupply()).toNumber()

        try { await jjt.burn(toBurn, { from: account}) } catch(error) {
            // console.log(error)

            const balance = (await jjt.balanceOf(account)).toNumber()
            const totalSupply = (await jjt.totalSupply()).toNumber()
            assert.equal(balance, prevBalance, "The amount was not correctly burned.")
            assert.equal(totalSupply, prevSupply, "The totalSupply was not correctly adjusted.")
            return
        }
        throw new Error("Burning 1wei token with 0 Balance did not wo fail!")
    })

    it("...should have failed to burn with too little Balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const prevBalance = (await jjt.balanceOf(account)).toNumber()
        const prevSupply = (await jjt.totalSupply()).toNumber()
        const toBurn = prevBalance + 1
        
        try { await jjt.burn(toBurn, { from: account}) } catch(error) {
            // console.log(error)

            const balance = (await jjt.balanceOf(account)).toNumber()
            const totalSupply = (await jjt.totalSupply()).toNumber()
            assert.equal(balance, prevBalance, "The amount was not correctly burned.")
            assert.equal(totalSupply, prevSupply, "The totalSupply was not correctly adjusted.")
            return
        }
        throw new Error("Burning 10000wei token with too little Balance did not wo fail!")
    })

    
    it("...should have failed to mint over mintCeiling.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const account = accounts[3]
        const prevBalance = BigInt(await jjt.balanceOf(account))
        const prevSupply = BigInt(await jjt.totalSupply())
        const mintableProETH = BigInt(await jjt.mintableProETH())
        const mintCeiling = BigInt(await jjt.mintCeiling())
        const ETHValue = (mintCeiling + 2n) /  mintableProETH

        try { await jjt.mint({ from: account, value: ETHValue }) } catch(error) {
            const balance = BigInt(await jjt.balanceOf(account))
            const totalSupply = BigInt(await jjt.totalSupply())
            assert.equal(balance.toString(), prevBalance.toString(), "The balance of the minter did not stay the same.")
            assert.equal(totalSupply.toString(), prevSupply.toString(), "The totalSupply did not stay the same.")
            return
        }
        
        const balance = BigInt(await jjt.balanceOf(account))
        const totalSupply = BigInt(await jjt.totalSupply())
        
        console.log("balance: " + balance)
        console.log("totalSupply: " + totalSupply)
        console.log("mintCeiling: " + mintCeiling)

        throw new Error("Minting over the mintCeiling did not fail!")

    })


    it("...should have failed to transfer Tokens with 0 balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[7]
        const receiver = accounts[3]

        const prevBalanceSender = BigInt(await jjt.balanceOf(sender))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))

        try { await jjt.transfer(receiver, 1, { from: sender }) } catch(error) {
            const balanceSender = BigInt(await jjt.balanceOf(sender))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceSender.toString(), prevBalanceSender.toString(), "The balance of sender did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens with 0 balance did not fail!")

    })

    it("...should have failed to transfer Tokens with too little balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[3]
        const receiver = accounts[7]

        const tooMuch = BigInt(await jjt.balanceOf(sender)) + 1n
        const prevBalanceSender = BigInt(await jjt.balanceOf(sender))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))

        try { await jjt.transfer(receiver, tooMuch, { from: sender }) } catch(error) {
            const balanceSender = BigInt(await jjt.balanceOf(sender))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceSender.toString(), prevBalanceSender.toString(), "The balance of sender did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens with too little balance did not fail!")

    })

    
    it("...should have failed to transferFrom Tokens with 0 allowance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[7]
        const allower = accounts[3]
        const receiver = accounts[4]

        const prevBalanceAllower = BigInt(await jjt.balanceOf(allower))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))

        try { await jjt.transferFrom(allower, receiver, 1, { from: sender }) } catch(error) {
            const balanceAllower = BigInt(await jjt.balanceOf(allower))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceAllower.toString(), prevBalanceAllower.toString(), "The balance of allower did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens from with 0 allowance did not fail!")

    })

    it("...should have failed to transferFrom Tokens with 0 balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[3]
        const allower = accounts[7]
        const receiver = accounts[4]

        const toAllow = 1
        const prevBalanceAllower = BigInt(await jjt.balanceOf(allower))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)


        try { await jjt.transferFrom(allower, receiver, 1, { from: sender }) } catch(error) {
            const balanceAllower = BigInt(await jjt.balanceOf(allower))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceAllower.toString(), prevBalanceAllower.toString(), "The balance of allower did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens from with 0 balance did not fail!")

    })

    it("...should have failed to transferFrom Tokens with too little allowance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[7]
        const allower = accounts[3]
        const receiver = accounts[4]

        const toAllow = 1
        const tooMuch = toAllow + 1
        const prevBalanceAllower = BigInt(await jjt.balanceOf(allower))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))
        console.log("balance: " + prevBalanceAllower + " > " + "amount: " + tooMuch)

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)

        try { await jjt.transferFrom(allower, receiver, tooMuch, { from: sender }) } catch(error) {
            const balanceAllower = BigInt(await jjt.balanceOf(allower))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceAllower.toString(), prevBalanceAllower.toString(), "The balance of allower did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens with too little allowance did not fail!")

    })


    it("...should have failed to transferFrom Tokens with too little balance.", async () => {
        const jjt = await JhonnyJasonToken.deployed()
        
        const sender = accounts[7]
        const allower = accounts[3]
        const receiver = accounts[4]

        const prevBalanceAllower = BigInt(await jjt.balanceOf(allower))
        const prevBalanceReceiver = BigInt(await jjt.balanceOf(receiver))
        const toAllow = prevBalanceAllower + 1n
        console.log("balance: " + prevBalanceAllower + " < " + "approved: " + toAllow)

        const result = await jjt.approve(sender, toAllow, { from: allower})
        console.log("approve gas: "+ result.receipt.gasUsed)

        try { await jjt.transferFrom(allower, receiver, toAllow, { from: sender }) } catch(error) {
            const balanceAllower = BigInt(await jjt.balanceOf(allower))
            const balanceReceiver = BigInt(await jjt.balanceOf(receiver))
            assert.equal(balanceAllower.toString(), prevBalanceAllower.toString(), "The balance of allower did not stay the same.")
            assert.equal(balanceReceiver.toString(), prevBalanceReceiver.toString(), "The balance of receiver did not stay the same.")
            return
        }
        
        throw new Error("Transfering tokens with too little balance did not fail!")

    })

    // })

    //#endregion

})
