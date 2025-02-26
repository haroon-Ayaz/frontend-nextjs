"use client"

import React from "react"
import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const alertVariants = cva(
    "fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg border border-gray-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700",
    {
        variants: {
            variant: {
                default: "bg-white dark:bg-gray-800",
                success: "bg-green-50 dark:bg-green-900",
                error: "bg-red-50 dark:bg-red-900",
                warning: "bg-amber-50 dark:bg-amber-900",
                info: "bg-blue-50 dark:bg-blue-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    default: AlertCircle,
}

export function AlertComponent({
    className,
    variant = "default",
    title,
    description,
    duration = 3000,
    ...props
}) {
    const [isVisible, setIsVisible] = useState(true)
    const Icon = iconMap[variant]

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, duration)

        return () => clearTimeout(timer)
    }, [duration])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className={cn(alertVariants({ variant }), className)}
                    {...props}
                >
                    <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                            {title && <h3 className="font-semibold mb-1">{title}</h3>}
                            <p className="text-sm">{description}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

