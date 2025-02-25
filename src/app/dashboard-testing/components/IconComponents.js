"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Phone, MessageSquare, Clock, Send } from "lucide-react"
import { User, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_SIZE = "h-6 w-6"

// Cancer icon
export const CancerIcon = ({ isBooked, is2WeekWait }) => {
    if (!is2WeekWait) return null
    return (
        <div className="inline-flex items-center justify-center w-8 h-8">
            <Badge
                variant={isBooked ? "success" : "destructive"}
                className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full"
            >
                C
            </Badge>
        </div>
    )
}

// Over 13 weeks icon
export const Over13WeeksIcon = ({ isBooked, isOver13Weeks }) => {
    if (!isOver13Weeks) {
        return null
    }

    return (
        <div className="inline-flex items-center justify-center w-8 h-8">
            <Badge
                variant={isBooked ? "success" : "warning"}
                className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full"
            >
                13+
            </Badge>
        </div>
    )
}

// Short notice icon
export const ShortNoticeIcon = ({ isShortNotice }) => {
    if (!isShortNotice) {
        return null
    }

    return (
        <div className="inline-flex items-center justify-center w-8 h-8">
            <Clock className={`${ICON_SIZE} text-blue-500`} />
        </div>
    )
}


// Phone icon
export const PhoneIcon = ({ lastCallTime, onCall }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [callTime, setCallTime] = useState("")

    const handleSubmit = () => {
        onCall(callTime)
        setCallTime("")
        setIsOpen(false)
    }

    return (
        <>
            <div className="inline-flex items-center justify-center w-8 h-8">
                <Button variant="ghost" className="p-0" onClick={() => setIsOpen(true)}>
                    <Phone className={`${ICON_SIZE} ${lastCallTime ? "text-green-500" : "text-gray-400"}`} />
                </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Log Call Time</DialogTitle>
                    </DialogHeader>
                    <Input type="datetime-local" value={callTime} onChange={(e) => setCallTime(e.target.value)} />
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Log Call</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
