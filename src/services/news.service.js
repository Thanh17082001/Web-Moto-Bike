
import createApiClient from "./api.service";

class newsService {
    constructor(baseUrl = "http://localhost:3000/news") {
        this.api = createApiClient(baseUrl);
    }
    async fetchNews(){
        return (await this.api.get("/")).data
    }
    async postNews(data){
        return await this.api.post('/add', data)
    }
    async deleteNews(id){
        return await this.api.delete(`/delete/${id}`)
    }
}
export default new newsService();