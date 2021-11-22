const { catchRevert } = require("./exceptionsHelpers.js");
const RealEstate = artifacts.require("./RealEstate.sol");
// Deploys the ReaEstate  contract before each test
contract("RealEstate", accounts => {
    const Mayor = accounts[0];

    beforeEach(async () => {
        instance = await RealEstate.new();
        contractAddress=  await instance.address;
		
      });


      it("is owned by Mayor", async () => {
        assert.equal(
          await instance.cityMayor.call(),
          Mayor,
          "Mayor is not correct",
        );
      });
    




    it('Should have an address', async () => {
		assert.notEqual(contractAddress, 0x0)
		assert.notEqual(contractAddress, '')
		assert.notEqual(contractAddress, null)
		assert.notEqual(contractAddress, undefined)
	})

    it('NFT Collection Should have a name', async () => {
		// Returns the name of the token
		const name = await instance.name()

		assert.equal(name, "Real Estate Tokensiation")
	})


    it('NFT Collection Should have a Symbol', async () => {
		// Returns the symbolof the token
		const symbol = await instance.symbol()

		assert.equal(symbol, "PEST")
	})

    it('Should be able to mint NFT', async () => {
		// Mints a NFT
        //const price = web3.utils.toBN(2*10**18);
        const owner =accounts[1];
        const type ="Building";
		const result = await instance.registerAsset(owner,type,{ from: Mayor })
        
        const tokenId= result.logs[0].args.assetID;
		assert.equal(tokenId, 0)
	})

    it('Address other than Mayor Should not be able to mint NFT', async () => {
		// Mints a NFT
        //const price = web3.utils.toBN(2*10**18);
        const owner =accounts[1];
        const type ="Building";
		await catchRevert(instance.registerAsset(Mayor,type,{ from: owner }));
	})

G
});
