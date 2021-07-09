class CreateSchema {
  schema = {};
  required = [];
  constructor(schema) {
    this.schema = schema;
    var list = [];
    for (const arg in schema) {
      if (Object.hasOwnProperty.call(schema, arg)) {
        let listOfConditions = this.schema[arg].funcList;
        if (listOfConditions.includes("required;[]")) {
          list.push(arg);
        }
      }
    }
    this.required = list;
  }

  validator(args) {
    for (let i = 0; i < this.required.length; i++) {
      if (!args[this.required[i]]) {
        return `Error: ${this.required[i]} is required`;
      }
    }

    let listOfErrors = [];

    for (const arg in args) {
      if (Object.hasOwnProperty.call(args, arg)) {
        const key = args[arg];

        let func = this.schema[arg];

        let list = func.setArgs(key);

        if (list.length > 0) {
          listOfErrors.push(list);
        }
      }
    }
    if (listOfErrors.length > 0) {
      return listOfErrors;
    }
    return true;
  }
}

module.exports = {
  CreateSchema: CreateSchema,
  string: require("./middlewares/string").string,
  number: require("./middlewares/number").number
};
