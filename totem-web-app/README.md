<!-- @format -->

# TOTEM Web App - Frontend (React typescript)

-   [TOTEM Web App - Frontend (React typescript)](#totem-web-app---frontend-react-typescript)
    -   [Quick Start](#quick-start)
    -   [File Structure](#file-structure)
        -   [Folders :](#folders-)
    -   [Functionalities and pages](#functionalities-and-pages)
    -   [Available Scripts](#available-scripts)
        -   [`npm start`](#npm-start)
        -   [`npm run build`](#npm-run-build)
    -   [Learn More](#learn-more)

---

## Quick Start

1.  **Create** a `.env` file in the root directory of the react project and add the following variable:

```bash
REACT_APP_CENTRAL_ADRESS = centralIpAdress
#(ex : 192.168.1.2)
```

2.  Then, **execute** these commands in the project directory to get started.

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start

# Build for production
npm run build
```

---

## File Structure

The project works on a component-based structure. The `src` folder contains all the components and the `App.tsx` file which is the main component. The `index.tsx` file is the entry point of the application.

### Folders :

-   `build` : Contains the build files of the application.
-   `node_modules` : Contains all the **dependencies** of the application.
-   `public` : Contains the `index.html` file which is the main HTML file of the application.
-   `src` : Contains all the source code of the application.
    -   `assets`: Contains all the **static** files like fonts (here we are using **Monument Extended**), global styles (**css** styles applied to every page such as color schemes, etc.), and images.
    -   `components`: Contains all the components used in the application. Each component has its **own folder** with the component file (`.tsx`) and its style file (`.scss`).
    -   `context`: Context files are used to share data between components.
    -   `hooks`: In React, hooks are functions that let you "hook into" **states** and **lifecycle** methods. This folder contains all the custom hooks used in the application.
    -   `pages`: Contains all the pages of the application. Each page has its **own folder** with the page file (`.tsx`) and its style file (`.scss`). A page is what the user sees when they navigate to a certain route. Inside a **page** component, we use **components** to build the page.
    -   `utils`: Contains all the utility functions used in the application.

---

## Functionalities and pages

-   ### Welcome

    > **/welcome**

    This is the first page the user sees when he opens the application. It contains a **welcome message** and a **button** to go to the next page.

-   ### Code

    > **/code**

    This page contains a **4-digit code** input and a **button** to go to the next page. The code is used to identify the TOTEM that the user wants to connect to.

-   ### Interface

    > **/:code** _(ex: **/1234**)_

    This is where the user is redirected when he enters the correct code. It contains the **TOTEM interface**. The user can control the TOTEM from this page.

-   ### Admin

    > **/admin**

    This page contains the **admin interface**. The admin can control any TOTEM or group of TOTEMs from this page.

## Available Scripts

In the project directory, you can run:

### `npm start`

**Runs** the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Typescript, check out the [Typescript documentation](https://www.typescriptlang.org/).

To learn SCSS, check out the [SCSS documentation](https://sass-lang.com/documentation).
