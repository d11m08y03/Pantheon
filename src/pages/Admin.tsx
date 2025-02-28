import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";

const AdminEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setImageFile(file);
      setImage(""); // Clear URL when file is uploaded
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !location || !capacity || (!image && !imageFile) || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("date", format(date, "MMMM dd, yyyy"));
    formData.append("status", "Registration Open");

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (image) {
      formData.append("imageUrl", image);
    }

    console.log("New event:", Object.fromEntries(formData));

    toast.success("Event created successfully!");

    setTitle("");
    setDescription("");
    setLocation("");
    setCapacity("");
    setImage("");
    setImageFile(null);
    setImagePreview("");
    setDate(undefined);
  };

  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto mt-12 lg:mt-20 xl:mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
              className="mt-2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              required
              className="mt-2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Location *</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              required
              className="mt-2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
          </div>

  
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Capacity *</label>
            <Input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Enter event capacity"
              required
              className="mt-2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Image *</label>
            <div className="flex items-center gap-4">
              <Input
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageFile(null);
                  setImagePreview("");
                }}
                placeholder="Or enter image URL"
                className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {imagePreview && (
              <div className="relative mt-4 aspect-video rounded-lg overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImage("");
                    setImageFile(null);
                    setImagePreview("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date *</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminEvent;
