# StudentHub — Agile CI/CD Demonstration

A small Student Management System prepared as a demonstration project for the **Agile Software Development FA2** activity. The application lets a user add, search, and delete student records. Browser `localStorage` is used to retain records on the same browser.

## Technology

- HTML, CSS, and vanilla JavaScript for the interface
- Node.js built-in test runner for automated tests
- ESLint for code-quality checks
- GitHub Actions for continuous integration and deployment
- GitHub Pages for hosting the static website

## CI/CD flow

`GitHub → Build → Automated Testing → Code Quality Check → Deployment`

On pushes to `main`, GitHub Actions installs the development tool, builds the static website, runs automated tests, checks JavaScript quality, and deploys the `dist/` website to GitHub Pages only when earlier checks pass. Pull requests run build, tests, and lint but do not deploy.

## Run locally

1. Install Node.js 20 or later from https://nodejs.org/.
2. Extract this project and open the project folder in a terminal.
3. Run `npm install`.
4. Run `npm run build`, `npm test`, and `npm run lint`.
5. To view the UI, open `index.html` in a browser. For the deployed version, GitHub Pages serves the built site from `dist/`.

All checks can be run together with `npm run check` after installing dependencies.

## Agile project plan

### User stories

1. **Add student:** As an administrator, I want to add a student with name, email, course, and year so that the record is stored in the directory.
2. **View directory:** As an administrator, I want to see student details and dashboard counts so that I can understand the current records.
3. **Search records:** As an administrator, I want to search by name, email, course, or year so that I can find a record quickly.
4. **Remove record:** As an administrator, I want to delete an outdated student record so that the directory stays current.
5. **Reliable releases:** As a project team, we want build, tests, and lint to run automatically so that basic errors are found before deployment.

### Sprint planning

| Sprint | Planned work | Deliverable |
|---|---|---|
| Sprint 1 | Confirm user stories; design the dashboard; implement student add/view/search/delete features and browser storage | Working StudentHub application |
| Sprint 2 | Write automated tests; add ESLint; configure GitHub Actions; deploy to GitHub Pages; record the demonstration | Tested application and repeatable CI/CD pipeline |

### Definition of Done (DoD)

- The agreed user story is implemented and usable in the browser.
- Required input validation and clear feedback are present.
- Automated tests pass.
- ESLint reports no configured errors.
- The production build creates the `dist/` folder successfully.
- The GitHub Actions workflow passes on `main`; deployment is completed after successful checks.
- The team reviews the changes and can explain the work in its own words.

### Acceptance criteria — User story 1: Add student

- Given the add-student form is open, when all required fields are valid and the user submits, the new student appears in the directory.
- The total-student and course-related dashboard statistics update.
- The record is saved in browser storage and remains after a page refresh in the same browser.
- If a required field is missing or the email is invalid, the record is not added and a validation message appears.
- If the email already exists, a duplicate record is not added.

## What to demonstrate

1. Open the website and show the dashboard and sample records.
2. Add a valid student and show the count/list updating.
3. Search for a student; then delete a record.
4. Open the GitHub repository's **Actions** tab and show the successful Build, Test, Quality, and Deploy jobs/steps.
5. Open the deployed GitHub Pages site.

## GitHub setup and deployment

1. Create a new **public** GitHub repository (for example, `studenthub-agile-cicd`).
2. Copy the files and folders from this project into the repository, including the hidden `.github` folder.
3. Commit and push to the `main` branch. If you work locally, run `npm install` first and add the generated `package-lock.json` to the repository for reproducible installs.
4. In GitHub, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
5. Open **Actions** and check the `StudentHub CI/CD Pipeline` workflow. Resolve any failures before continuing.
6. After a successful run, open **Settings → Pages** to find the site URL. It usually follows `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

### Example commands

```bash
git init
git add .
git commit -m "Add StudentHub Agile CI/CD project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/studenthub-agile-cicd.git
git push -u origin main
```

Replace the example repository URL with your own. Do not paste passwords, access tokens, or secrets into code or the repository.

