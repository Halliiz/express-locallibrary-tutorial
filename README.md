# Express Local Library

This code implements [MDN Local Library tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website), replacing Mongoose/MongoDB with Sequelize/MySQL.

## Usage

- Copy `config/mysql.json.example` to `config/mysql.json` and adapt to your needs.
- Execute `npm run populatedb` once to populate your database with sample data.
- Execute `npm run serverstart` to run the server in devlopment mode.
- Navigate to `http://127.0.0.1:3000/`.
