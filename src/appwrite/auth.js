import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            return true
        } catch (error) {
            console.error("Error in login:", error);
            return false
            
        }
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("Error in createAccount:", error);
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error in getCurrentUser:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in logout:", error);
            
        }
    }
}

const authService = new AuthService();
export default authService;
