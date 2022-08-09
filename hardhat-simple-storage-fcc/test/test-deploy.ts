import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";


// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage; // we declare the variables here so the variables can be used in the "it" scope
    beforeEach(async function () {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
        simpleStorage = await simpleStorageFactory.deploy();
    }) // what to do before each one of "it"

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0"
        // We can use the keywords:
            // assert
            // expect
        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString().to.equal(expectedValue)); // same as assert
    })

    it("Should update when call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    })
}) // anonymous function syntax by convention