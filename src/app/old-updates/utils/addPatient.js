import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { User, Home, Phone, MapPin, FileText, Plus } from "lucide-react"

export default function AddPatient() {
    const [title, setTitle] = React.useState("Mr.");

    const fillPatients = async (e) => {
        e.preventDefault()

        const formData = {
            rxkid: document.getElementById("rxkid").value,  // Keep this for now
            title: title, // Comment out this line
            fname: document.getElementById("fname").value, // Then this one
            sname: document.getElementById("sname").value, // Then this one
            address: document.getElementById("address").value,  // And so on...
            postcode: document.getElementById("postcode").value,
            mobilephone: document.getElementById("mobilephone").value,
            homephone: document.getElementById("homephone").value,
            problem: document.getElementById("problem").value,
        };

        try {
            const response = await fetch("https://flask-qga8pcv7b-kyojur0s-projects.vercel.app/api/addpatient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            if (response.ok) {
                alert("Patient added successfully!")
            } else {
                alert(data.message || "Failed to add patient.")
            }
        } catch (error) {
            alert("Something went wrong. Please try again.")
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Add New Patient</CardTitle>
                    <CardDescription className="text-center">Enter the patient's details below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={fillPatients} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="rxkid" className="text-sm font-medium text-gray-700">
                                    Patient ID
                                </Label>
                                <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                  <span
                                      className="rounded-l-md px-3 bg-gray-100 text-gray-700 font-medium border-r border-gray-300 py-2">
                                    RXK
                                  </span>
                                    <Input
                                        id="rxkid"
                                        required
                                        className="flex-1 border-none focus:ring-0 rounded-r-md"
                                        placeholder="Enter ID"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                                    Title
                                </Label>
                                <Select onValueChange={setTitle} value={title}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select title"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mr.">Mr.</SelectItem>
                                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                                        <SelectItem value="Ms.">Ms.</SelectItem>
                                        <SelectItem value="Dr.">Dr.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fname" className="text-sm font-medium text-gray-700">
                                    First Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                          size={18}/>
                                    <Input id="fname" required className="pl-10" placeholder="Enter first name"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sname" className="text-sm font-medium text-gray-700">
                                    Surname
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input id="sname" required className="pl-10" placeholder="Enter surname" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                    Address
                                </Label>
                                <div className="relative">
                                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                          size={18}/>
                                    <Input id="address" required className="pl-10" placeholder="Enter full address"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postcode" className="text-sm font-medium text-gray-700">
                                    Post Code
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={18}/>
                                    <Input id="postcode" required className="pl-10" placeholder="Enter post code"/>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="homephone" className="text-sm font-medium text-gray-700">
                                    Home Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                           size={18}/>
                                    <Input id="homephone" required className="pl-10" placeholder="Enter home number"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobilephone" className="text-sm font-medium text-gray-700">
                                    Mobile Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                           size={18}/>
                                    <Input id="mobilephone" required className="pl-10"
                                           placeholder="Enter mobile number"/>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="problem" className="text-sm font-medium text-gray-700">
                                Problem Description
                            </Label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                <Textarea
                                    id="problem"
                                    required
                                    className="pl-10 min-h-[100px]"
                                    placeholder="Describe the patient's problem"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Patient
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}

