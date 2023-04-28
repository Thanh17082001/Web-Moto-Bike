import createApiClient from "./api.service";

class typeService {
    constructor(baseUrl = "http://localhost:3000/type") {
        this.api = createApiClient(baseUrl);
    }
    async getTypeProduct(){
        return (await this.api.get("")).data
    }
}
export default new typeService();