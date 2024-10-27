// content.js
// document.addEventListener('DOMContentLoaded', function() {
//     const usernameInput = document.querySelector('input[type="email"], input[type="text"][name*="user"], input[type="text"][autocomplete="username"]');
//     if (usernameInput && usernameInput.value) {
//         chrome.runtime.sendMessage({type: "usernameDetected", username: usernameInput.value, domain: window.location.hostname});
//     }
// });


document.addEventListener('input', function(event) {
    // Check if the input field is likely to be a username or email field
    if (event.target.type === 'email' ||
        (event.target.type === 'text' && (
            event.target.name.includes('user') || 
            event.target.name.includes('email') ||
            event.target.name.includes('login') ||
            event.target.placeholder && (event.target.placeholder.toLowerCase().includes('email') || event.target.placeholder.toLowerCase().includes('username'))
        ))) {

        const baseDomain = getBaseDomain(window.location.hostname);

        // Send the input data back to the extension
        chrome.runtime.sendMessage({
            type: "usernameDetected",
            username: event.target.value,
            domain: window.location.hostname
        });
    }
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "autofill") {
        const usernameField = document.querySelector(
            'input[type="text"][name*="user"],' +
            'input[type="text"][name*="login"],' +
            'input[type="text"][name*="email"],' +
            'input[type="email"],' +
            'input[type="text"][id*="user"],' +
            'input[type="text"][id*="login"],' +
            'input[type="text"][id*="email"],' +
            'input[type="text"][placeholder*="username"],' +
            'input[type="text"][placeholder*="email"],' +
            'input[type="text"][placeholder*="login"],' +
            'input[type="email"][name*="email"],' +
            'input[type="email"][placeholder*="email"],' +
            'input[type="email"][id*="email"],' +
            'input[type="text"][autocomplete="username"],' +
            'input[type="text"][autocomplete="email"],' +
            'input[type="text"][autocomplete="name"],' +
            'input[type="email"][autocomplete="email"]'
        );
        // const passwordField = document.querySelector('input[type="password"]');

        if (usernameField ) {
            usernameField.value = message.username;
            // passwordField.value = message.password;
        }
        
        //get the password field
        const passwordField = document.querySelector('input[type="password"]');
        //if password field exists
        // if (passwordField) {
        //     //set the password field value to the password
        //     passwordField.value = message.password;
        // }

        //do it in a better way by first clearing the password field and then setting the password and even show should work
        if (passwordField) {
            // Clear the password field first
            passwordField.value = '';

            // Set the new password and temporarily change type to text to show the password
            passwordField.value = message.password;
            passwordField.setAttribute('type', 'text');

            // After a short delay, switch the field back to password type to hide the password
            setTimeout(() => {
                passwordField.setAttribute('type', 'password');
            }, 1000);
        }



    }
});


function getBaseDomain(hostname) {
    // Split the hostname into parts.
    const parts = hostname.split('.');

    // Return the last two parts for typical domain names, or adjust based on public suffixes (like .co.uk).
    if (parts.length > 2) {
        // Cover common public suffixes like .co.uk, .com.au, etc.
        return parts.slice(-2).join('.')
            .replace(/(\.co|\.com|\.net|\.org|\.edu)\.\w{2,3}$/, parts.slice(-3).join('.'));
    }

    return hostname;
}