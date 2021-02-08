
const express = require('express')
const app = express();
const mySqlPool = require('./dbConfig');


/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */


const users = new Map();


function getUser(id){

    return users.get(id);
    
}

function verifyUser(id, password){

    const user = getUser(id);

    if(!user){
        return false;
    }

    /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        like secure storage of passwords for now.
     */
    return user.password === password;
}

function createUser(id, password){

    if(getUser(id)){
        return false;
    }

    const user = {
        id: id,
        password: password
    };

    users.set(id, user);
    return true;
}

function resetAllUsers(){
    users.clear();
}



 

module.exports = {getUser, verifyUser, createUser, resetAllUsers};
