"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Plus, Trash2, Users, CheckCircle } from "lucide-react"

interface Member {
  id: string
  order: number
  name: string
  contact: string
}

interface CreateGroupModalProps {
  children: React.ReactNode
}

export function CreateGroupModal({ children }: CreateGroupModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [contributionAmount, setContributionAmount] = useState("")
  const [frequency, setFrequency] = useState("")
  const [totalCycles, setTotalCycles] = useState("")
  const [members, setMembers] = useState<Member[]>([{ id: "1", order: 1, name: "", contact: "" }])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addMember = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      order: members.length + 1,
      name: "",
      contact: "",
    }
    setMembers([...members, newMember])
  }

  const removeMember = (id: string) => {
    if (members.length > 1) {
      const updatedMembers = members.filter((member) => member.id !== id)
      const reorderedMembers = updatedMembers.map((member, index) => ({
        ...member,
        order: index + 1,
      }))
      setMembers(reorderedMembers)
    }
  }

  const updateMember = (id: string, field: "name" | "contact", value: string) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
    // Clear error when user starts typing
    if (errors[`member-${id}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`member-${id}-${field}`]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!groupName.trim()) newErrors.groupName = "Group name is required"
    if (!contributionAmount || Number(contributionAmount) <= 0)
      newErrors.contributionAmount = "Valid contribution amount is required"
    if (!frequency) newErrors.frequency = "Frequency is required"
    if (!totalCycles || Number(totalCycles) <= 0) newErrors.totalCycles = "Valid number of cycles is required"

    members.forEach((member) => {
      if (!member.name.trim()) newErrors[`member-${member.id}-name`] = "Member name is required"
      if (!member.contact.trim()) newErrors[`member-${member.id}-contact`] = "Contact info is required"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log({
      groupName,
      contributionAmount: Number(contributionAmount),
      frequency,
      totalCycles: Number(totalCycles),
      members: members.filter((m) => m.name.trim() !== ""),
    })

    setIsLoading(false)
    setOpen(false)

    // Reset form
    setGroupName("")
    setContributionAmount("")
    setFrequency("")
    setTotalCycles("")
    setMembers([{ id: "1", order: 1, name: "", contact: "" }])
    setErrors({})
  }

  const isFormValid =
    groupName &&
    contributionAmount &&
    frequency &&
    totalCycles &&
    members.some((m) => m.name.trim() !== "") &&
    Object.keys(errors).length === 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Create New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Basic Group Information */}
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Group Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName" className="text-sm font-medium text-gray-700">
                    Group Name
                  </Label>
                  <Input
                    id="groupName"
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value)
                      if (errors.groupName) {
                        setErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.groupName
                          return newErrors
                        })
                      }
                    }}
                    placeholder="Enter group name"
                    className="border-gray-300 focus:border-blue-500"
                    error={!!errors.groupName}
                    errorMessage={errors.groupName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributionAmount" className="text-sm font-medium text-gray-700">
                    Contribution Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      ₦
                    </span>
                    <Input
                      id="contributionAmount"
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => {
                        setContributionAmount(e.target.value)
                        if (errors.contributionAmount) {
                          setErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.contributionAmount
                            return newErrors
                          })
                        }
                      }}
                      placeholder="0"
                      className="pl-8 border-gray-300 focus:border-blue-500"
                      error={!!errors.contributionAmount}
                      errorMessage={errors.contributionAmount}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">
                    Frequency
                  </Label>
                  <Select
                    value={frequency}
                    onValueChange={(value) => {
                      setFrequency(value)
                      if (errors.frequency) {
                        setErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.frequency
                          return newErrors
                        })
                      }
                    }}
                  >
                    <SelectTrigger
                      className={`border-gray-300 focus:border-blue-500 ${errors.frequency ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.frequency && (
                    <p className="text-xs text-red-600 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                      {errors.frequency}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCycles" className="text-sm font-medium text-gray-700">
                    Total Cycles
                  </Label>
                  <Input
                    id="totalCycles"
                    type="number"
                    value={totalCycles}
                    onChange={(e) => {
                      setTotalCycles(e.target.value)
                      if (errors.totalCycles) {
                        setErrors((prev) => {
                          const newErrors = { ...prev }
                          delete newErrors.totalCycles
                          return newErrors
                        })
                      }
                    }}
                    placeholder="Enter total cycles"
                    className="border-gray-300 focus:border-blue-500"
                    error={!!errors.totalCycles}
                    errorMessage={errors.totalCycles}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members Section */}
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Members ({members.length})
                </CardTitle>
                <Button
                  type="button"
                  onClick={addMember}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                  <div className="col-span-1">Order</div>
                  <div className="col-span-5">Member Name</div>
                  <div className="col-span-5">Contact Info</div>
                  <div className="col-span-1">Action</div>
                </div>

                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-12 gap-4 items-start animate-in slide-in-from-left-2 duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="col-span-1 pt-2">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium transition-transform duration-200 hover:scale-110">
                        {member.order}
                      </div>
                    </div>
                    <div className="col-span-5">
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(member.id, "name", e.target.value)}
                        placeholder="Enter member name"
                        className="border-gray-300 focus:border-blue-500"
                        error={!!errors[`member-${member.id}-name`]}
                        errorMessage={errors[`member-${member.id}-name`]}
                      />
                    </div>
                    <div className="col-span-5">
                      <Input
                        value={member.contact}
                        onChange={(e) => updateMember(member.id, "contact", e.target.value)}
                        placeholder="Phone or email"
                        className="border-gray-300 focus:border-blue-500"
                        error={!!errors[`member-${member.id}-contact`]}
                        errorMessage={errors[`member-${member.id}-contact`]}
                      />
                    </div>
                    <div className="col-span-1 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(member.id)}
                        disabled={members.length === 1}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSave}
              disabled={!isFormValid || isLoading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:hover:transform-none"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating Group...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Group
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
