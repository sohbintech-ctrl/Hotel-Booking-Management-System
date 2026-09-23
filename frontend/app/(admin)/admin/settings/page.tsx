"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function AdminSettingsPage() {
   
  const [hotelName, setHotelName] = useState("BookIt Hotel");
  const [description, setDescription] = useState(
    "Comfortable rooms, best prices, unforgettable experience.",
  );
  const [phone, setPhone] = useState("+977 98XXXXXXXX");
  const [email, setEmail] = useState("support@bookit.com");
  const [branches, setBranches] = useState([
    { id: 1, name: "Kathmandu Branch" },
    { id: 2, name: "Pokhara Branch" },
    { id: 3, name: "Chitwan Branch" },
  ]);
  const [newBranchName, setNewBranchName] = useState("");

  const handleAddBranch = () => {
    if(!newBranchName.trim()) return;
    setBranches((prev) => [...prev, { id: Date.now(), name: newBranchName }]);
    setNewBranchName("");
  };

  const handleDeleteBranch = (id: number) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = { hotelName, description, phone, email };
    console.log(value);
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage hotel information and account settings.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Hotel Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hotel Information</CardTitle>
            <CardDescription>Basic details shown to guests</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Hotel Name */}
            <div className="space-y-1.5">
              <Label htmlFor="hotelName">Hotel Name</Label>

              <Input
                id="hotelName"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>

                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </CardContent>
        </Card>
      </form>

      {/* Branches */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Branches</CardTitle>
          <CardDescription>Manage hotel branch locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="flex items-center justify-between border rounded-md px-4 py-2"
            >
              <span className="text-sm">{branch.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteBranch(branch.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Input
              placeholder="New branch name"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              required
            />
            <Button variant="outline" size="sm" onClick={handleAddBranch}>
              + Add Branch
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Update your admin account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>

          <Separator />

          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </main>
  );
}
