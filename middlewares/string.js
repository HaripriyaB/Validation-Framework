class string {
  funcList=[];
  value=undefined;

  maxlen(len) {
    if (this.value) {
      if (this.value.length > len) {
        return `Error: ${this.value} should be maxlen ${len}`;
      } else return true;
    } else {
      this.funcList.push(`maxlen;[${len}]`);
      return this;
    }
  }
  minlen(len) {
    if (this.value) {
      if (this.value.length < len) {
        return `Error: ${this.value} should be minlen ${len}`;
      } else return true;
    } else {
      this.funcList.push(`minlen;[${len}]`);
      return this;
    }
  }
  alphanum() {
    const regex = /((^[0-9]+[a-zA-Z]+)|(^[a-zA-Z]+[0-9]+))+[0-9a-zA-Z]*$/i;
    if (this.value) {
      if (regex.test(this.value)) {
        return true;
      } else {
        return `Error: ${this.value} is not alphanum`;
      }
    } else {
      this.funcList.push("alphanum;[]");
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

  email(){
    if(this.value){
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      if(mailformat.test(this.value)){
        return true;
      } else{
        return `Error: ${this.value} is not a valid email format`;
      }
    } else{
      this.funcList.push("email;[]");
      return this;
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
      if(listofargs.length>0){
        result = eval(this[funcname]).apply(this,listofargs);
      } else{
        result = eval(this[funcname]).apply(this);
      }
      
      if (result != true) {
        listOfReturns.push(result);
      }
    }
    return listOfReturns;
  }
}

module.exports = {
  string: string
};
