import { items } from './seeds/seedItems.js';
import fetch from 'node-fetch';



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

runItems()