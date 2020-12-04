# EXAMINATION-APP

# CLONE THE PROJECT
git clone git@github.com:edvpdev/examination.git
cd into examination/backend folder, create .env file, fill with:
MONGO_URI = <YOUT MONGO DB URLL>
JWT_SECRET = viensdutrys
PORT = 3000

# LAUNCH NESTJS SERVER
RUN npm install
TO FILL DB WITH TEST DATA
RUN npm run populate-db
LAUNCH SERVER
RUN: npm run start:dev

# LAUNCH ANGULAR CLIENT
cd into examination/frontend folder
RUN npm install
LAUNCH CLIENT
RUN: npm run start
follow Angular URL

# TEST CREDENTIALS (from backend/db-data.ts)
email: 'teacher@example.com',
password: 'teacher'

email: 'admin@example.com',
password: 'admin'

email: 'user1@example.com',
password: 'user1',

email: 'user2@example.com',
password: 'user2',
