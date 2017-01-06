# Loan to Value Calculator

### Build Status

[![Build Status](https://travis-ci.org/carlfahl/loanApp.svg?branch=master)](https://travis-ci.org/carlfahl/loanApp)

### Install Instructions

Clone the repository - git clone <repo path>

#### Install dependencies

Intall Nodejs - method depends on operating system.

Install node packages

For unit testing install the mocha and qunit programs.

npm install -g qunit

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

#### MySQL database setup

create database loanapp;
create table loans(loanID INT NOT NULL AUTO_INCREMENT, amount FLOAT, value FLOAT, ssn INT, loan_status BOOL, point_time TIMESTAMP, PRIMARY KEY (loanID)); 

#### start server

nodejs loanServer.js

Then point bowser to localhost:8124

#### Run tests

nodejs runtest.js
