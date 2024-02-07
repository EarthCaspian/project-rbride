

class TokenService {
    getToken() {
        return localStorage.getItem("token");
    }
    setToken(token: string){
        localStorage.setItem("token", token)
    }

    getUserID() {
        const token = this.getToken();
        if (token) {
            try {
                const decodedToken: any = jwt.decode(token);
                if (decodedToken && decodedToken.sub) {
                    return decodedToken.sub;
                } else {
                    console.error('Token içinde kullanıcı kimliği bulunamadı');
                    return null;
                }
            } catch (error) {
                console.error('Token çözülürken bir hata oluştu:', error);
                return null;
            }
        } else {
            console.error('Token bulunamadı');
            return null;
        }
    }
}


export default new TokenService();