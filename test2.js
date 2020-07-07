

const fetch = require("node-fetch");



async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        credentials: 'omit',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

postData("https://api.iost.io/getContractStorage", { id: "ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", key: "userPerReward", field: "hodl928", by_longest_chain: true }).then(res => {
    return res.json()
}).then(res => {
    console.log(res.data)
})