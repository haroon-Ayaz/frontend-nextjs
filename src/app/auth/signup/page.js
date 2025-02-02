"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [role, setRole] = useState("Select a role");
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        console.log("Data to be send is as follows")
        console.log(password)
        console.log(email)
        console.log(fname)
        console.log(lname)
        console.log(role)

        try {
            const response = await fetch("https://flask-mvp.vercel.app/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ fname, lname, email, password, role }),
            });

            console.log("Raw response:", response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                setError(errorData.message || "Signup failed.");
                return;
            }

            const data = await response.json();
            console.log("Success response:", data);

            alert("User registered successfully!");
            await router.push("/auth/login");

        } catch (error) {
            console.error("Fetch error:", error);
            setError("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                <img className="mx-auto h-32 w-auto" src="/nhs-logo.png" alt="NHS Logo"/>
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            </div>


            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label htmlFor="fname">First Name</Label>
                                <Input id="fname" onChange={(e) => setFname(e.target.value)} required/>
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="lname">Last Name</Label>
                                <Input id="lname" onChange={(e) => setLname(e.target.value)} required/>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
                                Confirm password
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="password-confirm"
                                    name="password-confirm"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Choose your role
                            </Label>
                            <div className="mt-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="w-full justify-between border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm">
                                            {role}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-white shadow-md border border-gray-300">
                                        <DropdownMenuItem onClick={() => setRole("Admin")}>Admin</DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setRole("Clinician")}>Clinician</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setRole("Super User")}>Super
                                            User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nhs-blue hover:bg-nhs-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nhs-blue"
                            >
                                Create account
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/auth/login" passHref>
                                <Button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-nhs-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nhs-blue"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

