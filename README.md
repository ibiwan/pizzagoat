## Command-Line Usage

* direct instructions:  
  `npm run start -- driver goat ^v^v^v^v^v`

* instructions from file:  
  `npm run start -- --file PizzaDeliveryInput.txt driver goat`

## REST Server

* start server:  
  `npm run dev`

* GET requests:
  * [one name, GET](http://localhost:3000/team/deliveries?name=driver&instructions=^v^v^v^v^v):

    [http://localhost:3000/team/deliveries?name=driver&instructions=^v^v^v^v^v](http://localhost:3000/team/deliveries?name=driver&instructions=^v^v^v^v^v)

  * [two names, GET](http://localhost:3000/team/deliveries?name=driver&name=goat&instructions=^>v<):
  
    [http://localhost:3000/team/deliveries?name=driver&name=goat&instructions=^>v<](http://localhost:3000/team/deliveries?name=driver&name=goat&instructions=^>v<)

* POST requests:

  * POST endpoint:  
  
    [localhost:3000/team/deliveries](localhost:3000/team/deliveries)

  * POST body, json, one name:

    ```json
    {
        "names":["shrek", "donkey"],
        "instructions":"^v^v^v^v^v"
    }
    ```

  * POST body, json, one name:

    ```json
    {
        "names":["shrek", "donkey"],
        "instructions":"^v^v^v^v^v"
    }
    ```

## Tests and Coverage

* run command:  
   `npm test`

* view coverage:  
  open `coverage/index.html` after running tests
