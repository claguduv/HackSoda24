const {generatePashword}  = require("@pashword/pashword-lib");



document.addEventListener('DOMContentLoaded', function() {
    // Query the active tab to get the current domain
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = new URL(tabs[0].url);
        // let domain = url.hostname;
        let domain = url.hostname.replace('www.', ''); // Remove 'www.' from the domain
        document.getElementById('webdomain').value = domain; // Auto-fill the domain field

        // Attempt to autofill the username from local storage
        chrome.storage.local.get(domain, function(data) {
            if (data[domain]) {
                document.getElementById('username').value = data[domain];
            }
        });
    });

    // Listener for the 'Generate' button click
    document.getElementById('generate').addEventListener('click', async function() {
        const domain = document.getElementById('webdomain').value;
        const username = document.getElementById('username').value;
        const secretKey = document.getElementById('secretkey').value;
        const passwordLength = 20;
        const passwordField = document.getElementById('result');
        
        const generatedPassword = await generatePassword(
            domain,
            username,
            secretKey,
            passwordLength
          );
          passwordField.value = generatedPassword;



        // // Combine the domain, username, and secret key into a single string
        // const inputString = domain + username + secretKey;
        // const encoder = new TextEncoder();
        // const data = encoder.encode(inputString);

        // Generate a SHA-256 hash of the input string
        // const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        // const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        // const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string

        // // Display the generated hash in the 'result' field
        // document.getElementById('result').value = hashHex;
    });

    //listner for autofill button send message to content.js
    document.getElementById('autofill-btn').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('result').value;
    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "autofill", username: username, password: password});
        });
    });



});



async function generatePassword(domain, username, secretKey, passwordLength) {
    // Use pashword-lib's generatePassword function
    const toHash = JSON.stringify({
      website: domain,
      username,
      password: secretKey,
    });
    console.log("🚀 => toHasdsadsadsadsadasdash:", toHash);
    let pswd = "";
    try {

        pswd =  await generatePashword(toHash, passwordLength, domain, username);
    } catch (error) {
        console.log("error",    error);
    }
    console.log("generated password", pswd);
    return pswd;
  }
