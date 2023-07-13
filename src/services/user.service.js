import createApiClient from "./api.service";

class userService {
    constructor(baseUrl = "http://localhost:3000/user") {
        this.api = createApiClient(baseUrl);
    }
    
    async register(data){
        return await this.api.post('/register', data)
    }
    async login(data){
        return await this.api.post('/login', data)
    }
    async getUser(){
        return (await this.api.get('/user-info')).data
    }
    async logOut(){
        return (await this.api.get('/logout')).data
    }
}
export default new userService();