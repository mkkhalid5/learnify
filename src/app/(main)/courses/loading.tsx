const Loading = () => {
    return (
        <div className="space-y-6 py-20">
            <div className="mx-auto h-56 max-w-7xl animate-pulse rounded-3xl bg-slate-200/80 px-4 sm:px-6 lg:px-8" />
            <div className="mx-auto h-20 max-w-7xl animate-pulse rounded-3xl bg-slate-200/80 px-4 sm:px-6 lg:px-8" />
            <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-96 animate-pulse rounded-3xl bg-slate-200/80" />
                ))}
            </div>
        </div>
    );
};

export default Loading;