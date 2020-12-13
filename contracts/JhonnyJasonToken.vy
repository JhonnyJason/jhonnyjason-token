# @version ^0.2.8

INITIAL_MINTABLE_PRO_ETH: constant(uint256) = 666
INITIAL_MINT_CEILING: constant(uint256) = 100000000000000000000000

DECIMALS: constant(uint256) = 18

############################################################
struct Meta:
    name: String[26] 
    symbol: String[6]

############################################################
#region internalProperties
meta: Meta

############################################################
owner: public(address)
balanceOf: public(HashMap[address, uint256])

allowances: HashMap[address, HashMap[address, uint256]]

############################################################
mintableProETH: public(uint256)
mintCeiling: public(uint256)
totalSupply: public(uint256)

#endregion

############################################################
@external
def __init__(_name: String[26], _symbol: String[6]):
    self.owner = msg.sender
    self.meta.name = _name
    self.meta.symbol = _symbol
    self.mintableProETH = INITIAL_MINTABLE_PRO_ETH
    self.mintCeiling = INITIAL_MINT_CEILING

############################################################
@external
@payable
def __default__():
    send(self.owner, msg.value)
    log Payment(msg.value, msg.sender)

############################################################
#region exposedFunctions

############################################################
#region writeFunctions

############################################################
#region ownerExclusiveFunctions
@external
def transferOwnership(_new_owner: address) -> bool:
    assert self.owner == msg.sender
    self.owner = _new_owner
    return True

@external
def setMintableProETH(_mintableProETH: uint256) -> bool:
    assert self.owner == msg.sender
    self.mintableProETH = _mintableProETH
    return True

@external
def setMintCeiling(_mintCeiling: uint256) -> bool:
    assert self.owner == msg.sender
    self.mintCeiling = _mintCeiling
    return True

@external
def setMintParams(_mintableProETH: uint256, _mintCeiling: uint256) -> bool:
    assert self.owner == msg.sender
    self.mintableProETH = _mintableProETH
    self.mintCeiling = _mintCeiling
    return True

############################################################
@external
def goBrrr(_rrr: uint256) -> bool:
    assert self.owner == msg.sender
    
    self.balanceOf[msg.sender] += _rrr
    self.totalSupply += _rrr

    log Transfer(self, msg.sender, _rrr)
    return True

#endregion

############################################################
@external
@payable
def mint() -> bool:
    _amount_wei: uint256 = msg.value * self.mintableProETH

    self.totalSupply += _amount_wei
    assert self.mintCeiling >= self.totalSupply + _amount_wei    
    self.balanceOf[msg.sender] += _amount_wei

    send(self.owner, msg.value)

    log Transfer(self, msg.sender, _amount_wei)
    log Payment(msg.value, msg.sender)
    return True

@external
def burn(_amount_wei: uint256) -> bool:
    self.balanceOf[msg.sender] -= _amount_wei
    self.totalSupply -= _amount_wei

    log Transfer(msg.sender, self, _amount_wei)
    return True

############################################################
#region ERC20Functions
@external
def transfer(_to: address, _amount_wei: uint256) -> bool:
    self.balanceOf[msg.sender] -= _amount_wei
    self.balanceOf[_to] += _amount_wei

    log Transfer(msg.sender, _to, _amount_wei)
    return True

@external
def approve(_spender: address, _amount_wei: uint256) -> bool:
    (self.allowances[msg.sender])[_spender] = _amount_wei
    log Approval(msg.sender, _spender, _amount_wei)
    return True

@external
def transferFrom(_from: address, _to: address, _amount_wei: uint256) -> bool:
    (self.allowances[_from])[msg.sender] -= _amount_wei

    self.balanceOf[_from] -= _amount_wei
    self.balanceOf[_to] += _amount_wei

    log Transfer(_from, _to, _amount_wei)
    return True

#endregion

############################################################
@external
def increaseAllowance(_spender: address, _amount_wei: uint256) -> bool:
    (self.allowances[msg.sender])[_spender] += _amount_wei
    
    log Approval(msg.sender, _spender, (self.allowances[msg.sender])[_spender])
    return True

@external
def decreaseAllowance(_spender: address, _amount_wei: uint256) -> bool:
    if (self.allowances[msg.sender])[_spender] < _amount_wei:
        (self.allowances[msg.sender])[_spender] = 0
    else:
        (self.allowances[msg.sender])[_spender] -= _amount_wei

    log Approval(msg.sender, _spender, (self.allowances[msg.sender])[_spender])
    return True

#endregion

############################################################
#region readFunctions

@external
@view
def decimals() -> uint256:
    # return convert(self.meta.decimals, uint256)
    return DECIMALS

@external
@view
def symbol() -> String[6]:
    #return convert(self.meta.slice(1,5), String[5])
    return self.meta.symbol

@external
@view
def name() -> String[26]:
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
    _amount_wei: uint256

event Approval:
    _owner: indexed(address)
    _spender: indexed(address)
    _amount_wei: uint256

event Payment:
    _amount_wei: uint256
    _sender: indexed(address)
