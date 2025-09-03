let provider;
let signer;
let contract;

const contractAddress = 0xf8e81D47203A594245E36C48e151709F0C19fBe8
const contractABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ProfitsReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ProfitsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawProfits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
  "function withdrawProfits() public",
  "function getProfits(address) public view returns (uint)"
];

document.getElementById("connectButton").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = "Connected: " + address;
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById("rollDice").addEventListener("click", () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").innerText = "You rolled: " + dice;
});

document.getElementById("withdrawButton").addEventListener("click", async () => {
  if (!contract) return alert("Connect wallet first");
  try {
    const tx = await contract.withdrawProfits();
    document.getElementById("profitStatus").innerText = "Transaction sent: " + tx.hash;
    await tx.wait();
    document.getElementById("profitStatus").innerText = "✅ Profits withdrawn!";
  } catch (err) {
    document.getElementById("profitStatus").innerText = "Error: " + err.message;
  }
});
