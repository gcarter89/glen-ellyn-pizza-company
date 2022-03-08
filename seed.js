import { users } from './seeds/seedUsers.js';
import { items } from './seeds/seedItems.js';
import { orders } from './seeds/seedOrders.js';
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


async function runItems() {
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
    
    console.log(`Item step running...`);
}


async function runOrders() {
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
    console.log(`Order step running...`);
}

// hacky way to run these functions: larger seeding would need larger timeout delays.
async function runSeeds() {
    //the user creation is computationally expensive vs. the others (password/apikey hashing and encryption). Therefore it needs more time to resolve.
    runUsers()

    // Least expensive but still necessary for order creation
    setTimeout(() => {
        runItems()
    }, 15000)
    
    // Orders are related to both items and orders: DB calls are performed to check validity of data. So it must run last
    setTimeout(() => {
        runOrders()
    }, 25000)
}


runSeeds()





