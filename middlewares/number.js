class number {
  funcList=[];
  value=undefined;
 
  maxvalue(maxval) {
    if (this.value) {
      if (this.value > maxval) {
        return `Error: ${this.value} should be maxvalue ${maxval}`;
      } else return true;
    } else {
      this.funcList.push(`maxvalue;[${maxval}]`);
      return this;
    }
  }
  minvalue(minval) {
    if (this.value) {
      if (this.value < minval) {
        return `Error: ${this.value} should be minvalue ${minval}`;
      } else return true;
    } else {
      this.funcList.push(`minvalue;[${minval}]`);
      return this;
    }
  }
  integer() {
    if (this.value) {
      if (!Number.isInteger(this.value)) {
        return `Error: ${this.value} is not an integer`;
      } else {
        return true;
      }
    } else {
      this.funcList.push("integer;[]");
      return this;
    }
  }
  float() {
    if (this.value) {
      if (
        typeof this.value == "number" &&
        !isNaN(this.value) &&
        !Number.isInteger(this.value)
      ) {
        return true;
      } else {
        return `Error: ${this.value} is not a float`;
      }
    } else {
      this.funcList.push("float;[]");
      return this;
    }
  }
  required(){
    if(!this.value){
      this.funcList.push("required;[]");
      return this;
    } else{
      return true;
    }
  }
  setArgs(val) {
    let listOfReturns = [];
    this.value = val;
    for (let i = 0; i < this.funcList.length; i++) {
      let functionwithargs = this.funcList[i].split(";");

      let funcname = functionwithargs[0];

      let listofargs = JSON.parse(functionwithargs[1]);

      let result;
      if (listofargs.length > 0) {
        result = eval(this[funcname]).apply(this, listofargs);
      } else {
        result = eval(this[funcname]).apply(this);
      }

      if (result != true) {
        listOfReturns.push(result);
      }
    }
    this.funcList = [];
    return listOfReturns;
  }
}
module.exports = {
  number:number
};
