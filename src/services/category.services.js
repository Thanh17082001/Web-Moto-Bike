import createApiClient from "./api.service";

class categoryService {
    constructor(baseUrl = "http://localhost:3000/category") {
        this.api = createApiClient(baseUrl);
    }
    async getCategoryProduct(){
        return (await this.api.get("")).data
    }
}
export default new categoryService();