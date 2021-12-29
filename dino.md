#My Dino

##Protocoll
###Mode
Generally the dino can be in different modes. E.g. "blinking" or "only one color".

For communication-purposes each mode can be fully described by a json:
```
{
    "type": "<MODUSNAME/ID>",
    "name": "<MODUSNAME (humanreadable)>",
    "description": "<description>",
    "params": {
        "<Parameter name/id>": {
            "name": "<human readable>",
            "description":"<duhhhh>",
            "type":"COLOR|NUMBER",
            "unit":"<unit of whatever (optional)>",
            "defaultValue": "Am besten hashtag-notation",
            "value": "actual value"
        }
    }
}
```
###Action
The communication is done via *Actions*. There are different types of action, with are encoded in json:
```
{
    "type":"SET_MODE|SET_STATE|INTRODUCTION|ERROR",
    "origin":"Simons Dino",
    "args":{...}
}
```
- *type*: Type of action. Must be either `SETMODE`, `SET_STATE`, `INTRODUCTION`,`ERROR`
- *origin*: Self-description of the issuer
- *args*: room for further arguments specifying the action
####SET_MODE
Updates all Dinos to a possibly new Mode.
```
"args":{
    "newMode": <Mode-json>
}
```

####SET_STATE
Updates all Dino to a possibly new state
```
"args":{
    "newState": <boolean whether  Dino shoul be on>
}
```
####INTRODUCTION
This is automatically and ONLY send on connection. It is used to communicate names, options and current states.
Most of the field are optional.
```json
"args":{
    "name": "<Name of the device introducing itself>",
    "type": "DINO|SERVER|APP",
    "currentState": <current state as boolean>,
    "currentMode": <current Mode as json>,
    "possibleModes": [<mode 1>, <mode 2>,...], #Offered by the device
    "availableModes": [<mode 1>, <mode 2>]
}
```

####ERROR
This is sent to unsuccessful or wronly formatted actions.
```json
"args":{
    "message": "<message>"
}
```
