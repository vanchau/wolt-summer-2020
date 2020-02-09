# Wolt-summer-2020

## Option 2) Backend task - search

Setting up the project
1) clone the repository
2) to install dependencies
```sh
yarn install
```
3) to run locally
```sh
yarn start
```
4) Example query:
```sh
/restaurants/search?q=sushi&lat=60.17045&lon=24.93147
``` 
The API accepts three parameters:
- _q_: query string. Full or partial match for the string is searched from _name_, _description_ and _tags_ fields. A minimum length for the query string is one character.
- _lat_: latitude coordinate (customer's location)
- _lon_ : longitude coordinate (customer's location)

5) to run tests
```sh
yarn test
```
