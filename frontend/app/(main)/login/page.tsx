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
import { BedDouble, Users } from "lucide-react";
import Image from "next/image";
import {useState ,useEffect} from "react";
import { LoginUpSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";
import { useGuestRedirect } from "@/app/hooks/useGuestRedirect";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errors,setErrors]=useState<Record<string,string>>({});
  const {login,user} = useAuth();
  const router = useRouter();

  const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value={
      email,
      password
    }
    const result=LoginUpSchema.safeParse(value);
    const fieldErrors:Record <string,string>={};
    if(!result.success){
     result.error?.issues.forEach((issue) => {
       fieldErrors[issue.path[0] as string] = issue.message;
     });
     setErrors(fieldErrors);
     return;
    }
    const loginData=result.data;
 
   try {
   await login(loginData);

     toast.success("Login successfully", {
       duration: 1000,
     });
   }catch (error) {
  toast.error(
    error instanceof Error ? error.message : "Login failed"
  );
}
}
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your BookIt account</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={
                  errors.email ? "border-destructive" : ""
                }
              />
              {errors.email && (
                <p className="text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password? "border-destructive":""
                }
              />
              {errors.password && (
                <p className="text-destructive">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
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
