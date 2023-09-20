const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    
  },
  env: {
    API_POKEMON_BASE_URL: "https://pokeapi.co/api/v2/pokemon",
    API_BOOKS_BASE_URL: "https://simple-books-api.glitch.me",
    API_JSONPLACEHOLDER_BASE_URL: "https://jsonplaceholder.typicode.com",
    API_ADEQUATESHOP_BASE_URL: "http://restapi.adequateshop.com/api",
    API_REQRES_BASE_URL: "https://reqres.in/api"
  }
})

/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});*/