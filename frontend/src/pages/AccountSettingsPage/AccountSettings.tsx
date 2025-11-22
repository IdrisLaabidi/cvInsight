import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";

import { useAuth } from "../../context/AuthContext.tsx";
import Label from "../../components/form/Label.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";


export default function AccountSettings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [loginAlerts, setLoginAlerts] = useState(true);


    const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    const { isOpen: isPasswordModalOpen, openModal: openPasswordModal, closeModal: closePasswordModal } = useModal();

    const handleToggle = (setting: 'twoFactor' | 'emailNotifications' | 'loginAlerts') => {
        switch(setting) {
            case 'twoFactor':
                setTwoFactorEnabled(!twoFactorEnabled);
                break;
            case 'emailNotifications':
                setEmailNotifications(!emailNotifications);
                break;
            case 'loginAlerts':
                setLoginAlerts(!loginAlerts);
                break;
        }
    };

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Account Settings"/>
            {/* Security Settings Card */}
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                        Security Settings
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        Manage your account security preferences and notifications.
                    </p>

                    <div className="space-y-6">
                        {/* Two-Factor Authentication */}
                        <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        Two-Factor Authentication
                                    </h5>
                                    {twoFactorEnabled && (
                                        <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                            Enabled
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Add an extra layer of security by requiring a verification code when signing in.
                                </p>
                            </div>
                            <button
                                onClick={() => handleToggle('twoFactor')}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                                    twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </button>
                        </div>

                        {/* Email Notifications */}
                        <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                                <h5 className="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">
                                    Email Notifications
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Receive email updates about your account activity and security.
                                </p>
                            </div>
                            <button
                                onClick={() => handleToggle('emailNotifications')}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </button>
                        </div>

                        {/* Login Alerts */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h5 className="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">
                                    Login Alerts
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Get notified when there's a new login to your account from an unrecognized device.
                                </p>
                            </div>
                            <button
                                onClick={() => handleToggle('loginAlerts')}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                                    loginAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    loginAlerts ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </button>
                        </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <h5 className="mb-4 text-sm font-medium text-gray-800 dark:text-white/90">
                            Active Sessions
                        </h5>
                        <div className="space-y-3">
                            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">Current Session</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Chrome on Windows • Tunis, TN</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Last active: Just now</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Card */}
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">Password</h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Change your password to keep your account secure
                        </p>
                    </div>
                    <button
                        onClick={openPasswordModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Change Password
                    </button>
                </div>
            </div>

            {/* Delete Account Card */}
            <div className="p-5 border-2 border-red-200 rounded-2xl dark:border-red-900/50 lg:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h4 className="text-lg font-semibold text-red-600 dark:text-red-400">Delete Account</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                All your profile data will be permanently deleted
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                All your files and content will be removed
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                This action cannot be undone
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={openDeleteModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-300 bg-white px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-900/20 lg:w-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Modals */}
            <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
            <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
        </div>
    );
}

// Password Change Modal
function PasswordChangeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else {
            if (formData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
            else if (!/(?=.*[a-z])/.test(formData.newPassword)) newErrors.newPassword = 'Must contain a lowercase letter';
            else if (!/(?=.*[A-Z])/.test(formData.newPassword)) newErrors.newPassword = 'Must contain an uppercase letter';
            else if (!/(?=.*\d)/.test(formData.newPassword)) newErrors.newPassword = 'Must contain a number';
            else if (formData.newPassword === formData.currentPassword) newErrors.newPassword = 'New password must be different';
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(''); setErrorMessage('');
        if (!validateForm()) { setErrorMessage('Please fix the errors'); return; }
        setIsLoading(true);
        try {
            // TODO: Call your API
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccessMessage('Password changed successfully!');
            setTimeout(() => { setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' }); onClose(); }, 1500);
        } catch { setErrorMessage('Error changing password. Please try again.'); }
        finally { setIsLoading(false); }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    };

    const EyeIcon = ({ show }: { show: boolean }) => show ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
    ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
            <div className="relative w-full p-4 bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Change Password</h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Enter your current password and choose a new one</p>

                {successMessage && <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="font-medium">{successMessage}</span></div>}
                {errorMessage && <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg><span className="font-medium">{errorMessage}</span></div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((field, i) => (
                        <div key={field}>
                            <Label>{['Current Password', 'New Password', 'Confirm New Password'][i]}</Label>
                            <div className="relative">
                                <Input type={showPasswords[(['current', 'new', 'confirm'] as const)[i]] ? "text" : "password"} value={formData[field]} onChange={(e) => handleInputChange(field, e.target.value)} placeholder={`Enter your ${['current', 'new', 'new'][i]} password`} />
                                <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, [(['current', 'new', 'confirm'] as const)[i]]: !prev[(['current', 'new', 'confirm'] as const)[i]] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <EyeIcon show={showPasswords[(['current', 'new', 'confirm'] as const)[i]]} />
                                </button>
                            </div>
                            {errors[field] && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[field]}</p>}
                            {field === 'newPassword' && <p className="mt-1 text-xs text-gray-500">Min 8 chars with uppercase, lowercase and number</p>}
                        </div>
                    ))}
                    <div className="flex items-center gap-3 pt-4">
                        <Button size="sm" variant="outline" onClick={onClose} type="button" className="flex-1">Cancel</Button>
                        <Button size="sm" type="submit" disabled={isLoading} className="flex-1">{isLoading ? 'Changing...' : 'Change Password'}</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
// Delete Account Modal
function DeleteAccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const auth = useAuth();
    const [confirmText, setConfirmText] = useState('');
    // const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(''); setErrors({});
        const newErrors: Record<string, string> = {};
        // if (!password) newErrors.password = 'Password is required to confirm deletion';
        if (confirmText !== 'DELETE') newErrors.confirmText = 'Please type DELETE to confirm';
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

        setIsLoading(true);
        try {
            const response = await fetch(`${backendUrl}/profile`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (response.status) {
                auth.logout();}else {alert("Erreur : impossible de supprimer le compte.");}
        } catch { setErrorMessage('Error deleting account. Please try again.'); }
        finally { setIsLoading(false); }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
            <div className="relative w-full p-4 bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-900/20">
                        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Delete Account</h4>
                </div>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">This action is permanent and cannot be undone. All your data will be permanently deleted.</p>

                {errorMessage && <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg><span className="font-medium">{errorMessage}</span></div>}

                <form onSubmit={handleDelete} className="space-y-5">
                    {/*<div>
                        <Label>Enter your password to confirm</Label>
                        <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => { const n = {...p}; delete n.password; return n; }); }} placeholder="Your current password" />
                        {errors.password && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password}</p>}
                    </div>*/}
                    <div>
                        <Label>Type <span className="font-bold text-red-600">DELETE</span> to confirm</Label>
                        <Input type="text" value={confirmText} onChange={(e) => { setConfirmText(e.target.value); if (errors.confirmText) setErrors(p => { const n = {...p}; delete n.confirmText; return n; }); }} placeholder="DELETE" />
                        {errors.confirmText && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confirmText}</p>}
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                        <Button size="sm" variant="outline" onClick={onClose} type="button" className="flex-1">Cancel</Button>
                        <button type="submit" disabled={isLoading} className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Deleting...' : 'Delete My Account'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}