class CustomResponse {
  constructor(data, status = 200, message = "success") {
    this.message = message;
    this.status = status;
    this.content = data;

    if (status === 201 && message === "success") {
      this.message = "created";
    }
  }
}

module.exports = CustomResponse;
