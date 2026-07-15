import { IconType } from "react-icons";

interface DashboardStatCardProps {
    title: string;
    value: string;
    description: string;
    icon: IconType;
}

const DashboardStatCard = ({ title, value, description, icon: Icon }: DashboardStatCardProps) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                        {title}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold text-slate-950">
                        {value}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">{description}</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <Icon className="text-xl" />
                </div>
            </div>
        </div>
    );
};

export default DashboardStatCard;