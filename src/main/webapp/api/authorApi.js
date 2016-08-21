import axios from "axios";

class AuthorApi {
    static getAllAuthors() {
        return axios(
            {
                url: "http://localhost:8080/api/authors",
                timeout: 20000,
                method: "get",
                responseType: "json"
            }
        );
    }
}

export default AuthorApi;