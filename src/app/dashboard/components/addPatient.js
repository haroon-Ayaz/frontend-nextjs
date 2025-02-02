import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

export default function AddPatient() {
    const fillPatients = async (e) => {
        e.preventDefault();
        const formData = {
            rxkid: document.getElementById("rkid").value,
            title: document.getElementById("title").value,
            fname: document.getElementById("fname").value,
            sname: document.getElementById("sname").value,
            address: document.getElementById("address").value,
            postcode: document.getElementById("postcode").value, // Ensure unique ID for Post Code
            mobilephone: document.getElementById("mobilephone").value,
            homephone: document.getElementById("homephone").value, // Ensure unique ID for Home Number
            problem: document.getElementById("problem").value,
        };
        try {
            const response = await fetch("http://127.0.0.1:5000/addpatient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Patient added successfully!");
            } else {
                alert(data.message || "Failed to add patient.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <Card className="max-w-2xl mx-4">
            <CardHeader>
                <CardTitle>Add New Patient</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={fillPatients} className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Label htmlFor="rxkid">Enter Patient ID</Label>
                            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                                <span className="rounded-sm mx-1 px-3 bg-gray-200 text-gray-700 font-medium">RXK</span>
                                <Input id="rxkid" required className="flex-1 border-none focus:ring-0"/>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <Label htmlFor="title">Title</Label>
                            <select
                                id="title"
                                className="w-full px-3 py-2 bg-white border  rounded-md shadow-sm focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm"
                            >
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="fname">First Name</Label>
                            <Input id="fname" required/>
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="sname">Surname</Label>
                            <Input id="sname" required/>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" required/>
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="postcode">Post Code</Label>
                            <Input id="postcode" required/>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Label htmlFor="mobilephone">Mobile Number</Label>
                            <Input id="mobilephone" required/>
                        </div>
                        <div className="w-1/2">
                            <Label htmlFor="homephone">Home Number</Label>
                            <Input id="homephone" required/>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="problem">Problem</Label>
                        <Input id="problem" required/>
                    </div>
                    <Button type="submit">Add Patient</Button>
                </form>
            </CardContent>
        </Card>
    )
}