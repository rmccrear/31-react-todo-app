
const API_URL = process.env.REACT_APP_API_URL;

class TodoApi {
  constructor(axios) {
    this.API_URL = API_URL;
    this.modelName = 'todos';
    this.axios = axios;
  }

  getUrl(id) { 
    return `${this.API_URL}/${this.modelName}/${id}`;
  }
  getIndexUrl() {
    return `${this.API_URL}/${this.modelName}`;
  }
  createUrl() { 
    return `${this.API_URL}/${this.modelName}`;
  }
  updateUrl(id) { return this.getUrl(id) };
  deleteUrl(id) { return this.getUrl(id) };

  async getAll(offset, len) {
    const url = this.getIndexUrl();
    const resp = await this.axios.get(url);
    return resp.data;
  }

  async get(id) {
    const url = this.getUrl(id);
    const resp = await this.axios.get(url);
    return resp.data;
  }

  async create(todoObj) {
    const url = this.createUrl();
    const resp = await this.axios.post(url, todoObj);
    return resp.data;
  }

  async update(todoObj) {
    const url = this.updateUrl(todoObj.id);
    const resp = await this.axios.put(url, todoObj);
    return resp.data;
  }

  async delete(id) {
    const url = this.deleteUrl(id);
    const resp = await this.axios.delete(url);
    return resp.data;
  }
}

export default TodoApi;