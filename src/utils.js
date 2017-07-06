module.exports = {
    storageCanSave,
    saveSessionStorage,
    readSessionStorage
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