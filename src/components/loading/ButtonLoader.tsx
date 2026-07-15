import React from 'react';

const ButtonLoader = () => {
    return (
        <div className="hidden items-center gap-3 lg:flex">
            {/* Login Button */}
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />

            {/* Register Button */}
            <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />
        </div>
    );
};

export default ButtonLoader;