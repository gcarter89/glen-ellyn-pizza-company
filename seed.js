import { users } from './seeds/seedUsers.js';
import { items } from './seeds/seedItems.js';
import { orders } from './seeds/seedOrders.js';
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

console.log(`User creation step completed`);

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

console.log(`Item creation step completed`);


orders.forEach(order => {
    fetch('http://localhost:9090/orders', {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-type": "application/json"
        }
    })

    .then(response => response.json())
 
    .then(json => console.log(json));
})

console.log(`Order creation step completed`);
console.log(`Seeding process completed`);




