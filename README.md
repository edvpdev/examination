# EXAMINATION-APP

# CLONE THE PROJECT
- git init
- git clone 'git@github.com:edvpdev/examination.git'
- cd into examination/backend folder, make .env file with:
  - MONGO_URI = &lt;YOUR MONGO DB URL&gt;
  - JWT_SECRET = &lt;YOUR SECRET TOKEN&gt;
  - PORT = 3000


# LAUNCH NESTJS SERVER

- RUN: npm install
- To fill database with test data:
  - RUN: npm run populate-db
- To launch server:
  - RUN: npm run start:dev

# LAUNCH ANGULAR CLIENT

- cd into examination/frontend folder
- RUN: npm install
- To launch client
  - RUN: npm run start
- Follow Angular URL

# TEST CREDENTIALS (from backend/db-data.ts)

email: 'teacher@example.com',
password: 'teacher'

email: 'admin@example.com',
password: 'admin'

email: 'user1@example.com',
password: 'user1',

email: 'user2@example.com',
password: 'user2',
