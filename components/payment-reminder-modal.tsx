"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Send, MessageSquare, Phone } from "lucide-react"

interface PaymentReminderModalProps {
  children: React.ReactNode
  selectedMembers?: string[]
}

export function PaymentReminderModal({ children, selectedMembers = [] }: PaymentReminderModalProps) {
  const [open, setOpen] = useState(false)
  const [reminderType, setReminderType] = useState("sms")
  const [message, setMessage] = useState(
    "Hi! This is a friendly reminder that your Ajo contribution payment is due. Please make your payment at your earliest convenience. Thank you!",
  )

  const handleSendReminder = () => {
    // Here you would typically send the reminder via API
    console.log({
      type: reminderType,
      message,
      recipients: selectedMembers,
    })
    setOpen(false)
  }

  const reminderTemplates = {
    gentle:
      "Hi! This is a friendly reminder that your Ajo contribution payment is due. Please make your payment at your earliest convenience. Thank you!",
    urgent:
      "URGENT: Your Ajo contribution payment is now overdue. Please make your payment immediately to avoid any issues with the group. Contact us if you need assistance.",
    final:
      "FINAL NOTICE: Your Ajo contribution payment is significantly overdue. Please contact the group administrator immediately to resolve this matter.",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6 text-amber-600" />
            Send Payment Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Recipients */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Sending to {selectedMembers.length} member{selectedMembers.length !== 1 ? "s" : ""}:
              </div>
              <div className="text-sm text-gray-600">
                {selectedMembers.length > 0 ? selectedMembers.join(", ") : "No members selected"}
              </div>
            </CardContent>
          </Card>

          {/* Reminder Type */}
          <div className="space-y-2">
            <Label htmlFor="reminderType" className="text-sm font-medium text-gray-700">
              Reminder Method
            </Label>
            <Select value={reminderType} onValueChange={setReminderType}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select reminder method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    SMS Message
                  </div>
                </SelectItem>
                <SelectItem value="call">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Call
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Templates */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Quick Templates</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessage(reminderTemplates.gentle)}
                className="border-gray-300 text-emerald-700 hover:bg-emerald-50"
              >
                Gentle
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessage(reminderTemplates.urgent)}
                className="border-gray-300 text-amber-700 hover:bg-amber-50"
              >
                Urgent
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessage(reminderTemplates.final)}
                className="border-gray-300 text-red-700 hover:bg-red-50"
              >
                Final Notice
              </Button>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message Content
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your reminder message..."
              className="min-h-32 border-gray-300 focus:border-blue-500"
            />
            <div className="text-xs text-gray-500">{message.length}/160 characters</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSendReminder}
              disabled={selectedMembers.length === 0 || !message.trim()}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-medium"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
