import express from 'express';
import adaptRequest from './src/helpers/adapt-request.js';
import handlers from './src/endpoints/index.js';

const app = express();

app.use(
    express.urlencoded({
      extended: true
    })
  );
  
  app.use(express.json())


app.get('/items', itemsController);
app.post('/items', itemsController);
app.get('/items/:id', itemsController);
app.patch('/items/:id', itemsController);
app.delete('/items/:id', itemsController);

app.get('/users', usersController);
app.post('/users', usersController);
app.post('/users/authenticate', usersController);
app.get('/users/:id', usersController);
app.patch('/users/:id', usersController);
app.delete('/users/:id', usersController);

app.get('/orders', ordersController);
app.get('/orders/:id', ordersController);
app.post('/orders', ordersController);
app.patch('/orders/:id', ordersController);
app.delete('/orders/:id', ordersController);


async function itemsController(req, res) {
    const httpRequest = adaptRequest(req);
    const result = await handlers.itemsEndpointHandler(httpRequest);
    res.status(result.statusCode);
    res.send(result)
}

async function usersController(req, res) {
    const httpRequest = adaptRequest(req);
    const result = await handlers.usersEndpointHandler(httpRequest);
    res.status(result.statusCode);
    res.send(result);
}

async function ordersController(req, res) {
    const httpRequest = adaptRequest(req);
    const result = await handlers.ordersEndpointHandler(httpRequest);
    res.status(result.statusCode);
    res.send(result)
}


app.listen(9090, () => console.log(`Listening on port 9090`));
