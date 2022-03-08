import { users } from './seeds/seedUsers.js';
import fetch from 'node-fetch';

async function runUsers() {
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
    console.log('User step running...')
}


runUsers()




