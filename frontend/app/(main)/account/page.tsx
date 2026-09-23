"use client";

import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { useAuth } from "@/context/authcontext";
import { toast } from "sonner";

export default function AccountPage() {
  const { user,updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [number, setNumber] = useState(user?.number || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = async () => {
    try {
      await updateUser({
        name,
        number,
        email
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    }
  };
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your profile information.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-full p-4">
              <User className="h-8 w-8" />
            </div>

            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>

            <Input
              id="phone"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="98XXXXXXXX"
            />
          </div>

          {/* Update Changes */}
          <Button
            onClick={handleSave}
            disabled={
              name === user?.name &&
              email === user?.email &&
              number === user?.number
            }
          >
            Update Changes
          </Button>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>

          <CardDescription>Update your password</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>

            <Input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New Password</Label>

            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>

          <Separator />

          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </main>
  );
}
