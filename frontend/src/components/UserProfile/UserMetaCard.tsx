import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuth } from "../../context/AuthContext.tsx";
import { UserProfile, profileService } from "../../services/profileService";
import { useState, useEffect } from "react";

export default function UserMetaCard() {
    const { isOpen, openModal, closeModal } = useModal();
    const auth = useAuth();
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (auth.userProfile) {
            setFormData({
                firstName: auth.userProfile.firstName || '',
                lastName: auth.userProfile.lastName || '',
                phone: auth.userProfile.phone || '',
                bio: auth.userProfile.bio || '',
                socialLinks: auth.userProfile.socialLinks || {
                    facebook: '',
                    linkedin: '',
                    twitter: '',
                    github: '',
                    instagram: ''
                }
            });
        }
    }, [auth.userProfile, isOpen]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const savedProfile = await profileService.createOrUpdateProfile(formData as UserProfile);
            if (savedProfile) {
                auth.setUserProfile(savedProfile);
                closeModal();
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSocialLinkChange = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const getInitials = () => {
        const firstName = auth.userProfile?.firstName || auth.user?.username.split(' ')[0] || 'U';
        const lastName = auth.userProfile?.lastName || auth.user?.username.split(' ')[1] || '';

        if (!lastName) return firstName[0].toUpperCase();
        return (firstName[0] + lastName[0]).toUpperCase();
    };

    const getDisplayName = () => {
        if (auth.userProfile?.firstName && auth.userProfile?.lastName) {
            return `${auth.userProfile.firstName} ${auth.userProfile.lastName}`;
        }
        return auth.user?.username || 'User';
    };

    const getLocation = () => {
        const city = auth.userProfile?.address?.city;
        const country = auth.userProfile?.address?.country;
        if (city && country) return `${city}, ${country}`;
        if (city) return city;
        if (country) return country;
        return 'Location not set';
    };

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="mr-3 flex h-15 w-15 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-lg">
                            {getInitials()}
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {getDisplayName()}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {auth.userProfile?.firstName}
                                </p>
                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {getLocation()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                            {auth.userProfile?.socialLinks?.facebook && (
                                <a href={auth.userProfile.socialLinks.facebook} target="_blank" rel="noopener" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                    {/* Facebook SVG */}
                                </a>
                            )}
                            {auth.userProfile?.socialLinks?.twitter && (
                                <a href={auth.userProfile.socialLinks.twitter} target="_blank" rel="noopener" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                    {/* Twitter SVG */}
                                </a>
                            )}
                            {auth.userProfile?.socialLinks?.linkedin && (
                                <a href={auth.userProfile.socialLinks.linkedin} target="_blank" rel="noopener" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                    {/* LinkedIn SVG */}
                                </a>
                            )}
                            {auth.userProfile?.socialLinks?.instagram && (
                                <a href={auth.userProfile.socialLinks.instagram} target="_blank" rel="noopener" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                    {/* Instagram SVG */}
                                </a>
                            )}
                        </div>
                    </div>
                    <button onClick={openModal} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z" fill="" /> </svg>
                        Edit
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Personal Information
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your profile up-to-date.
                        </p>
                    </div>
                    <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Social Links
                                </h5>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <Label>Facebook</Label>
                                        <Input
                                            type="text"
                                            value={formData.socialLinks?.facebook || ''}
                                            onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                            placeholder="https://www.facebook.com/yourprofile"
                                        />
                                    </div>
                                    <div>
                                        <Label>X.com</Label>
                                        <Input
                                            type="text"
                                            value={formData.socialLinks?.twitter || ''}
                                            onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                            placeholder="https://x.com/yourprofile"
                                        />
                                    </div>
                                    <div>
                                        <Label>Linkedin</Label>
                                        <Input
                                            type="text"
                                            value={formData.socialLinks?.linkedin || ''}
                                            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                            placeholder="https://www.linkedin.com/in/yourprofile"
                                        />
                                    </div>
                                    <div>
                                        <Label>Instagram</Label>
                                        <Input
                                            type="text"
                                            value={formData.socialLinks?.instagram || ''}
                                            onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                            placeholder="https://instagram.com/yourprofile"
                                        />
                                    </div>
                                    <div>
                                        <Label>GitHub</Label>
                                        <Input
                                            type="text"
                                            value={formData.socialLinks?.github || ''}
                                            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                            placeholder="https://github.com/yourprofile"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-7">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Personal Information
                                </h5>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>First Name</Label>
                                        <Input
                                            type="text"
                                            value={formData.firstName || ''}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Last Name</Label>
                                        <Input
                                            type="text"
                                            value={formData.lastName || ''}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Email Address</Label>
                                        <Input
                                            type="text"
                                            value={auth.user?.email || ''}
                                            disabled
                                            className="opacity-70"
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <Label>Phone</Label>
                                        <Input
                                            type="text"
                                            value={formData.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Label>Bio</Label>
                                        <Input
                                            type="text"
                                            value={formData.bio || ''}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal} type="button">
                                Close
                            </Button>
                            <Button size="sm" type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}