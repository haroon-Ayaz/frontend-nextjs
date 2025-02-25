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
    if (!isOver13Weeks) return null
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
    if (!isShortNotice) return null
    return (
        <div className="inline-flex items-center justify-center w-8 h-8">
            <Clock className={`${ICON_SIZE} text-blue-500`} />
        </div>
    )
}

// --- Integrated CommentIcon (with comment parsing and dialog) ---

const parseComments = (commentsString) => {
    if (!commentsString) return []

    return commentsString
        .split("\n")
        .map((comment) => {
            const match = comment.match(/\[(.*?)\] \[(.*?)\] (.*)/)
            if (match) {
                return {
                    datetime: match[1],
                    author: match[2],
                    content: match[3],
                }
            }
            return null
        })
        .filter(Boolean)
}

const CommentItem = ({ datetime, author, content }) => (
    <div className="border-l-2 border-gray-200 pl-4 py-3 hover:border-gray-400 transition-all">
        <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <time>{format(new Date(datetime), "dd MMM yyyy HH:mm")}</time>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-gray-600">
                    <User className="w-3 h-3" />
                    <span className="font-medium text-gray-900">{author}</span>
                </div>
            </div>
            <p className="text-gray-700">{content}</p>
        </div>
    </div>
)

export const CommentIcon = ({ comments, onAddComment }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [commentDate, setCommentDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [commentTime, setCommentTime] = useState(format(new Date(), "HH:mm"))
    const [adminName, setAdminName] = useState("System.User")
    const parsedComments = parseComments(comments)

    const handleSubmit = () => {
        if (!newComment.trim()) return

        const formattedDateTime = `${commentDate} ${commentTime}:00`
        const formattedComment = `[${formattedDateTime}] [${adminName}] ${newComment}`
        onAddComment(formattedComment)
        setNewComment("")
    }

    return (
        <>
            <div className="inline-flex items-center justify-center w-8 h-8">
                <Button variant="ghost" className="p-0 hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(true)}>
                    <MessageSquare className={ICON_SIZE} />
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 font-semibold text-xl">
                            <MessageSquare className="w-5 h-5" />
                            Comments History
                        </DialogTitle>
                    </DialogHeader>

                    {/* New Comment Section */}
                    <div className="space-y-4 py-4 border-y">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Date
                                </label>
                                <Input
                                    type="date"
                                    value={commentDate}
                                    onChange={(e) => setCommentDate(e.target.value)}
                                    className="h-8"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-600 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Time
                                </label>
                                <Input
                                    type="time"
                                    value={commentTime}
                                    onChange={(e) => setCommentTime(e.target.value)}
                                    className="h-8"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600 flex items-center gap-1">
                                <User className="w-3 h-3" />
                                Admin Name
                            </label>
                            <Input value={adminName} onChange={(e) => setAdminName(e.target.value)} className="h-8" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Comment</label>
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add your comment..."
                                className="resize-none min-h-[100px]"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={handleSubmit}
                                className={cn("bg-gray-900 text-white hover:bg-gray-800", "transition-colors duration-200")}
                                disabled={!newComment.trim()}
                            >
                                Add Comment
                            </Button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <ScrollArea className="max-h-[300px] overflow-y-auto -mx-6 px-6">
                        <div className="space-y-2">
                            {parsedComments.length > 0 ? (
                                parsedComments.map((comment, index) => <CommentItem key={index} {...comment} />)
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No comments yet</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)} className="border-gray-200 hover:bg-gray-50">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
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
