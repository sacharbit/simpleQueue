# simpleQueue
The simplest queue of them all : add, start, stop and in under 50 lines of code

## Installation
Put the file in a nodejs app or include it in your webpage the way you want.
If you add it in a nodejs app, don't forget to add :
```javascript
module.export = Queue;
```

## Documentation
```javascript
var queue = new Queue()
```

### Constructor :
Parameters :
- **limitConcurringActions** : Limit of jobs running at the same time.
- **auto_start** : Starts automatically when there is a new job in the queue.

### add :
Add a job to the queue.

Parameters :
- **func_to_add** : The function that will be run by the program
- **args** : An array of the parameters that you want to put in this function

### start :
Starts the queue

### stop :
Stops the queue but finishes the jobs already started.
