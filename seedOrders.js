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