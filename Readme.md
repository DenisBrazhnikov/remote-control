Original task scope: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/remote-control/assignment.md

Usage: ``npm run start`` using TS compiler or ``npm run start:dev`` in nodemon mode.

Fallback ports: ``http: 8000``, ``ws: 8080``. Target ports are defined at ``.env`` file.

// Publishing .env's at repos is bad.

// using Jimp package leads to some weired warnings while ``npm i``. ``npm audit-fix`` didn't solve the issue.