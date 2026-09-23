"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BedDouble } from "lucide-react";
import { useState,useEffect } from "react";
import {signUpSchema } from "@/lib/validations/auth";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import { useGuestRedirect } from "@/app/hooks/useGuestRedirect";


export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[errors,setErrors]=useState<Record <string,string>>({});

  const {user,register} = useAuth();
  const router=useRouter();
  const handleSubmit =async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = {
      name,
      email,
      number,
      password,
      confirmPassword,
    };
    
   const result=signUpSchema.safeParse(value);
   const fieldErrors:Record <string,string>={};

   if(!result.success){
     result.error?.issues.forEach((issue) => {
       fieldErrors[issue.path[0] as string] = issue.message;
     });
    setErrors(fieldErrors);
    return;
   }
   setErrors({});
   const {confirmPassword:_confirmPassword,...dataToSend}=result.data;
   //console.log(dataToSend);
 
   try {
  await register(dataToSend);

  toast.success("Registration successful!",{
    duration:1000,
  });

} catch (error) {
  toast.error("Unable to connect to server");
  console.error(error);
}

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNumber("");
  };

  const users = useGuestRedirect();
   
  if(users){
    return null;
  }
  

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <BedDouble className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Sign up to start booking rooms</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                className={
                  errors.name ? "border-destructive" : "text-foreground"
                }
              />
              {errors.name && <p className="text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={
                  errors.email ? "border-destructive" : "text-foreground"
                }
              />
              {errors.email && (
                <p className="text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={number}
                placeholder="98XXXXXXXX"
                onChange={(e) => setNumber(e.target.value)}
                className={
                  errors.number ? "border-destructive" : "text-foreground"
                }
              />
              {errors.number && (
                <p className="text-destructive">{errors.number}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password ? "border-destructive" : "text-foreground"
                }
              />
              {errors.password && (
                <p className="text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={
                  errors.confirmPassword
                    ? "border-destructive"
                    : "text-foreground"
                }
              />
              {errors.confirmPassword && (
                <p className="text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2" type="button">
            <Image
              src="/icons8-google.svg"
              alt="Google"
              width={16}
              height={16}
            />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
