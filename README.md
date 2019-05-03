# mongodb-playground

Playground for **TypeScript** & **Mocha** & **MongoDB**

## Purpose 🎯

- Learn NoSQL(**MongoDB**) usage.
- Learn DB operations using strongly typed JavaScript(**TypeScript**).
- Learn ORM(**Mongoose**).
- Practice Test Driven Development(TDD) using popular testing framework(**Mocha**).

## Lessons 📝

0. [Basic CRUD operations](0-basic-crud)
1. [Advanced Operators & Validation](1-mongo-operators)
2. [Create relational on ORM Model](2-relational-data)
3. [Populate Model Associations](3-schema-associations)

## How to run 💻

- Install `node` & `npm` on your machine.
  - Node `v10`+ is recommended.
  - Npm `v6`+ is recommended.

- Install local mongodb.
  - As long as you have local mongodb running at `port 27017`, the apps should work.
  - If mac, use `brew install mongodb`, then run `$ mongod` to start the DB.

- Navigate into specific lesson, and run following commands.

  ```bash
  $ cd 0-basic-crud # Navigate into a specific lesson.

  $ npm ci # Installs necessary node packages.

  $ npm run test # Run test(app) for that specific lesson once.

  $ npm run test:watch # Run test(app) for that specific lesson *continuously*.
  ```

## Contribute 🔍

Please feel free to contribute code, ideas, suggestions and etc. Thanks!
