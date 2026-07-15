import Container from "@/components/shared/container/Container";
import { features } from "@/lib/data/features";

const WhyChooseUs = () => {
    return (
        <section className="py-24">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold"> Why Choose Learnify </h2>
                    <p className="mt-4 text-default-500"> Everything you need to learn, practice, and grow your career.</p>
                </div>
                <div className="mt-16 grid gap-6 sm:grid-cols-2">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-default-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default WhyChooseUs;