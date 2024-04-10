class CustomResponse {
  constructor(data, message = "success", status = 200) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

module.exports = CustomResponse;
