import conf from "../conf/conf.js";
import { v4 as uuidv4 } from 'uuid';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Create User Post
    async createUserPost(file, { Headline, Details, ContactDetails }, Email) {
        try {
            const slug = uuidv4();
            console.log("collection id= " + conf.appwriteCollectionId + " and type =" + typeof(conf.appwriteCollectionId))
            const ImgUrl = await this.UploadFile(file);
            console.log("file uploaded => id= " + ImgUrl);
            const databasereturn = await this.databases.createDocument(
                conf.appwriteDatatbaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Headline,
                    Details,
                    ImgUrl,
                    Email,
                    ContactDetails
                }
            );
            return { databasereturn, slug, Email };
        } catch (error) {
            console.log("error in createUserPost: " + error);
            throw error;
        }
    }

    async UpdateUserPost(slug, { Headline, Details, ImgUrl, ContactDetails }, Email) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatatbaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Headline,
                    Details,
                    ImgUrl,
                    Email,
                    ContactDetails
                }
            );
        } catch (error) {
            console.log("error in UpdateUserPost: " + error);
            throw error;
        }
    }

    async DeleteUserPost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatatbaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("error in DeleteUserPost: " + error);
            return false;
        }
    }

    async GetUserPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatatbaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("error in GetUserPost: " + error);
            return false;
        }
    }
    async fetchAllItems ()  {
        try {
          const documents = await this.databases.listDocuments(
            conf.appwriteDatatbaseId,
             conf.appwriteCollectionId);

          console.log(documents);
          return documents;

        } catch (error) {
          console.error('Error fetching documents:', error);
          return [];
        }
      };

    async GetAllUserPost(queries = [Query.equal("Email", "admin@gmail.com")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatatbaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("error in GetAllUserPost: " + error);
            return false;
        }
    }

    // Upload File Code
    async UploadFile(file) {
        try {
            const fileId = uuidv4();
            await this.storage.createFile(
                conf.appwriteBucketSId,
                fileId,
                file
            );
            return fileId;
        } catch (error) {
            console.log("error in UploadFile: " + error);
            return false;
        }
    }

    async DeleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketSId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("error in DeleteFile: " + error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            const url = this.storage.getFilePreview(
                conf.appwriteBucketSId,
                fileId
            );
            return url;
        } catch (error) {
            console.log("error in getFilePreview: " + error);
            return false;
        }
    }
}

const service = new Service();

export default service;
