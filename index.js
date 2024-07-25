#!/usr/bin/env node
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

function clearStyles(filePath) {
  try {
    writeFileSync(filePath, "");
    console.log(`Cleared content of ${filePath}`);
  } catch (error) {
    console.log(`Failed to clear the content of ${filePath}`, error);
  }
}
export function installTailwind() {
    try {
      console.log("Clearing existing styles from App.css and index.css...");
      const appCssPath = join("src", "App.css");
      const indexCssPath = join("src", "index.css");

      clearStyles(appCssPath);
      clearStyles(indexCssPath);

      console.log("Installing Tailwind CSS and its peer dependencies...");
      execSync("npm install -D tailwindcss postcss autoprefixer", {
        stdio: "inherit",
      });

      console.log(
        "Generating tailwind.config.js and postcss.config.js files..."
      );
      execSync("npx tailwindcss init -p", { stdio: "inherit" });

      console.log("Configuring the template paths...");
      const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

      writeFileSync("tailwind.config.js", tailwindConfig);

      console.log("Adding Tailwind directives...");
      const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    
      writeFileSync("src/index.css", tailwindDirectives)
    

      console.log("Installed Tailwind CSS successfully!");
    } catch (error) {
      console.log("An error occurred during installation:", error);
    }
  }


installTailwind();

