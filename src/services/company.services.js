import createApiClient from "./api.service";

class companyService {
    constructor(baseUrl = "http://localhost:3000/company") {
        this.api = createApiClient(baseUrl);
    }
    async getCompanyProduct(){
        return (await this.api.get("")).data
    }
}
export default new companyService();