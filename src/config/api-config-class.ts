export class ApiConfig {
    data;
    queryParams;
    headers;
    params;
    constructor(data = {}, queryParams = {}, headers:any, params = {}) {
      this.data = data;
      this.queryParams = queryParams;
      this.headers = headers;
      this.params = params;
    }
  }
  