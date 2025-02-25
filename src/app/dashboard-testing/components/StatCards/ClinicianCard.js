import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { UsersIcon, MapPinIcon, PhoneIcon, TrendingUpIcon, ClockIcon, StarIcon, AwardIcon } from "lucide-react"

export function StatsCardPopup({ title, icon, clinicians }) {
    return (
        <Card className="w-[400px] shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    {clinicians.map((clinician, index) => (
                        <React.Fragment key={clinician.id}>
                            {index > 0 && <Separator className="my-4" />}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={clinician.avatar} alt={clinician.name} />
                                        <AvatarFallback>
                                            {clinician.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-lg">{clinician.name}</h3>
                                        <Badge variant="secondary" className="mt-1">
                                            {clinician.specialty}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center gap-2 text-muted-foreground">
                                        <MapPinIcon className="h-4 w-4" />
                                        {clinician.address}
                                    </p>
                                    <p className="flex items-center gap-2 text-muted-foreground">
                                        <PhoneIcon className="h-4 w-4" />
                                        {clinician.phone}
                                    </p>
                                    <p className="flex items-center gap-2 text-muted-foreground">
                                        <UsersIcon className="h-4 w-4" />
                                        {clinician.email}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Patients (Last Month)</span>
                                        <span className="text-sm font-bold">{clinician.patientsLastMonth}</span>
                                    </div>
                                    <Progress value={(clinician.patientsLastMonth / clinician.totalPatients) * 100} className="h-2" />
                                    <p className="text-xs text-muted-foreground text-right">{clinician.totalPatients} total patients</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{clinician.yearsOfExperience} years exp.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StarIcon className="h-4 w-4 text-yellow-400" />
                                        <span>{clinician.rating.toFixed(1)} rating</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUpIcon className="h-4 w-4 text-green-500" />
                                        <span>{clinician.availability}% available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AwardIcon className="h-4 w-4 text-blue-500" />
                                        <span>{clinician.certifications.length} certs</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold mb-1">Certifications</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {clinician.certifications.map((cert, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {cert}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

