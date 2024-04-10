class CustomResponse {
  constructor(data, status = "success", code = 200) {
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

module.exports = CustomResponse;
