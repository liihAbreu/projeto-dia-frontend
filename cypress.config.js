import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    waitForAnimations: false,
    animationDistanceThreshold: 50,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
