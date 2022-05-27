import {ethers} from 'ethers';

// We get the new provider using ethers...
const provider = new ethers.providers.Web3Provider(ethereum);

// The params here are what we will pass into index.js when we import it to that file.
export default async function addContract(id, contract, arbiter, beneficiary, value) {
  // Set the button id to = interpolated string with id var
  const buttonId = `approve-${id}`;

  // Grab me the container using its id 
  const container = document.getElementById("container");
  
  // Lets change the inner html of the container everytime the createHtml method is called and we will pass it the params that we will insert into the input tags.
  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

  // This is a ethers event listener method called .on, it will check to see if the event Approved has happened if yes, it will change some information directly on the DOM
  contract.on('Approved', () => {
    // On this buttonId, set the class of the button as complete
    document.getElementById(buttonId).className = "complete";
    // On this buttonId, lets change the text of the button
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  // Listen for the user to click on button with id ButtonId and run some code
  document.getElementById(buttonId).addEventListener("click", async () => {
    // Get me the signer from the provider
    const signer = provider.getSigner();
    // Lets wait for the contract to connect with the signer and for them to approve/sign it.
    await contract.connect(signer).approve();
  });
}

// This function is responsible for creating the html... We will pass it the necessary params when we use the function above in our index.js
function createHTML(buttonId, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
