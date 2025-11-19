import { useState } from "react";

export default function AccountSettings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [loginAlerts, setLoginAlerts] = useState(true);

    const handleToggle = (setting: 'twoFactor' | 'emailNotifications' | 'loginAlerts') => {
        switch(setting) {
            case 'twoFactor':
                setTwoFactorEnabled(!twoFactorEnabled);
                // TODO: Call API to update setting
                break;
            case 'emailNotifications':
                setEmailNotifications(!emailNotifications);
                // TODO: Call API to update setting
                break;
            case 'loginAlerts':
                setLoginAlerts(!loginAlerts);
                // TODO: Call API to update setting
                break;
        }
    };

    return (
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
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
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
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
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
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    loginAlerts ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
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
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        Current Session
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Chrome on Windows • Tunis, TN
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Last active: Just now
                                    </p>
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
    );
}