import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Building2, Heart } from "lucide-react";

const stats = [
  { icon: Building2, label: "Hotels Partnered", value: "150+" },
  { icon: Users, label: "Happy Guests", value: "20,000+" },
  { icon: Award, label: "Years of Service", value: "10+" },
  { icon: Heart, label: "Cities Covered", value: "30+" },
];

const team = [
  { name: "Sujan Shrestha", role: "Founder & CEO", imageUrl: "" },
  { name: "Anisha Rai", role: "Operations Head", imageUrl: "" },
  { name: "Bikash Thapa", role: "Customer Support Lead", imageUrl: "" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About BookIt</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We make finding and booking the perfect hotel room simple, fast, and
            reliable — wherever your journey takes you.
          </p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="h-72 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
          {/* Dummy image placeholder — replace with actual image */}
          Image
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            BookIt started with a simple idea — booking a hotel room
            shouldn&apos;t be complicated. We partnered with trusted hotels
            across the country to bring guests transparent pricing, real-time
            availability, and a smooth booking experience.
          </p>
          <p className="text-muted-foreground">
            Today, thousands of travelers rely on BookIt for their stays, from
            quick business trips to family vacations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="flex justify-center mb-3">
                  <div className="bg-background rounded-full p-4 shadow-sm">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">Meet the Team</h2>
        <p className="text-muted-foreground mb-10 text-center">
          The people behind BookIt
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center">
              <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                {/* Dummy image placeholder */}
                Image
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
