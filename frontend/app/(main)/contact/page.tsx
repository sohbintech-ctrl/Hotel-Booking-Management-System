"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactData, ContactUpSchema } from "@/lib/validations/contact";

const contactInfo = [
  { icon: MapPin, title: "Address", value: "Kathmandu, Nepal" },
  { icon: Phone, title: "Phone", value: "+977 98XXXXXXXX" },
  { icon: Mail, title: "Email", value: "support@bookit.com" },
  { icon: Clock, title: "Reception Hours", value: "24/7 Open" },
];

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const[data,setData]=useState<ContactData | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value={
      fullName,
      email,
      subject,
      message
    }

    const result= ContactUpSchema.safeParse(value);
    const fieldErrors:Record <string,string>={};
    if(!result.success){
      result.error.issues.forEach((issue)=>{
      fieldErrors[issue.path[0] as string]=issue.message;
      });
    setErrors(fieldErrors);
    return;
    }
    setErrors({});
    setData(result.data);

    setFullName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  useEffect(()=>{
  console.log(data);
  console.log(errors);
  },[data,errors])
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a question or need help with your booking? Reach out to us
          anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {contactInfo.map((item) => (
            <Card key={item.title}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="bg-muted rounded-full p-3">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-destructive">{errors.fullName}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Booking inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && (
                  <p className="text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-destructive">{errors.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
