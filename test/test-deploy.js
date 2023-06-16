const hre = require("hardhat");
const { expect, assert } = require("chai");

describe("Deployment", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with favourite number at 0", async () => {
    const expectedValue = 0;
    const currentValue = await simpleStorage.retrive();

    assert.equal(currentValue, expectedValue);
  });

  it("Should update when I call store", async () => {
    const expectedValue = 7;
    const transactionResponse = await simpleStorage.store(expectedValue);
    transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrive();

    assert.equal(currentValue, expectedValue);
  });

  it("Should set 100 as Jaison's favourite number", async () => {
    const expectedValue = 100;
    const transactionResponse = await simpleStorage.addPerson("Jaison", 100);
    transactionResponse.wait(1);

    const currentValue = await simpleStorage.nameToFavouriteNumber("Jaison");

    assert.equal(currentValue, expectedValue);
  });
});