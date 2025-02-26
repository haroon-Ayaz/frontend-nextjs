"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Clock, Calendar, User, Phone } from "lucide-react"
import { format } from "date-fns"
import { sendSMS } from "@/app/api/actions"
import { AlertComponent } from "@/app/dashboard-testing/components/AlertDialogBox"

const ICON_SIZE = "h-4 w-4"

export const SMSIcon = ({ patientName, patientPhone }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [recipientNumber, setRecipientNumber] = useState(patientPhone || "")
    const [messageDate, setMessageDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [messageTime, setMessageTime] = useState(format(new Date(), "HH:mm"))
    const [message, setMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("info");

    const handleSendSMS = async () => {
        try {
            const response = await sendSMS(recipientNumber, messageDate);
            console.log("SMS sent successfully:", { recipientNumber, messageDate, messageTime, message });
            setAlertMessage("SMS sent successfully.");
            setAlertType("success");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1500);
            setIsOpen(false);
        } catch (error) {
            console.error("Error sending SMS:", error);
            setAlertMessage("Error sending SMS.");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1500);
        }
    }

    return (
        <>
            {showAlert && (
                <AlertComponent variant={alertType} title={alertMessage} description="" />
            )}
            <div className="inline-flex items-center justify-center w-8 h-8">
                <Button
                    variant="ghost"
                    className="p-0 hover:bg-indigo-100 transition-colors rounded-full"
                    onClick={() => setIsOpen(true)}
                >
                    <Send className="${ICON_SIZE} mr-2 h-4 w-4" />
                    {/* <MessageSquare className={`${ICON_SIZE} text-indigo-600`} /> */}
                </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
                            <MessageSquare className="h-5 w-5" />
                            Send SMS
                        </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[80vh] overflow-y-auto pr-4">
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-indigo-500" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    value={recipientNumber}
                                    onChange={(e) => setRecipientNumber(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="w-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-indigo-500" />
                                        Date
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={messageDate}
                                        onChange={(e) => setMessageDate(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-indigo-500" />
                                        Time
                                    </Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={messageTime}
                                        onChange={(e) => setMessageTime(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-indigo-500" />
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message here..."
                                    className="w-full min-h-[100px]"
                                />
                            </div> */}
                        </div>
                    </ScrollArea>
                    <DialogFooter className="flex justify-between items-center mt-4">
                        {/* <div className="text-sm text-gray-500">{message.length}/160 characters</div> */}
                        <Button onClick={handleSendSMS} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Send className="mr-2 h-4 w-4" />  Send SMS
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

