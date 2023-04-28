import createApiClient from "./api.service";

class productsService {
    constructor(baseUrl = "http://localhost:3000/product") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getProductEqualToZero() {
        return (await this.api.get("/equal-zero")).data;
    }
    async getProductByCategory(id) {
        return (await this.api.get(`/category/${id}`)).data;
    }
    async getProductCompany(id) {
        return (await this.api.get(`/company/${id}`)).data;
    }
    async getProductType(id) {
        return (await this.api.get(`/type/${id}`)).data;
    }
    async getColorProduct(id){
        return (await this.api.get(`/color/${id}`))
    }
    async addProduct(data){
        return await this.api.post('/add', data).data
    }
    async deleteProduct(id){
        return (await this.api.get(`/delete/${id}`))
    }
    async restoreProduct(id){
        return (await this.api.get(`/restore/${id}`))
    }
    async trashProduct() {
        return (await this.api.get("/trash/")).data;
    }
    async getProductById(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async updateProduct(id, data){
        return (await this.api.patch(`update/${id}`, data))
    }

    async search(name){
        return (await this.api.get(`/search/${name}`)).data;
    }
}
export default new productsService();