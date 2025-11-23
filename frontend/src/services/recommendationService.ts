import axiosInstance from "../utils/axiosInstance.ts";
import {Recommendation, RecommendationFilters} from '../types/recommendation.types';

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
    getUserCVs(){
        return axiosInstance
            .get<ResumeDto[]>('/resume')
            .then((res) =>
                res.data.map((resume) => ({
                    id: resume.id,
                    fileName: resume.filename,
                    uploadedAt: resume.uploadedAt,
                    detectedSkills: [], // TODO: Extract when jsonContent schema defined
                    experienceLevel: '',
                    mainDomain: '',
                    skillGaps: [],
                    completenessScore: 0,
                }))
            )
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to fetch user CVs.');
            });
    },

    /**
     * Get CV/Resume details by ID
     * GET /resume/{id}
     */
    getCVById(cvId: string){
        return axiosInstance
            .get<ResumeDto>(`/resume/${cvId}`)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to fetch CV details.');
            });
    },

    /**
     * Get CV analysis
     * GET /resume/{id}/analysis
     */
    getCVAnalysis(cvId: string){
        return axiosInstance
            .get(`/resume/${cvId}/analysis`)
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to fetch CV analysis.');
            });
    },

    /**
     * Get career recommendations
     * GET /resume/career/recommendations
     */
    getRecommendations(cvIds: string[], recommendationFilters:RecommendationFilters){
        return axiosInstance
            .post<Recommendation[]>('/resume/career/recommendations', {
                cvIds,
                recommendationFilters
            })
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to fetch recommendations.');
            });
    },

    /**
     * Download CV file as Blob
     * GET /resume/{id}/file
     */
    downloadCV(cvId: string){
        return axiosInstance
            .get(`/resume/${cvId}/file`, {
                responseType: 'blob',
            })
            .then((res) => res.data)
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to download CV file.');
            });
    },

    /**
     * Delete a CV
     * DELETE /resume/{id}
     */
    deleteCV(cvId: string){
        return axiosInstance
            .delete(`/resume/${cvId}`)
            .then(() => {})
            .catch((error) => {
                throw new Error(error?.response?.data?.message || 'Failed to delete CV.');
            });
    },
};
