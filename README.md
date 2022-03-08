<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<h3 align="center">Glen Ellyn Pizza Company</h3>

  <p align="center">
    An API-Driven Backend Application for a Fictional Pizza Company, built on 'Clean Architecture' Principles.
    <br />
    <br />
    ·
    <a href="https://github.com/gcarter89/glen-ellyn-pizza-company/issues">Report Bug</a>
    ·
    <a href="https://github.com/gcarter89/glen-ellyn-pizza-company/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Hello 👋. This is the repository for my little passion project, the Glen Ellyn Pizza Company. It's the backend application for a much larger portfolio project: An API-Driven Backend Application for a fictional pizza company in Chicago 🍕, built on 'Clean Architecture' principles as set out by [Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

This has been built using the JavaScript language with the help of NodeJS to facilitate serverless functionality. I've also used ExpressJS to help with routing and request/responses, and bCryptJS for encrypting passwords and scrambling API keys.

The core challenge for me as a software craftsman with this piece of software is to create a backend application from first principles rather than being dependent on a framework (an ORM or ODM) to take care of them. I've structured this application into 3 parts:

* Entities: Where the business logic and behaviour of the application is generally defined.
* Actions: Where behaviour is generated based on how the entity is defined and what the business wants it to do. The outcome is stored in a database.
* Endpoints: Where the outcome of the behaviour from the actions is exposed for consumption by the client.

Using these architectural principles, I have had a better developer experience than with more opinionated approach because I'm able to precisely define what the business logic is, rather than having it determined by a general (definitely benign and mostly helpful) framework which may not meet my business needs.

Aside from craftsmanship, I also took on technical challenges:

* I've gotten to work with a Document-based database, MongoDB, without leaning on Mongoose.
* I've stregnthened my knowledge of JavaScript, working with typechecking outside of TypeScript, factory functions and frozen objects.
* I've become more confident in leveraging security principles around authentication, authorisation and encryption.

