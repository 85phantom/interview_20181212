class newError extends Error{
    constructor(code, message, data){
      super(message);
      this.code = code;
      this.message = message;
      this.data = data;
    }
  }
  
  module.exports = newError;