# What is this ?

its a package that help you get mutiple input from the user 
with the possibility to check there answers with a function 
that can return a boolean or a string after the check 

# Note 

get a array as input and return a arry at the end

# Installation

`npm i questo`

# Use 

```
import { questo } from 'questo';
import {stdin,stdout} from 'process';


const Data_List =
[
    {
        Question: "What color you want to use ?
         \n 1 :- blue \n 2 :- red \n",
        Error_Question : "Wrong answer it should be between (1) or (2)",
        On_Close_Response : " thanks",

        Check : (Input )  =>{
           
            let result = false;
            switch (parseInt(Input)) {
                case 1:
                    return "red";
                case 2:
                    return "blue";
            }
            return result

        } 
    },
        {
        Question: "What is 1 + 1 ?,
        Error_Question : "Wrong answer ",
        On_Close_Response : " thanks",

        Check : (Input )  =>{
           
            let addition = false;
              
              if (parseInt(Input) === 2){
                 return true;
              }
           
            return addition

        } 
    },
];

const quest = new questo({array : Data_List , stdin: stdin , stdout: stdout });


quest.main().on("end",data=>{
    console.log(data)
});


```
or ...

```
const questo = require('questo');

const stdin = require("process").stdin;

const stdout = require("process").stdout;

const Data_List =
[
    {
        Question: "What color you want to use ?
         \n 1 :- blue \n 2 :- red \n",
        Error_Question : "Wrong answer it should be between (1) or (2)",
        On_Close_Response : " thanks",

        Check : (Input )  =>{
           
            let language = false;
            switch (parseInt(Input)) {
                case 1:
                    return "red";
                case 2:
                    return "blue";
            }
            return language

        } 
    },
        {
        Question: "What is 1 + 1 ?,
        Error_Question : "Wrong answer ",
        On_Close_Response : " thanks",

        Check : (Input )  =>{
           
            let addition = false;
              
              if (parseInt(Input) === 2){
                 return true;
              }
           
            return addition

        } 
    },
];

const quest = new questo({array : Data_List , stdin: stdin , stdout: stdout });


quest.main().on("end",data=>{
    console.log(data) // ["red",true]
});

```

