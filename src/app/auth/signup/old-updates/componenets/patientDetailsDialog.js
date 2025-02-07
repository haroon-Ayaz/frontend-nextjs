import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function PatientDetailsDialog({ patient, onClose }) {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Patient Details</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>
                        <strong>Name:</strong> {patient.name}
                    </p>
                    <p>
                        <strong>Problem:</strong> {patient.problem}
                    </p>
                    <p>
                        <strong>Status:</strong> {patient.status}
                    </p>
                    {/* Add more details as needed */}
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

