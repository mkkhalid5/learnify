const Loading = () => {
    return (
        <div className="space-y-6">
            <div className="h-32 animate-pulse rounded-3xl bg-slate-200/80" />

            <div className="h-16 animate-pulse rounded-3xl bg-slate-200/80" />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="h-20 animate-pulse border-b border-slate-100 bg-slate-100/80"
                    />
                ))}
            </div>
        </div>
    );
};

export default Loading;