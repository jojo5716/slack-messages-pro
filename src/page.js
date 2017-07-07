const slackApi = require('./slack');
const storageApi = require('./utils');

const pushState = history.pushState;

const messagesMap = new Map();


history.pushState = function () {
    pushState.apply(history, arguments);
    
    const groupChatName = slackApi.findGroupChatName();

    if (groupChatName) {
        const messagesFromChat = slackApi.getAllMessages();
        
        const messagesSavedBefore = storageApi.readSessionStorage(groupChatName);

        const messagesFiltered = slackApi.filterMessagesByID(messagesFromChat, messagesSavedBefore);

        const messagesGroup = slackApi.groupMessages(groupChatName, messagesFiltered);

        slackApi.saveMessages(groupChatName, messagesGroup, messagesMap);

        const messagesID = slackApi.getIDFromMessages(messagesFromChat);

        storageApi.saveSessionStorage(groupChatName, messagesID);

        storageApi.sendMessages(groupChatName, messagesGroup)
    }
    

};