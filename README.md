- This project was created to generate a living resume that can be update just by updating your repo.

- After interviewing a good number of recruits I realize a regular resume is lacking in details that makes it useful to assess a applicant. I created this resume to focus on skills which is the core of a develop. It allows the user to self rate how proficent they are at a particular skill, how much interest they have in that skill and how long ago they've used it. 

- The same skill sets can be attach to the experiences, so the reader have a clear sense on projects they've worked on and what skill sets were applied.

- This project was write purely using react hooks, creating a redux like store.

- The persistent layer for this project is the repo itself, the app will hold its state in memory while editing, but in order to persist data, the manifest needs to be exported to the clipboard using 'export data' button. Paste this code to he src/manifest.ts and commit the change.

TODO:
- Add drag and drop for reordering for list elements in the app
- Write a better readme
- Add testing
- Fix the generate pdf functionality
- Fix the skill level number type issue (input is a string but the underlining type is a number, while typing a decimal it will read it as NaN)

Use the usual start script and build script to get started

### `npm start`

### `npm run build`
