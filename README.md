# Secret Friend Online &#x1F381; &#x1F389;

[![Deploy Status](https://github.com/juliojoqbay7/secret-friend/actions/workflows/pages/pages-build-deployment/badge.svg)](https://juliojoqbay7.github.io/secret-friend/)

A simple, modern, and responsive web application for running Secret Santa (or Gift Exchange) drawings online. Built with **Vite**, **TypeScript**, **HTML**, and **CSS**, this project is perfect for those who want to practice web programming, create a quick and fun drawing, or learn about the technologies used.

## &#x1F680; Demo

**[Try the live application!](https://juliojoqbay7.github.io/secret-friend/)** &#x1F517;

![Secret Friend App Demo](/assets/overviewOne.gif)

## &#128241; Responsive

![Secret Friend App Demo](/assets/overviewTwo.gif)

## &#x2728; Features

* **Add Participants:** Add as many participants as you want, with validation to prevent empty or duplicate names.
* **Remove Participants:** Remove participants from the list with a single click.
* **Random Draw:** Run the draw fairly and impartially, ensuring that each participant is assigned another person (and not themselves).
* **Secret Reveal:** Each participant can enter their name to reveal *only* their assigned secret friend, maintaining the suspense!
* **User-Friendly Interface:** Clean, modern, and responsive design, adapted for mobile phones, tablets, and desktops.
* **"About" Page:** Information about the project, the technologies used, and a link to the source code on GitHub.
* **Reset Application:** A button to reset the application and start a new draw.
* **Visual Feedback:** Success and error messages for user actions.

## &#x1F4BB; Technologies Used

This project was built with the following technologies:

* **[Vite](https://vitejs.dev/):** An extremely fast build tool that provides a streamlined development environment for modern web applications.
* **[TypeScript](https://www.typescriptlang.org/):** A superset of JavaScript that adds static typing, making the code safer, more readable, and easier to maintain.
* **[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5):** The latest version of the HTML markup language, used to structure the content of the page. We use semantic tags for improved accessibility and code organization.
* **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS):** The latest version of the CSS styling language, used to style the page and make it visually appealing. We use CSS variables (custom properties) for easy theme maintenance (based on Dracula), Flexbox for responsive layouts, and CSS animations for extra visual flair.
* **[Font Awesome](https://fontawesome.com/):** An icon library (used for the trash can icon to remove participants).
* **[Devicon](https://devicon.dev/):**  An icon library for technology icons.
* **[GitHub Pages](https://pages.github.com/):** Used to host the application for free and easily.
* **[GitHub Actions](https://github.com/features/actions):** GitHub's CI/CD (Continuous Integration and Continuous Delivery) tool, used to automate the build and deploy process to GitHub Pages.

## &#x1F6E0;&#xFE0F; Installation and Running (Local)

If you want to run this project locally (on your computer), follow these steps:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/juliojoqbay7/secret-friend.git](https://github.com/juliojoqbay7/secret-friend.git)
    ```

2. **Navigate to the project folder:**

    ```bash
    cd secret-friend
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start a local server. The terminal will show the address (usually `http://localhost:5173` or `http://localhost:3000`).

5. **Open your browser:**

    Open the address provided by Vite in your browser.

## &#x1F4DC; Project Structure

The project is organized as follows:

```
secret-friend/
├── node_modules/       (npm dependencies - you don't normally modify this)
├── public/             (Static assets - images, icons, etc.)
│   ├── dev.svg
│   ├── illustration1.svg
│   └── illustration2.svg
├── src/                (The application's source code)
│   ├── components/     (Reusable components)
│   │   ├── Footer/     # Footer
│   │   │   ├── Footer.css
│   │   │   └── Footer.ts
│   │   ├── Header/     # Header (with menu)
│   │   │   ├── Header.css
│   │   │   └── Header.ts
│   │   ├── Link/       # Link component for navigation
│   │   │   └── Link.ts
│   │   ├── Main/       # Main content of the home page
│   │   │   ├── Main.css
│   │   │   └── Main.ts
│   │   └── Page/       # Base layout of each page
│   │       ├── Page.css
│   │       └── Page.ts
│   ├── pages/          (Application pages)
│   │   └── About/      # "About" page
│   │       ├── About.css
│   │       └── About.ts
│   ├── styles/
│   │   ├── reset.css   # CSS Reset
│   │   └── style.css  # Global styles
│   ├── main.ts        # TypeScript entry point
│   └── index.html     # Main HTML file
├── .github/            # GitHub configurations
│   └── workflows/      # GitHub Actions workflows
│       └── deploy.yml  # Deploy workflow for GitHub Pages
├── .gitignore          # Files/folders ignored by Git
├── index.html          # Root HTML (generated by Vite)
├── package-lock.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Description:**

* **`public/`:** Contains the SVG illustrations used in the project.
* **`src/components/`:**
  * **`Footer/`:** Footer component, with the current year and developer name.
    * **`Header/`:** Header component, with the title (or logo) and navigation menu.
    * **`Link/`:** Custom link component for navigation between pages.
    * **`Main/`:** Main component of the home page, containing all the logic and interface for the Secret Santa game.
    * **`Page/`:** Component that defines the basic layout of each page (header, main content, and footer).
* **`src/pages/`:**
  * **`About/`:** Component for the "About" page, with information about the project and the technologies used.
* **`src/styles/`:**
  * **`reset.css`:** Resets the default browser styles to ensure consistency.
    * **`style.css`:** Global styles for the application, including CSS variables for colors (Dracula theme).
* **`src/main.ts`:** Entry point of the application. Responsible for rendering the initial page and managing navigation between pages.
* **`src/index.html`:** Main HTML file, with the basic page structure and the import of `main.ts`.
* **`.github/workflows/deploy.yml`:** GitHub Actions configuration file, which automates deployment to GitHub Pages.
* **`vite.config.ts`:** Vite configuration file.

## &#x1F9E0; Application Logic (Detailed Flow)

The main logic of the application resides in the `Main.ts` component. Here's a summary of the workflow:

1. **Initialization:**
    * `main.ts` imports the necessary components and styles.
    * The `renderPage('home')` function is called to render the initial page.
    * `renderPage` clears the content of the `#app` element and renders the `Page` component, passing `Main` as `children`.
    * The `Page` component renders the `Header`, `Main` (which contains the game logic), and `Footer`.
    * Inside `Main`, the DOM elements are selected (buttons, inputs, etc.) and stored in variables.
    * State variables (`participants`, `pairs`, `isDrawing`) are initialized.
    * The `updateUI()` function is called to set the initial state of the interface (enable/disable buttons, etc.).
    * Event listeners are added to the buttons and the reveal input field.

2. **Adding a Participant:**
    * The user types a name in the text field and clicks the "Add" button.
    * The button's click event listener calls the `addParticipant()` function.
    * `addParticipant()`:
        * Gets the name entered, removes leading/trailing whitespace, and validates that the name is valid and not a duplicate.
        * If the name is valid, it adds the participant to the `participants` array.
        * Clears the text field.
        * Displays a success message.
        * Calls `clearDrawResult()` to clear any previous draw results.
        * Calls `renderParticipantList()` to update the participant list in the interface.
        * Calls `updateUI()` to update the button states.

3. **Removing a Participant:**
    * The user clicks the remove button (trash can icon) next to a name.
    * The button's event listener calls the `removeParticipant()` function.
    * `removeParticipant()`:
        * Gets the index of the participant to be removed from the `data-index` attribute of the button.
        * Removes the participant from the `participants` array using `splice()`.
        * Calls `renderParticipantList()` to update the list.
        * Calls `updateUI()` to update the button states.
        * Displays a success message.

4. **Drawing the Secret Santa:**
    * The user clicks the "Draw Secret Friend" button.
    * The button's click event listener calls the `drawSecretFriend()` function.
    * `drawSecretFriend()`:
        *Checks if there are at least two participants. If not, it displays an error message and returns.
        *Sets `isDrawing` to `true` (indicates that the draw is in progress).
        * Calls `updateUI()` to disable buttons.
        *Displays "Drawing..." message
        * Uses `setTimeout` to simulate a delay (for visual feedback). Inside `setTimeout` (after the delay):
            *Creates a *copy* of the `participants` array and shuffles it using the Fisher-Yates algorithm.
            * Calls the `createPairs()` function to generate the Secret Santa pairs.
            *Sets `isDrawing` to `false`.
            * Calls `updateUI()` to update the interface (enable buttons, show the reveal container).
            * Displays a success message.

5. **Revealing the Secret Friend:**
    * The user types their name in the text field and clicks the "Reveal My Secret Friend" button.
    * The button's click event listener calls the `revealSecretFriend()` function.
    * `revealSecretFriend()`:
        * Gets the name entered and removes leading/trailing whitespace.
        * Checks if the field is empty. If it is, it displays an error message and returns.
        * Searches the `pairs` array for the matching participant.
        * If the pair is found, it displays the name of the secret friend in the `drawResult` element.
        * If the pair is not found, it displays an error message.
        * Clears the input field.
        * Calls `updateUI()` to update the button states.
    * The `input` event listener on the `#reveal-name` input calls `updateUI()` on every keystroke, enabling/disabling the "Reveal" button.

6. **Resetting the Application:**
    * The user clicks on reset application button.
    * The event listener of the button call the `resetApp` function.
    * The `resetApp` function clear all arrays and variables, clean the text fields, render the list and hide the reveal area and disable the buttons.

7. **Navigation (Home/About):**
    * The user clicks a link in the menu (Home or About).
    * The link's event listener (in the `Link` component) calls the `onNavigate` function (which is the `renderPage` function passed as a prop), passing the page name.
    * `renderPage` clears the content of the `#app` element and renders the correct page (using the `Page` component).

**Helper Functions:**

* **`showMessage(element, message, type)`:** Generic function to display error or success messages in a specified HTML element.
* **`clearDrawResult()`:** Clears the draw-related messages (both error/success messages and the final result).
* **`updateUI()`:** Centralized function to update the user interface state (enable/disable buttons, show/hide elements).
* **`createPairs(shuffledParticipants)`:** Function that takes the shuffled array of participants and returns an array of [participant, secretFriend] pairs.

**Components:**

* **`Page`:** Defines the basic layout of each page (header, main content, footer). Receives the page content as the `children` prop.
* **`Header`:** Renders the header, including the title and navigation menu.
* **`Footer`:** Renders the footer.
* **`Link`:** Component to create navigation links, encapsulating the logic to prevent page reloads.
* **`Main`:** Main component of the home page, containing the logic and interface of the game.
* **`About`:** Component for the "About" page.

**CSS (Styles):**

* **`reset.css`:** Resets the default browser styles.
* **`style.css`:** Global styles (CSS variables for colors, `body`, `#app`, and `.container` styles).
* **Component CSS:** Each component has its own CSS file (e.g., `Main.css`, `Header.css`, `About.css`), containing styles specific to that component. This improves organization and maintainability.
* **Flexbox:** Used extensively for creating flexible and responsive layouts.
* **Media Queries:** Used to adapt the layout to different screen sizes (responsiveness).
* **Animations:** Used to add animations on images.

This detailed README provides a comprehensive overview of your project, from conception and technologies used to internal logic, code structure, and usage instructions. It is suitable for recruiters, professors, and other developers who want to understand and contribute to your project. Remember to replace the placeholders (like GitHub links, GIF animation, etc.) with your actual values. A good README makes a *big* difference in the presentation of a project!
