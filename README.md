# SpotWise
<br>

## ABSTRACT
<p>
The Smart Parking System with Indoor Navigation and
Payment Calculation introduces a paradigm shift in the realm
of urban mobility. By harnessing the capabilities of inertial
sensors, the project addresses the limitations of traditional
GPS-based systems in indoor environments. These sensors,
including accelerometers and gyroscopes, enable accurate
estimation of movement and directional changes, empowering
users to navigate intricate indoor parking spaces seamlessly.
</p>
<p>Through the integration of real-time parking availability
updates, the system tackles one of the most persistent
challenges in urban settings: parking congestion. Users gain
access to up-to-the-minute information about available
parking spots, minimizing search times and alleviating traffic
buildup. Furthermore, the project's user-centric approach
extends to the payment process, where duration-based
calculations ensure fair and transparent fees. With the
integration of trusted payment gateways like Razorpay, the
system guarantees secure transactions and a frictionless
payment experience.</p>

## How to run the code?

<p> First copy and paste the 

``` .example.env ```
 to your local 
 ``` .env ```

</p>

### start docker and setup db

<p> We use postgresql for database and supabase for authentication </p>
<p> Run this first </p>

``` 
docker run -p 3567:3567 -d registry.supertokens.io/supertokens/supertokens-postgresql:7.0 
```

### Backend Code

<p> Nodejs is used in backend </p>
<p> To start backend </p>

``` 
node app.j
 ```
or

``` 
nodemon app.js
 ```

### Frontend Code 

<p> Used React native to develop frontend </p>

```
cd client\ 
npm start
```

<p> To run the docker container of frontend 

```
 docker run -p 3000:3000 spotwise
```
ACORN
```
acorn run -i -n app .
```