import axiosInstance from "../utils/axiosInstance.ts";
import { Recommendation, CVSummary } from '../types/recommendation.types';

export interface ResumeDto {
    id: string;
    filename: string;
    contentType: string;
    uploadedAt: string;
    jsonContent?: string;
}

export const recommendationService = {
    /**
     * Get all CVs/Resumes for the current user
     * GET /resume
     */
    async getUserCVs(): Promise<CVSummary[]> {
        try {
            const response = await axiosInstance.get<ResumeDto[]>('/resume');
            return response.data.map((resume) => ({
                id: resume.id,
                fileName: resume.filename,
                uploadedAt: resume.uploadedAt,
                detectedSkills: [],//JSON.parse(resume.jsonContent!).skills, // Can be extracted from jsonContent
                experienceLevel: '',
                mainDomain: '',
                skillGaps: [],
                completenessScore: 0,
            }));
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch user CVs.');
        }
    },

    /**
     * Get CV/Resume details by ID
     * GET /resume/{id}
     */
    async getCVById(cvId: string): Promise<ResumeDto> {
        try {
            const response = await axiosInstance.get<ResumeDto>(`/resume/${cvId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch CV details.');
        }
    },

    /**
     * Get CV analysis
     * GET /resume/{id}/analysis
     */
    async getCVAnalysis(cvId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/resume/${cvId}/analysis`);
            return response.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch CV analysis.');
        }
    },

    /**
     * Get career recommendations
     * GET /resume/career/recommendations
     */
    async getRecommendations(): Promise<Recommendation[]> {
        try {
            const response = await axiosInstance.get('/resume/career/recommendations');
            return response.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to fetch recommendations.');
        }
    },

    /**
     * Download CV file as Blob
     * GET /resume/{id}/file
     */
    async downloadCV(cvId: string): Promise<Blob> {
        try {
            const response = await axiosInstance.get(`/resume/${cvId}/file`, {
                responseType: 'blob',
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to download CV file.');
        }
    },

    /**
     * Delete a CV
     * DELETE /resume/{id}
     */
    async deleteCV(cvId: string): Promise<void> {
        try {
            await axiosInstance.delete(`/resume/${cvId}`);
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || 'Failed to delete CV.');
        }
    },
};
