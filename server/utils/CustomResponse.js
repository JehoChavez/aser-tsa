class CustomResponse {
  constructor(data, status = 200, message = "success", count = undefined) {
    this.message = message;
    this.status = status;
    this.content = data;
    this.count = count;

    if (status === 201 && message === "success") {
      this.message = "created";
    }
  }
}

module.exports = CustomResponse;
