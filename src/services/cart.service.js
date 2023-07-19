import createApiClient from "./api.service";

class cartService {
    constructor(baseUrl = "http://localhost:3000/cart") {
        this.api = createApiClient(baseUrl);
    }
    
    async addProductToCart(data){
        return (await this.api.post('/add', data)).data
    }
   
}
export default new cartService();