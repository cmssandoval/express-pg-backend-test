# express-pg-backend-test

Hello, this was made during a tutorship at my academy Desafío Latam. In this modules, we are learning how to create backend apps with Node, Express JS and PostgreSQL.

## About the app and its development

- This is another test of a backend app creation using Express JS and postgres.

- I started using environment variables for the pg connection settings and express main server port, so dotenv package is needed. Cors is needed when connecting from a frontend app so I used it too.

- This app allows you to perform CRUD operations with users stored in a database. You can:
    - GET all users from a database.
    - GET a user by its id assigned by the database.
    - POST a new user to the database specifying its name, email, and password (all as VARCHAR).
    - DELETE a user from the database by its id.
    - PUT (update) an existing user in the database. In this update you must send all properties, not just one.

- The database and table (users) must be created before using the app. I researched how to create the database directly from node instead of going to psql or pgadmin (and avoiding the use of vs code extensions). In summary, to do that you should:
    1. Connect to a default database, for example: postgres.
    2. Send the query to create the database via Client or Pool and close te connection.
    3. Set the new database as the value and connect.
    4. Done. You can now make the query to create the table.
    - This is a one time action so it doesn't seems so efficient, and going to psql looks like a better idea... I will consider creating the functions as a hook, snippet or something that I could import at every project with a few clicks. I didn't check if something like that already exists.

- In addition, I tried to be consistant, use correct function and variable names. I wrote JSDoc comments for autocompletion and references to functions. And finally, I also tried creating a User class to treat it like an entity, but I also could have made the User Model itself inside of the class.

***Thank you for reading this readme!***