# Incident Management

This is a simple Incident Management dashboard using React.js, generated using create-react-app.
Current feature:
- Dashboard contains list of the incident.
- Incident detail - click on the incident title.
- Pagination.
- Sorting by Priority & Created time.
- Filter by Status.
- User selection - using dropdown. Not ideal, this is just to simulate different user. Ideally should be handled by login and auth.
- Create incident and assign to user - only Admin.
- Delete incident - only Admin.
- Assign incident to user - only Admin, when creating new incident.
- Acknowledge incident -> will change the status to In Progress. Mark as Resolved -> will change the status to resolved. Only User.
- Confirmation Modal for delete/update.

## Demo
- https://streamable.com/3fomv7

## Technical overview

### I. Main dependency libraries
- [MaterialUI](https://mui.com/): Material UI Library. Reasons for using this:
    - Given the limited time, we can focus more on the overall code, architecture and structure.
    - One of the most popular UI library and easily integrated with another library. E.g. react-hook-form
- [Axios](https://github.com/axios/axios): promise based HTTP client
- [Lodash](https://lodash.com/): functional library for general use
- [Jest](https://jestjs.io/docs/en/getting-started) and [Enzyme](https://airbnb.io/enzyme/docs/api/): js testing framework
- [PropTypes](https://github.com/facebook/prop-types) Runtime type checking for React props and similar objects.
- [ReactHookForm](https://react-hook-form.com/) Form handling, using hooks
- [ESLint](https://eslint.org/) Javascript linter for ES pattern
- [Prettier](https://prettier.io/) Code formatter
- Other supporting libraries, can be found in package.json

### II. Source code architecture
- components folder: Re-usable component, contain stateless component and hooks
- constants folder: Constant
- modules folder: Web pages
- services: Interaction with API
- utils: Helper
- *View file: UI of the screen
- *Handler file: Hooks, event handler, logic
- .test file: Testing
- Not usingTypescript because I think React is going more functional with hooks, hence I'm using PropTypes to check props

### III. Run and Test

To run project (debug - http://localhost:3000):
```bash
npm i && npm start
```

To run project (docker - http://localhost:3000):
```bash
docker pull satriap/incident-react:latest
docker run -it -p 3000:3000 satriap/incident-react
```

To run test:
```bash
npm test
```

## What can be improved (this is not done because of time limit to do both BE and FE, also because of work load in current company)

### I. Feature
- Currently user selection only simulated using dropdown. In real app, Should use login and auth.
- Currently pagination handled in FE. This should be handled in BE.
- There is a partial update (to update status), but there is no feature to do full update of the incident.
- There should be a success/error message, maybe a toast or snackbar once successfully create/update/delete something.
- Create form can be improved by adding Rich Text Editor and upload image, because usually when reporting incident the user will attach screenshot.

### II. Code and library
- Currently all data saved to local state. We should use state container instead, so we don't need to request API everytime we need a data and to avoid prop drilling. E.g. using Redux.
- Should add loader on data request and submit, we can manage the loading state in Redux and create util so all API request will go through this util and don't need to manage loader in each handler.
- `Priority` and `Status` currently hardcoded in Constant. Should store in DB instead.
- All text and label should be using localization
- Currently handler (CommonTableHandler.js and HomeHandler.js) have a quite good Unit Test coverage, but the rest (mostly *View.js file) only tested by comparing snapshot, and coverage is quite low. Should improve by simulating render and adding integration & end-to-end test. 
![](https://i.ibb.co/zV4CYSj/Screen-Shot-2021-12-16-at-4-49-32-PM.png)


## License
[MIT](https://choosealicense.com/licenses/mit/)