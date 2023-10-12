## Installation

In the project directory, run:

```npm install```
or
```yarn```


## Configuration

Rename `template.env` to `.env` and replace the following placeholders:

|Placeholder|   |
|---|---|
|`__TEST_TOKEN_VALUE__`|__Hardcoded token value used in the testing suite.__|


## Usage

1. (Running the API server) In the project directory, run:

```npm run start-server```
or
```yarn start-server```

2. (Running the test suite) While the API server is running, in the project directory, run:

```npm run start```
or
```yarn start```


## Notes

All code written for the purpose of the assignment is contained within the `/api` folder, inferring the code conventions present in the test suite file (similarly for not using typescript). 

---

### GAN Integrity backend code challenge

The script `index.js` uses a local api to perform various operations on a set of cities. Your task is to implement an api so that the script runs successfully all the way to the end.

Run `npm install` and `npm run start` to start the script.

Your api can load the required data from [here](addresses.json).

In the distance calculations you can assume the earth is a perfect sphere and has a radius is 6371 km.

Once you are done, please provide us with a link to a git repo with your code, ready to run.
