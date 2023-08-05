import createApiClient from "./api.service";

class cartService {
    constructor(baseUrl = "http://localhost:3000/cart") {
        this.api = createApiClient(baseUrl);
    }
    
    async addProductToCart(data){
        return (await this.api.post('/add', data)).data
    }

    async getProductToCart(data){
        return (await this.api.post('/all', data)).data
    }

    async changeQuanlity(query, data){
        return (await this.api.post(`/change-quanlity?type=${query}`,data)).data
    }

    async updateQuanlity(data){
        return (await this.api.post('/update-quanlity',data)).data
    }

    async deleteQuanlity(data){
        return (await this.api.post('/delete-quanlity',data)).data
    }
   
}
export default new cartService();