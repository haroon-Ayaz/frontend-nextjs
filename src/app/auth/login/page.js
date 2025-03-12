"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react"
import { AlertComponent } from "@/app/dashboard-testing/components/AlertDialogBox";
import { refreshDatabase } from "@/app/api/actions";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch("https://flask-nine-green.vercel.app/api/custom-auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                // Redirect to dashboard after successful login
                localStorage.setItem("userRole", data.role);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("fname", data.fname);
                localStorage.setItem("lname", data.lname);
                router.push("/dashboard-testing");
                alert("Valid Credentials");
            } else {
                setError(data.detail || "Invalid credentials");
                alert("Invalid credentials");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleRefreshDatabase = () => {
        console.log("Refreshing database...")
        // Add your database refresh logic here
        setShowAlert(false)
        refreshDatabase()
        setTimeout(() => setShowAlert(true), 50);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {showAlert && (
                <AlertComponent
                    variant="success"
                    title="Database Refreshed"
                    description="The database has been successfully updated."
                    duration={1500} // Optional: customize duration (in milliseconds)
                />
            )}
            <div className="absolute top-4 left-4">
                <Button
                    onClick={handleRefreshDatabase}
                    variant="outline"
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Database
                </Button>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                <img className="mx-auto h-32 w-auto" src="/nhs-logo.png" alt="NHS Logo" />
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Please Sign In</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    onChange={e => setEmail(e.target.value)}
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
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-nhs-blue focus:border-nhs-blue sm:text-sm"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-nhs-blue focus:ring-nhs-blue border-gray-300 rounded"
                                />
                                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </Label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-nhs-blue hover:text-nhs-blue-dark">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nhs-blue hover:bg-nhs-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nhs-blue"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link href="/auth/signup" passHref>
                                <Button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-nhs-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nhs-blue"
                                >
                                    Create an account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


