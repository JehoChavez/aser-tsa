class CustomResponse {
  constructor(data, status = 200, message = "success") {
    this.message = message;
    this.status = status;
    this.data = data;

    if (status === 201 && message === "success") {
      this.message = "created";
    }
  }
}

module.exports = CustomResponse;
