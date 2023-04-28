import createApiClient from "./api.service";

class orderService {
    constructor(baseUrl = "http://localhost:3000/order") {
        this.api = createApiClient(baseUrl);
    }
    async order(data){
        return await this.api.post('/add-order', data)
    }
    async historyOrder(id){
        return await this.api.get(`/history-order/${id}`)
    }
}
export default new orderService();