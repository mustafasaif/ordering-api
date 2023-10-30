# Ordering API

This is an API backend coded in NodeJs that supports flexibility to connect to any UI.

## Prerequisites
Node.js: Make sure you have Node.js installed. You can download it here.

npm: Node Package Manager is usually included with Node.js installation.

## Installation
1. Clone the repository from GitHub.

```git clone https://github.com/yourusername/your-project.git```

2. Navigate to the project directory.

```cd your-project```

3. Install project dependencies

```npm install ```

## Database Setup
Before running the application, make sure to set up your Database and run the necessary migrations.

### development Environment
1. Run migrations for the development environment.

``` npm run migrate-development ```

### Testing Environment
1. Run migrations for the testing environment

``` npm run migrate-test ```

### Reset Database(All Environments)
If you need to reset the database and re-run migrations, you can use the following command, **Be Cautious, as this will delete all your data.**

``` npm run migrate:reset ```

## Running the Application
1. Start the development server. It uses `nodemon` to automatically restart the server when you make changes.
```npm run dev```

## Running Tests
You can run test using Jest with the following command.
```npm test```

This will run your tests with a 10-second timeout, dectect open handles, provide verbose output, and generate coverage reports.


## Authors

- [@mustafasaif](https://github.com/mustafasaif)

