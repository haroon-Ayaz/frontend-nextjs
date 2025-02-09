import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, MapPin, User } from "lucide-react"

export function PatientDetailsDialog({ patient, onClose }) {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Patient Details</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <User className="mr-2" size={20} />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Title</p>
                                    <p className="font-medium">{patient.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">First Name</p>
                                    <p className="font-medium">{patient.fname}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name</p>
                                    <p className="font-medium">{patient.lname}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <Badge variant="outline" className="mt-1">
                                        {patient.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <MapPin className="mr-2" size={20} />
                                Address
                            </h3>
                            <p className="font-medium">{patient.address}</p>
                            <p className="font-medium">{patient.postcode}</p>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <Phone className="mr-2" size={20} />
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone Number</p>
                                    <p className="font-medium">{patient.phone_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Home Number</p>
                                    <p className="font-medium">{patient.home_number}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Medical Problem</h3>
                            <p className="text-sm leading-relaxed">{patient.problem}</p>
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

