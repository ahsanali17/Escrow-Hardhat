import {ethers} from 'ethers';
import deploy from './deploy';
import addContract from './addContract';
import "./index.scss";

// To let us know the current number of contracts deployed
let contracts = 0;

// Function responsible for creating a new contract
async function newContract() {
  // Retrieves the value's inside the input tag's.
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = ethers.BigNumber.from(document.getElementById("wei").value);
  
  // Wait for the contract to deploy with our 3 input values retrieved
  const contract = await deploy(arbiter, beneficiary, value);
  
  // Exported function that increments the number of contracts and passes the value inside our html input tags to this function
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

document.getElementById("deploy").addEventListener("click", newContract);
