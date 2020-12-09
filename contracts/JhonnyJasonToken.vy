# @version ^0.2.0

INITIAL_MINT_CEILING: constant(uint256) = 100000000000000000000000 #100k
INITIAL_MINTABLE_PRO_ETH: constant(uint256) = 100

############################################################
struct Meta:
    name: String[25] 
    symbol:String[5]
    decimals: Bytes[1]

############################################################
#region internalProperties
owner: public(address)
balanceOf: public(HashMap[address, uint256])
totalSupply: public(uint256)

allowances: HashMap[address, HashMap[address, uint256]]

meta: Meta

mintCeiling: public(uint256)
mintableProETH: public(uint256)

#endregion

@external
def __init__(_name: String[25], _symbol: String[5], _decimals: uint256):
    self.owner = msg.sender
    self.meta.name = _name
    self.meta.symbol = _symbol
    self.meta.decimals = slice(convert(_decimals, bytes32), 31, 1)
    self.mintableProETH = INITIAL_MINTABLE_PRO_ETH
    self.mintCeiling = INITIAL_MINT_CEILING


############################################################
@external
@payable
def __default__():
    send(self.owner, msg.value)
    log Payment(msg.value, msg.sender)

############################################################
#region internalFunctions

#endregion

############################################################
#region exposedFunctions

############################################################
#region writeFunctions
@external
def transferOwnership(_new_owner: address) -> bool:
    assert self.owner == msg.sender
    self.owner = _new_owner
    return True

@external
def setMintableProEth(_mintableProETH: uint256) -> bool:
    assert self.owner == msg.sender
    self.mintableProETH = _mintableProETH
    return True

@external
def setMintCeiling(_mintCeiling: uint256) -> bool:
    assert self.owner == msg.sender
    self.mintCeiling = _mintCeiling 
    return True




@external
def goBrrr(_rrr: uint256) -> bool:
    assert self.owner == msg.sender
    self.balanceOf[msg.sender] += _rrr
    self.totalSupply += _rrr

    log Transfer(self, msg.sender, _rrr)
    return True

@external
@payable
def mint() -> bool:
    _value: uint256 = msg.value * self.mintableProETH
    assert self.mintCeiling > (_value + self.totalSupply)

    self.totalSupply += _value
    self.balanceOf[msg.sender] += _value
    
    send(self.owner, msg.value)

    log Payment(msg.value, msg.sender)
    log Transfer(self, msg.sender, _value)
    return True

    # _value: decimal = convert(msg.value, decimal)
    # _value /= self.rateToETH
    # assert self.mintCeiling > (convert(_value, uint256) + self.totalSupply)

    # self.totalSupply += convert(_value, uint256)
    # balanceOf[msg.sender] += convert(_value, uint256)
    # send(self.owner, msg.value)
    # return True

@external
def burn(_value: uint256) -> bool:
    self.balanceOf[msg.sender] -= _value
    self.totalSupply -= _value

    if self.balanceOf[msg.sender] == 0:
        self.balanceOf[msg.sender] = 1
        self.totalSupply += 1

    log Transfer(msg.sender, self, _value)
    return True


@external
def transfer(_to: address, _value: uint256) -> bool:
    self.balanceOf[msg.sender] -= _value
    self.balanceOf[_to] += _value

    if self.balanceOf[msg.sender] == 0:
        self.balanceOf[msg.sender] = 1
        self.totalSupply += 1

    log Transfer(msg.sender, _to, _value)
    return True

@external
def approve(_spender: address, _value: uint256) -> bool:
    if (self.allowances[msg.sender])[_spender] != _value:
        (self.allowances[msg.sender])[_spender] = _value

    log Approval(msg.sender, _spender, _value)
    return True

@external
def transferFrom(_from: address, _to: address, _value: uint256) -> bool:
    # assert (self.allowances[_from])[msg.sender] >= _value
    (self.allowances[_from])[msg.sender] -= _value

    if (self.allowances[_from])[msg.sender] == 0:
        (self.allowances[_from])[msg.sender] = 1

    # if ((self.allowances[_from])[msg.sender] != MAX_UINT256):
    #     (self.allowances[_from])[msg.sender] = 1

    self.balanceOf[_from] -= _value
    self.balanceOf[_to] += _value

    if self.balanceOf[_from] == 0:
        self.balanceOf[_from] = 1
        self.totalSupply += 1

    log Transfer(_from, _to, _value)
    return True

#endregion

############################################################
#region readFunctions
@external
@view
def decimals() -> uint256:
    #return convert(self.meta.slice(0,1), uint256) 
    return convert(self.meta.decimals, uint256)

@external
@view
def symbol() -> String[5]:
    #return convert(self.meta.slice(1,5), String[5])
    return self.meta.symbol

@external
@view
def name() -> String[25]:
    #return convert(self.meta.slice(6,25), String[25])
    return self.meta.name

@external
@view
def allowance(_owner: address, _spender: address) -> uint256:
    return (self.allowances[_owner])[_spender]


#endregion


#endregion

############################################################
#Events
event Transfer:
    _from: indexed(address)
    _to: indexed(address)
    _value: uint256

event Approval:
    _owner: indexed(address)
    _spender: indexed(address)
    _value: uint256

event Payment:
    _value: uint256
    _sender: indexed(address)
