import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    baseUrl: 'http://localhost:4200',

    setupNodeEvents: (on, config) => {
      // implement node event listeners here
    }

  },

  env: {
    auth_base_url: "http://localhost:8080",
    auth_realm: "rh",
    auth_client_id: "frontend",
  }

})

