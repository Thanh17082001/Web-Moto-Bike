
import createApiClient from "./api.service";

class commentService {
    constructor(baseUrl = "http://localhost:3000/comment") {
        this.api = createApiClient(baseUrl);
    }
    async getComment(id){
        return (await this.api.get(`/${id}`)).data
    }
    async postComment(data){
        return await this.api.post('/add', data)
    }
}
export default new commentService();