As you'll see from the Roadmap, there's plenty of road left to roam. But I hope you'll find this repository helpful.


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Node.JS](https://nodejs.org/)
* [Express.JS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [bCryptJS](https://github.com/dcodeIO/bcrypt.js)


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This guide assumes some knowledge of how to run a local server, and to set up a database. While most of the To set up this application please follow these steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm
  ```sh
  npm install npm@latest -g
  ```
  
* MongoDB:
    To run this project you will need a database connection to MongoDB. You can set up a free account on their [website](https://www.mongodb.com/). The main reason     for this setup step is due to the way that I have configured the order 'actions' to call the database using MongoDBs client.
  
    From there, you will need to set up a hosted database instance. You can find more information in MongoDB's documentation.
  
    The key aspect of this prerequisite setup is to get hold of the string that will point you to your hosted database. It will be in this format:
  
    ```"mongodb+srv://<username>:<password>@<organisation>.bd1av.mongodb.net/<databasename>?retryWrites=true&w=majority"```
  
    For security reasons, you will want to store these details in a .env file. To work with this application's default configuration, assign this to the following     environment variable:
  
    ```DATABASE="mongodb+srv://<username>:<password>@<organisation>.bd1av.mongodb.net/<databasename>?retryWrites=true&w=majority"```
  
    Also, you will need to save the name of the database (in the URI above, it is designated as the <databasename>. Assign this to the following environment           variable:
  
    ```DBNAME=<databasename>```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/gcarter89/glen-ellyn-pizza-company.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the server
   ```sh
   npm run serve
   ```
4. While the local server is running, populate your database with User, Item and Order records. Otherwise, create your own using the documentation within the **Usage** section.
  
  **Important Notice: Please run these in the order below as orders will not be successfully saved since they depend on checks on user and item records** 
  ```sh
  npm run seed users
  npm run seed items
  npm run seed orders
  ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
  <h1>Usage</h1>
  
Since it is an API-driven backend application, the backend functionality is provided by RESTful requests from the client and responses from the server.
  
Please make use of the guide below to make calls to the API:

## USERS
  
  _Schema_
```sh
  {
    "userEmail": String [UNIQUE]
    "userPassword": String [stored as encrypted hash]
    "userFirstName": String
    "userLastName": String
    "userAddressLine1": String [length gte 2 chars]
    "userAddressLine2": String [length gte 2 chars]
    "userPostcode": String [length 5-7 chars excluding whitespace]
    "userContactNumber": String [length gt 11 chars]
    "userAdmin": Boolean,
    "userPaymentDetails": Array [**under development**],
    "_id": String (MongoDB Id) [UNIQUE],
    "apiKey": String (encrypted hash)
  }
```

_Endpoints_

| METHOD  | ENDPOINT                  | BODY                                        | SUCCESS                                   | 
| :---    |   :----                   |   :---                                      | :---                                      |
| GET     | /users                    | NULL                                        | Array[User]                               |
| POST    | /users                    | Object{user}                                | Object{postSuccess}                       |
| POST    | /users/authenticate       | Object{userEmail, userPassword}             | Object{authenticatedUser(bool), token}    |
| GET     | /users/:id                | NULL                                        | Array[User]                               |
| PATCH   | /users/:id                | Object{orderFieldsToUpdate: updatedValues}  | Object{updateCounts}                      |
| DELETE  | /users/:id                | NULL                                        | Object{deleteSuccess}                     |
  
  
## ORDERS

_Schema_
```sh
  {
    "orderUserId": String (ref: userEmail)
    "orderDeliveryAddress1": String [length gte 2 chars]
    "orderDeliveryAddress2": String [length gte 2 chars]
    "orderDeliveryPostcode": String [length 5-7 chars excluding whitespace]
    "orderItems": Array[
      Array [array length of 3 elements][
        String (Item name) (ref: item.itemName),
        Number (Quantity) [gt 0],
        String (Size) (ref: item.availableSizes)
      ]    
    ]
    "orderStatus": String [ENUM: 'sent', 'received', 'accepted', 'progress', 'delivering', 'delivered', 'rejected', 'delayed', 'problem'],
    "_id": String (MongoDB Id) [UNIQUE]
 }
```
  
_Endpoints_
  
  | METHOD  | ENDPOINT                  | BODY                                        | SUCCESS               | 
  | :---    |   :----                   |   :---                                      | :---                  |
  | GET     | /orders                   | NULL                                        | Array[Order]          |
  | POST    | /orders                   | Object{order}                               | Object{postSuccess}   |
  | GET     | /orders?userid=userEmail  | NULL                                        | Array[Order]          |
  | GET     | /orders/:id               | NULL                                        | Array[Order]          |
  | PATCH   | /orders/:id               | Object{orderFieldsToUpdate: updatedValues}  | Object{updateCounts}  |
  | DELETE  | /orders/:id               | NULL                                        | Object{deleteSuccess} |
  
## ITEMS

_Schema_
```sh
  {
    "itemName": String [gte 2 characters],
    "itemCategories": Array[String]
      "itemDescription": String,
      "availableSizes": Array[String],
      "dietary": String [ENUM: 'meatarian', 'pescetarian', 'vegan', 'vegetarian'],
      "basePrice": Number,
      "_id": String (MongoDB Id) [UNIQUE]
  }
```

_Endpoints_
  
| METHOD  | ENDPOINT                  | BODY                                        | SUCCESS DATA          | 
| :---    |   :----                   |   :---                                      | :---                  |
| GET     | /items                    | NULL                                        | Array[Item]           |
| POST    | /items                    | Object{order}                               | Object{postSuccess}   |
| GET     | /items/:id                | NULL                                        | Array[Item]           |
| PATCH   | /items/:id                | Object{itemFieldsToUpdate: updatedValues}   | Object{updateCounts}  |
| DELETE  | /items/:id                | NULL                                        | Object{deleteSuccess} |

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Road to Entities
  - [x] Generate Users
  - [x] Generate Items
  - [x] Generate Orders
  - [ ] Generate Inventory
  - [ ] Generate Employees
  - [ ] Generate Deliveries
- [ ] Road to Actions
  - [x] Create User Actions
  - [x] Create Item Actions
  - [x] Create Order Actions
  - [ ] Create Inventory Actions
  - [ ] Create Employee Actions
  - [ ] Create Delivery Actions 
- [ ] Road to Endpoints
  - [x] Create User Endpoints 
  - [x] Create Item Endpoints
  - [x] Create Order Endpoints
  - [ ] Create Inventory Endpoints
  - [ ] Create Employee Endpoints
  - [ ] Create Delivery Endpoints
- [ ] Road to Authentication
  - [x] Encrypt and hash passwords on data store
  - [x] Implement basic admin authorisation flag for user entity
  - [ ] Implement authentication layer on endpoints
  - [x] Generate encrypted and hashed api key.
  - [ ] Separate data store for user api key with authorisation level?
- [ ] Road to Deployment
  - [x] Utilising a live database for development.
  - [ ] Host backend in the cloud.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Gareth Carter - hi@garethcarter.dev

Project Link: [https://github.com/gcarter89/glen-ellyn-pizza-company](https://github.com/gcarter89/glen-ellyn-pizza-company)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* The teams behind the node-fetch and dot-env packages. These were incredibly useful when seeding my database!

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/gcarter89/glen-ellyn-pizza-company.svg?style=for-the-badge
[contributors-url]: https://github.com/gcarter89/glen-ellyn-pizza-company/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gcarter89/glen-ellyn-pizza-company.svg?style=for-the-badge
[forks-url]: https://github.com/gcarter89/glen-ellyn-pizza-company/network/members
[stars-shield]: https://img.shields.io/github/stars/gcarter89/glen-ellyn-pizza-company.svg?style=for-the-badge
[stars-url]: https://github.com/gcarter89/glen-ellyn-pizza-company/stargazers
[issues-shield]: https://img.shields.io/github/issues/gcarter89/glen-ellyn-pizza-company.svg?style=for-the-badge
[issues-url]: https://github.com/gcarter89/glen-ellyn-pizza-company/issues
[license-shield]: https://img.shields.io/github/license/gcarter89/glen-ellyn-pizza-company.svg?style=for-the-badge
[license-url]: https://github.com/gcarter89/glen-ellyn-pizza-company/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/gcarter89/
[product-screenshot]: images/screenshot.png
