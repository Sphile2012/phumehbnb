import React, { useState, useEffect } from "react";
import { phumeh } from "@/api/phumehClient";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X, Plus, ArrowLeft, ArrowRight, Check, Home, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AMENITIES = [
  "WiFi", "TV", "Kitchen", "Free parking", "Air conditioning", "Heating",
  "Washer", "Pool", "Gym", "Bathtub", "Coffee maker", "Hair dryer",
  "Security cameras", "Garden",
];

const CATEGORIES = [
  { value: "amazing_views", label: "Amazing views" },
  { value: "beachfront", label: "Beachfront" },
  { value: "cabins", label: "Cabins" },
  { value: "countryside", label: "Countryside" },
  { value: "design", label: "Design" },
  { value: "islands", label: "Islands" },
  { value: "lakefront", label: "Lakefront" },
  { value: "luxe", label: "Luxe" },
  { value: "mansions", label: "Mansions" },
  { value: "national_parks", label: "National parks" },
  { value: "omg", label: "OMG!" },
  { value: "skiing", label: "Skiing" },
  { value: "tiny_homes", label: "Tiny homes" },
  { value: "trending", label: "Trending" },
  { value: "tropical", label: "Tropical" },
];

const steps = ["Basics", "Details", "Amenities", "Photos", "Pricing"];

export default function CreateListing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    property_type: "entire_place",
    category: "trending",
    location_city: "",
    location_country: "",
    location_address: "",
    max_guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [],
    price_per_night: 100,
    cleaning_fee: 25,
    house_rules: "",
    check_in_time: "15:00",
    check_out_time: "11:00",
    is_active: true,
  });

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAmenity = (a) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
    const { file_url } = await phumeh.integrations.Core.UploadFile({ file });
      setImageUrls((prev) => [...prev, file_url]);
    }
    setUploading(false);
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title) { toast.error("Please enter a title"); return; }
    if (!form.location_city || !form.location_country) { toast.error("Please enter location"); return; }

    setSubmitting(true);
    await phumeh.entities.Property.create({
      ...form,
      images: imageUrls,
      host_name: user?.full_name || user?.email || "Host",
      service_fee: 12,
    });
    toast.success("Listing created successfully! 🎉");
    navigate(createPageUrl("MyListings"));
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Progress bar */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`text-sm font-medium transition-colors ${
                  i === step ? "text-[#222222]" : i < step ? "text-[#FF385C]" : "text-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#222222] transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 0: Basics */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Tell us about your place</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Title</Label>
                    <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Beautiful beachfront villa..." className="mt-2 text-base py-6" />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Description</Label>
                    <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe what makes your place special..." className="mt-2 min-h-32" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Property Type</Label>
                      <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                        <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entire_place">Entire place</SelectItem>
                          <SelectItem value="private_room">Private room</SelectItem>
                          <SelectItem value="shared_room">Shared room</SelectItem>
                          <SelectItem value="hotel_room">Hotel room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Category</Label>
                      <Select value={form.category} onValueChange={(v) => update("category", v)}>
                        <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Where's your place located?</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">City</Label>
                      <Input value={form.location_city} onChange={(e) => update("location_city", e.target.value)} placeholder="Paris" className="mt-2" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Country</Label>
                      <Input value={form.location_country} onChange={(e) => update("location_country", e.target.value)} placeholder="France" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-medium">Address (optional)</Label>
                    <Input value={form.location_address} onChange={(e) => update("location_address", e.target.value)} placeholder="123 Main Street" className="mt-2" />
                  </div>
                  <h3 className="text-xl font-semibold pt-4">Share some basics</h3>
                  {[
                    { label: "Max guests", field: "max_guests" },
                    { label: "Bedrooms", field: "bedrooms" },
                    { label: "Beds", field: "beds" },
                    { label: "Bathrooms", field: "bathrooms" },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex items-center justify-between py-4 border-b">
                      <span className="text-base">{label}</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => update(field, Math.max(1, form[field] - 1))}
                          className="h-9 w-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800"
                        >-</button>
                        <span className="text-base font-medium w-8 text-center">{form[field]}</span>
                        <button
                          onClick={() => update(field, form[field] + 1)}
                          className="h-9 w-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-800"
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Amenities */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">What amenities do you offer?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.amenities.includes(a)
                          ? "border-[#222222] bg-gray-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <span className="text-sm font-medium">{a}</span>
                      {form.amenities.includes(a) && (
                        <Check className="h-4 w-4 text-[#222222] mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Add some photos</h2>
                <p className="text-gray-500">You'll need at least 1 photo to get started.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageUrls.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {uploading ? (
                      <div className="animate-spin h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add photos</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold">Now, set your price</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Price per night ($)</Label>
                    <Input
                      type="number"
                      value={form.price_per_night}
                      onChange={(e) => update("price_per_night", Number(e.target.value))}
                      className="mt-2 text-3xl font-semibold text-center py-8"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Cleaning fee ($)</Label>
                    <Input
                      type="number"
                      value={form.cleaning_fee}
                      onChange={(e) => update("cleaning_fee", Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">House rules (optional)</Label>
                    <Textarea
                      value={form.house_rules}
                      onChange={(e) => update("house_rules", e.target.value)}
                      placeholder="No smoking, no parties..."
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Check-in time</Label>
                      <Input type="time" value={form.check_in_time} onChange={(e) => update("check_in_time", e.target.value)} className="mt-2" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Check-out time</Label>
                      <Input type="time" value={form.check_out_time} onChange={(e) => update("check_out_time", e.target.value)} className="mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t">
          <Button
            variant="ghost"
            onClick={() => step === 0 ? navigate(-1) : setStep(step - 1)}
            className="font-medium underline text-base"
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="bg-[#222222] hover:bg-black text-white px-8 py-6 rounded-lg text-base font-medium"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white px-8 py-6 rounded-lg text-base font-medium"
            >
              {submitting ? "Publishing..." : "Publish listing"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}