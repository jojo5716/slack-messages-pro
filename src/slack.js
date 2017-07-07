module.exports = {
    findGroupChatName,
    getAllMessages,
    groupMessages,
    saveMessages,
    getIDFromMessages,
    filterMessagesByID
}


function findGroupChatName() {
    let channel_name = document.getElementById('channel_title');

    return channel_name ? channel_name.textContent : null;
}

function getAllMessages() {
    return document.getElementsByTagName('ts-message');
}

function groupMessages(chatName, messages) {
    const messagesContentMap = new Map();
    
    for (let messageIndex = 0; messageIndex < messages.length; messageIndex += 1) {
        const message = messages[messageIndex];

        const messageID = message.id;
        const messageContent = message.innerHTML;

        if (!(messagesContentMap.has(messageID))) {
            messagesContentMap.set(messageID, messageContent);
        }
    }

    return messagesContentMap;
}

function saveMessages(chatName, messages, messagesMap) {
    messagesMap.set(chatName, messages);
}

function getIDFromMessages(messages) {
    const messagesIDs = [];

    for (let messageIndex = 0; messageIndex < messages.length; messageIndex += 1) {
        const messageID = messages[messageIndex].id;

        messagesIDs.push(messageID);
    }

    return messagesIDs;
}

function filterMessagesByID(messages, messagesIDs) {
    const messagesFiltered = [];

    for (let messageIndex = 0; messageIndex < messages.length; messageIndex += 1) {
        const message = messages[messageIndex];

        if (!messagesIDs.includes(message.id)) {
            messagesFiltered.push(message);
        }
    }

    return messagesFiltered;
}