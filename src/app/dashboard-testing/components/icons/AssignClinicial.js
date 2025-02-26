"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for clinicians
const clinicians = [
    {
        id: 1,
        name: "Dr. Emily Johnson",
        specialty: "Cardiology",
        availability: "High",
        imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Neurology",
        availability: "Medium",
        imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "Dr. Sarah Patel",
        specialty: "Oncology",
        availability: "Low",
        imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        name: "Dr. David Kim",
        specialty: "Orthopedics",
        availability: "High",
        imageUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 5,
        name: "Dr. Lisa Rodriguez",
        specialty: "Pediatrics",
        availability: "Medium",
        imageUrl: "/placeholder.svg?height=40&width=40",
    },
]

const getAvailabilityColor = (availability) => {
    switch (availability.toLowerCase()) {
        case "high":
            return "bg-green-100 text-green-800"
        case "medium":
            return "bg-yellow-100 text-yellow-800"
        case "low":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function AssignClinicianComponent({ patientName, onAssign }) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedClinician, setSelectedClinician] = useState(null)

    const filteredClinicians = clinicians.filter(
        (clinician) =>
            clinician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clinician.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAssign = () => {
        if (selectedClinician) {
            onAssign(selectedClinician)
            setIsOpen(false)
            setSelectedClinician(null)
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full">
                Assign Clinician
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Assign Clinician to {patientName}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search clinicians..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <ScrollArea className="h-[300px] rounded-md border p-4">
                            {filteredClinicians.map((clinician) => (
                                <div
                                    key={clinician.id}
                                    className={`flex items-center space-x-4 p-2 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer ${selectedClinician?.id === clinician.id ? "bg-blue-100" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedClinician(clinician)}
                                >
                                    <Avatar>
                                        <AvatarImage src={clinician.imageUrl} alt={clinician.name} />
                                        <AvatarFallback>
                                            {clinician.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{clinician.name}</h3>
                                        <p className="text-sm text-gray-500">{clinician.specialty}</p>
                                    </div>
                                    <Badge variant="secondary" className={`${getAvailabilityColor(clinician.availability)}`}>
                                        {clinician.availability}
                                    </Badge>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleAssign} disabled={!selectedClinician}>
                            Assign
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

