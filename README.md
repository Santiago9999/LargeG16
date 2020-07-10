# Overview

This architecture document provides context to the how the API works.

## loginAndRegister

Allows the User to login and register (case sensitive):

### /login
* expects

firstName,
lastName,
email,
password

* returns

ID,
firstName,
lastName,
Intro [HighScore, TotalCorrect, TotalAttempted],
CS1 [HighScore, TotalCorrect, TotalAttempted],
CS2 [HighScore, TotalCorrect, TotalAttempted],
Total [HighScore, TotalCorrect, TotalAttempted],
error

### /register

* expects

firstName,
lastName,
email,
password

* returns

firstName,
lastName,
result,
error

### /changePassword

* expects

email,
password

* returns

result,
error

### /validadeUser

* expects

email,
code

* returns

result,
error


