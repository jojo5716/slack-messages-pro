
module.exports = {
    storageCanSave,
    saveSessionStorage,
    readSessionStorage,
    sendMessages
}

function storageCanSave() {
    return typeof(Storage) !== "undefined";
}

function saveSessionStorage(key, value)  {
    if (storageCanSave()) {
        sessionStorage.setItem(key, value);
    }
}

function readSessionStorage(key) {
    if (storageCanSave()) {
        return sessionStorage.getItem(key) || []
    }
    return [];
}

function sendMessages(channelName, messages) {
    fetch('https://localhost:5000/save/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channelName,
            messages: [...messages]
        })
    });
}