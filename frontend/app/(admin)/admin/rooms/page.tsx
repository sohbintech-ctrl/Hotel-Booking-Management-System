"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search, BedDouble } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AdminRoomsPage() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [branch, setBranch] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const[search,setSearch]=useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const resetForm = () => {
    setRoomName("");
    setRoomType("");
    setBranch("");
    setPrice("");
    setCapacity("");
    setDescription("");
    setEditing(null);
  };

  const filteredRooms=rooms.filter((room:any)=>{
   const matchRooms=room.roomName.toLowerCase().includes(search.toLowerCase());
   return matchRooms;
  })


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: any = {
      id: editing ? editing.id : Date.now(),
      roomName,
      roomType,
      branch,
      price,
      capacity,
      description,
    };

    if (editing) {
      setRooms((prev: any) =>
        prev.map((room: any) => (room.id === editing.id ? value : room)),
      );
    } else {
      setRooms((prev: any) => [...prev, value]);
    }

    resetForm();
    setDialogOpen(false);
  };

  const handleDelete = (id: any) => {
    const filtered = rooms.filter((room: any) => room.id !== id);
    setRooms(filtered);
  };

  const handleEdit = (id: any) => {
    const editRoom = rooms.find((room: any) => room.id === id);
    if (!editRoom) return;

    setEditing(editRoom);
    setRoomName(editRoom.roomName);
    setRoomType(editRoom.roomType);
    setBranch(editRoom.branch);
    setPrice(editRoom.price);
    setCapacity(editRoom.capacity);
    setDescription(editRoom.description);
    setDialogOpen(true);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rooms</h1>
          <p className="text-muted-foreground">Manage all hotel rooms.</p>
        </div>

        {/* Add/Edit Room Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={
              <Button
                className="gap-2"
                onClick={() => {
                  resetForm();
                  setDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Room
              </Button>
            }
          ></DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Room" : "Add New Room"}
              </DialogTitle>
              <DialogDescription>
                Fill in the room details below.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  placeholder="Deluxe Room 104"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select
                    value={roomType}
                    onValueChange={(value) => setRoomType(value || "")}
                    required
                  >
                    <SelectTrigger id="roomType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={branch}
                    onValueChange={(value) => setBranch(value || "")}
                    required
                  >
                    <SelectTrigger id="branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ktm">Kathmandu</SelectItem>
                      <SelectItem value="pkr">Pokhara</SelectItem>
                      <SelectItem value="ctw">Chitwan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="price">Price/Night (Rs.)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="3500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="2"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A spacious room with city view..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full">
                  {editing ? "Save Changes" : "Add Room"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search rooms..." className="pl-9" value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rooms ({filteredRooms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room: any) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      {room.roomName}
                    </div>
                  </TableCell>

                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.branch}</TableCell>
                  <TableCell>
                    Rs. {Number(room.price).toLocaleString()}
                  </TableCell>
                  <TableCell>{room.capacity} guests</TableCell>

                  <TableCell>
                    <Badge variant="default">Available</Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(room.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(room.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
