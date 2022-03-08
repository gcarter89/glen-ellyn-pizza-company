import { users } from './seeds/seedUsers.js';
import { items } from './seeds/seedItems.js';
import fetch from 'node-fetch';

users.forEach(user => {
    fetch('http://localhost:9090/users', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json"
        }
    })

    .then(response => response.json())
 
    .then(json => console.log(json));
})

items.forEach(item => {
    fetch('http://localhost:9090/items', {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json"
        }
    })

    .then(response => response.json())
 
    .then(json => console.log(json));
})





