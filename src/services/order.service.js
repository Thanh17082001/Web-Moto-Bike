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
    async getAll(){
        return (await this.api.get('/')).data
    }
    async getOrderDetailById(id){
        return (await this.api.get(`/order-detail/${id}`)).data
    }
    async statiscal(option){
        return await this.api.post('/statistical', option)
    }
}
export default new orderService();