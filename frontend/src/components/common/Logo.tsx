type LogoProps = {
    size?: number;
    titleColor?: string;
    subtitleColor?: string;
    showSubtitle?: boolean;
    className?: string;
};

export default function Logo({
                                 size = 70,
                                 titleColor = "#0A2A5E",
                                 subtitleColor = "#1A75D1",
                                 showSubtitle = true,
                                 className = "",
                             }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* ICON */}
            <img
                src="/images/logo/logo.png"
                alt="CVInsight Logo"
                height={size}
                style={{ height: size, width: "auto" }}
            />

            {/* TEXT */}
            <div className="flex flex-col leading-none">
                <span
                    className="font-bold text-2xl dark:!text-white"
                    style={{ color: titleColor }}
                >
                    CVInsight
                </span>

                {showSubtitle && (
                    <span
                        className="text-sm font-semibold mt-1 dark:text-gray-300"
                        style={{ color: subtitleColor }}
                    >
                        Build Your Future
                    </span>
                )}
            </div>
        </div>
    );
}
