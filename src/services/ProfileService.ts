import axios, { AxiosResponse } from "axios";
import { GetProfileModel } from "../models/response/GetProfileModel";


const ProfileService = {
    getProfile(userID : any) {
        return fetch(`/api/profiles/${userID}`)
            .then(response => response.json());
    },

    updateProfile(userID : any, userData : any) {
        return fetch(`/api/profiles/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json());
    }
};

export default ProfileService;