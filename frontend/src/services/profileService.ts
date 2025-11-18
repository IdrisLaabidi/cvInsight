import axios from 'axios';
//import { useAuth } from '../context/AuthContext';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export interface UserProfile {
    id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    bio?: string;
    address?: UserAddress;
    socialLinks?: UserSocialLinks;
}

export interface UserAddress {
    postalCode?: string;
    city?: string;
    country?: string;
}

export interface UserSocialLinks {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
}

class ProfileService {
    private getAuthHeaders() {
        const token = localStorage.getItem('jwt');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    async getCurrentUserProfile(): Promise<UserProfile | null> {
        try {
            const response = await axios.get(`${baseURL}/profile`, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    }

    async getProfileByUserId(userId: string): Promise<UserProfile | null> {
        try {
            const response = await axios.get(`${baseURL}/profile/${userId}`, this.getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    async createOrUpdateProfile(profileData: UserProfile): Promise<UserProfile | null> {
        try {
            console.log('Sending profile data to backend:', profileData);
            const response = await axios.post(`${baseURL}/profile`, profileData, this.getAuthHeaders());
            console.log('Backend response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error saving profile:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            }
            return null;
        }
    }

    async deleteProfile(): Promise<boolean> {
        try {
            await axios.delete(`${baseURL}/profile`, this.getAuthHeaders());
            return true;
        } catch (error) {
            console.error('Error deleting profile:', error);
            return false;
        }
    }
}

export const profileService = new ProfileService();