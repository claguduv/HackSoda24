// background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "usernameDetected") {
        chrome.storage.local.set({[message.domain]: message.username}, function() {
            console.log("Username saved for domain:", message.domain);
        });
    }
});
