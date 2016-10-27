# Loan to Value Calculator

### Install Instructions

Clone the repository - git clone <repo path>

#### Install dependencies

Intall Nodejs - method depends on operating system.

Install node packages

For unit testing install the mocha program.

npm install -g mocha

npm install -g http

npm install -g url

npm install -g mysql

---------------------------

A self signed SSL cert is produced by the following: 

openssl genrsa -des3 -out server.key 1024

openssl req -new -key server.key -out server.csr

cp server.key server.key.org

openssl rsa -in server.key.org -out server.key

openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

----------------------------

#### start server

nodejs loanServer.js

Then point bowser to localhost:8124
