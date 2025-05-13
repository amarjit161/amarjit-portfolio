# React GitHub Pages App

This project is a React application that is deployed to GitHub Pages. It serves as a template for creating and deploying React applications easily.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/react-gh-pages-app.git
cd react-gh-pages-app
npm install
```

## Scripts

This project includes several scripts to help with development and deployment:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the code using ESLint.
- `npm run preview`: Previews the production build locally.
- `npm run deploy`: Deploys the application to GitHub Pages.

## Deployment

To deploy the application to GitHub Pages, follow these steps:

1. Ensure that your `homepage` field in `package.json` is set to your GitHub Pages URL (e.g., `https://yourusername.github.io/react-gh-pages-app`).
2. Run the build script to create a production build:
   ```bash
   npm run build
   ```
3. Deploy the application using the deploy script:
   ```bash
   npm run deploy
   ```

Your application should now be live on GitHub Pages!

## License

This project is licensed under the MIT License.