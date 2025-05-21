"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useCRM } from "@/context/crm-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ActivityDialog } from "./activity-dialog"

export function ActivitiesTable() {
  const { activities, filteredActivities, contacts, deals, deleteActivity } = useCRM()
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null)
  const [activityToEdit, setActivityToEdit] = useState<string | null>(null)

  const displayActivities = filteredActivities.length > 0 ? filteredActivities : activities

  // Sort activities by date (newest first)
  const sortedActivities = [...displayActivities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const handleDelete = () => {
    if (activityToDelete) {
      deleteActivity(activityToDelete)
      setActivityToDelete(null)
    }
  }

  const getActivityTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "call":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-300"
          >
            Call
          </Badge>
        )
      case "meeting":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-950 dark:text-green-300"
          >
            Meeting
          </Badge>
        )
      case "email":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-950 dark:text-purple-300"
          >
            Email
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Deal</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedActivities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No activities found.
                </TableCell>
              </TableRow>
            ) : (
              sortedActivities.map((activity) => {
                const contact = contacts.find((c) => c.id === activity.contactId)
                const deal = deals.find((d) => d.id === activity.dealId)

                return (
                  <TableRow key={activity.id}>
                    <TableCell>{format(new Date(activity.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>{getActivityTypeBadge(activity.type)}</TableCell>
                    <TableCell className="max-w-xs truncate">{activity.notes}</TableCell>
                    <TableCell>
                      {contact ? contact.name : <span className="text-muted-foreground">None</span>}
                    </TableCell>
                    <TableCell>{deal ? deal.name : <span className="text-muted-foreground">None</span>}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setActivityToEdit(activity.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => setActivityToDelete(activity.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!activityToDelete} onOpenChange={() => setActivityToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the activity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {activityToEdit && (
        <ActivityDialog
          open={!!activityToEdit}
          onOpenChange={() => setActivityToEdit(null)}
          activityId={activityToEdit}
        />
      )}
    </>
  )
}
