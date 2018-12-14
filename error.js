class newError extends Error{
    constructor(code, message, data){
      super(message);
      this.code = code;
      this.message = message;
      this.data = data;
    }

    toJSON() {
      return {
        code: this.code,
        message: this.message,
        data: this.data
      }
    }
  }
  
  module.exports = newError;