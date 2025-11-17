import React from "react";

type Props = { title: string; subtitle?: string };

const SectionTitle: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
    );
};

export default SectionTitle;
