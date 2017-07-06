const slackApi = require('./slack');
const storageApi = require('./utils');

const pushState = history.pushState;

const messagesMap = new Map();


history.pushState = function () {
    pushState.apply(history, arguments);
    
    const chatName = slackApi.findChatName();
    
    const messagesFromChat = slackApi.getAllMessages();
    
    const messagesSavedBefore = storageApi.readSessionStorage(chatName);

    const messagesFiltered = slackApi.filterMessagesByID(messagesFromChat, messagesSavedBefore);
    console.log(chatName);
    console.log(messagesFromChat.length);
    console.log(messagesFiltered.length);
    console.log('-----')
    const messagesGroup = slackApi.groupMessages(chatName, messagesFiltered);

    slackApi.saveMessages(chatName, messagesGroup, messagesMap);

    const messagesID = slackApi.getIDFromMessages(messagesFromChat);

    storageApi.saveSessionStorage(chatName, messagesID);

};