import { orders } from './seeds/seedOrders.js';
import fetch from 'node-fetch';



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

runOrders();