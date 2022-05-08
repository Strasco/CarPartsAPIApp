class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message); //this message comes from Error super class
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
