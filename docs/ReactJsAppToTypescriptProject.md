To convert a Create React App (CRA) project to TypeScript, follow these steps:

## 1. Install TypeScript and Type Definitions
First, you need to install TypeScript and the necessary type definitions for React:

```
npm install --save typescript @types/react @types/react-dom @types/jest
```

or if you're using `yarn`:

```
yarn add typescript @types/react @types/react-dom @types/jest
```

## 2. Rename Files

Rename the following files from `.js` to `.tsx`:

- `src/index.js → src/index.tsx`
- `src/App.js → src/App.tsx`

You may also have other JavaScript files in the src folder that you want to convert to TypeScript files. Rename those `.js` files to `.ts` or `.tsx` as appropriate.

## 3. Add a TypeScript Configuration File
Create a `tsconfig.json` file in the root of your project if it doesn't already exist. You can generate one with default settings by running:

The CRA setup provides a default `tsconfig.json` file. Here’s a basic configuration that you can use:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "jsx": "preserve"
  },
  "include": ["src"]
}
```

## 4. Update `src/index.tsx`

Make sure your `src/index.tsx` looks like this:

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

```

## 5. Update src/App.tsx
Make sure your `src/App.tsx` looks like this:

```tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

## 6. Fix TypeScript Errors
After converting your files to TypeScript, you may encounter some type errors. You’ll need to address these by providing proper types and fixing any issues. For example, if you have props in your components, you'll need to type them using TypeScript interfaces or types.

## 7. Update Dependencies
Some dependencies might require TypeScript typings, especially if they’re used in your project. Ensure all libraries and packages you're using have TypeScript support, and install the necessary type definitions using @types/ packages.

## 8. Run Your Project
Finally, start your project to ensure everything is working correctly:

```
npm start
```

for `yarn`:

```
yarn start
```
Your project should now be running with TypeScript. Adjust and refine type definitions as needed throughout your codebase.