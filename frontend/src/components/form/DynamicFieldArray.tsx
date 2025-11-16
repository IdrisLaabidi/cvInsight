/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { FieldArrayRenderProps } from "formik";

type Props = {
    name: string;
    values: any[];
    renderItem: (index: number, remove: (i: number) => void) => React.ReactNode;
    arrayHelpers: FieldArrayRenderProps;
    addLabel?: string;
};

const DynamicFieldArray: React.FC<Props> = ({ values, renderItem, arrayHelpers, addLabel = "Add" }) => {
    const { push, remove } = arrayHelpers;
    return (
        <div>
            {values && values.length > 0 ? (
                values.map((_: any, idx: number) => (
                    <div key={idx} className="mb-3 border rounded p-3">
                        {renderItem(idx, remove)}
                    </div>
                ))
            ) : (
                <div className="mb-2 text-sm text-gray-500">No items yet</div>
            )}

            <button
                type="button"
                onClick={() => push({})}
                className="mt-2 inline-block rounded bg-primary px-3 py-1 text-white"
            >
                {addLabel}
            </button>
        </div>
    );
};

export default DynamicFieldArray;
