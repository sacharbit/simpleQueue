function isAsync(fn) {
   return fn.constructor.name === 'AsyncFunction';
}


var Queue = function(limitConcurringActions = 20, use_async = true, auto_start=true){
  var list_in_queue = [];
  var nb_in_action = 0;
  var limitConcurringActions = limitConcurringActions;
  var use_async = use_async;
  var isWorking = auto_start;

  this.status = function(){
    return {"isWorking" : isWorking, "nb_in_action" : nb_in_action,
  "nb_in_queue" : list_in_queue.length}
  }


  var do_work = function(){
    if(list_in_queue.length > 0
      && nb_in_action < limitConcurringActions
      && isWorking){
      var obj = list_in_queue.shift();
      nb_in_action++;
      if(isAsync(obj.func)){
        obj.func.apply(this, obj.args).then(function(){nb_in_action--;do_work();})
      }
      else{
        obj.func.apply(this, obj.args)
        nb_in_action--;
      }
    }
  }

  this.add = function(func_to_add, args = []){
    list_in_queue.push({"func" : func_to_add, "args" : args});
    do_work();
  }

  this.start = function(){
    isWorking = true;
  }
  this.stop = function(){
    isWorking = false;
  }
}
