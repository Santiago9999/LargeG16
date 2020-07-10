# Overview

This architecture document provides context to the how the API works.

## loginAndRegister

Allows the User to login and register (case sensitive):

### /getLogin (get)
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

### /postRegister

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

### /postChangePassword

* expects

email,
password

* returns

result,
error

### /postvalidateUser

* expects

email,
code

* returns

result,
error

## updateUserData
### /postUpdateIntro && /postUpdateCS1 && /postUpdateCS2

* expects
_id,
firstName,
lastName,
score,

* returns
Phase1: phase1,
Phase2: phase2,
Phase3: phase3,
Phase4: phase4,

## getScores
### /getIntroHighScores && /getCS1HighScores && /getCS2HighScores && /getTotalHighScores

* expects
numberOfSpots,

* returns
[
    {
        "_id": "5f0800b18ba7c74e07c4e6ed",
        "UserID": "5f07fd3b9215af4a66469b7c",
        "FirstName": "Juan",
        "LastName": "Herrera",
        "HighScore": 15,
        "TotalCorrect": 60,
        "TotalAttempted": 80,
        "__v": 0
    },
    {
        "_id": "5f08011d8ba7c74e07c4e6f4",
        "UserID": "5f0801068ba7c74e07c4e6ee",
        "FirstName": "Juan",
        "LastName": "Herrera",
        "HighScore": 15,
        "TotalCorrect": 15,
        "TotalAttempted": 20,
        "__v": 0
    }
]

## Questions
### /addQuestion

* expects
question,
possibleAnswer1,
possibleAnswer2,
possibleAnswer3,
possibleAnswer4,
category,

* returns
result : results,
error : error

### /getQuestion
* expects
question,
possibleAnswer1,
possibleAnswer2,
possibleAnswer3,
possibleAnswer4,
category,

* returns
[
    {
        "_id": "5f08cb12faad4bd89dba002b",
        "Question": "What is the range of numbers that can be stored in the 'int' data type?",
        "PossibleAnswer1": "-2^31 to 2^31-1",
        "PossibleAnswer2": "-2^31 to 2^31-1",
        "PossibleAnswer3": "-2^7 to 2^7-1",
        "PossibleAnswer4": "-2^63 to 2^63-1",
        "Category": "Intro",
        "__v": 0
    }
]
