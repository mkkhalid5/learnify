import Container from "@/components/shared/container/Container";
import { stats } from "@/lib/data/stats";

const Statistics = () => {
    return (
        <section className="bg-default-50 py-24">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold">
                        Trusted by Thousands
                    </h2>

                    <p className="mt-4 text-default-500">
                        Join thousands of learners building successful careers with Learnify.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.id}
                                className="rounded-3xl border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="text-3xl text-primary" />
                                </div>

                                <h3 className="mt-6 text-4xl font-bold">
                                    {stat.value}
                                </h3>

                                <p className="mt-2 text-default-500">
                                    {stat.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Statistics;