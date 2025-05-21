import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { DashboardCard } from "@/components/dashboard/dashboard-card"

export const metadata: Metadata = {
  title: "Dashboard | ClientFlow CRM",
  description: "Dashboard for ClientFlow CRM",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Contacts"
          value="124"
          description="+4 this week"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Active Deals"
          value="$24,500"
          description="12 deals in progress"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Recent Activities"
          value="28"
          description="Last 7 days"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Deal Overview</CardTitle>
            <CardDescription>Value of deals in each stage of your pipeline</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest interactions with contacts and deals</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/activities">
                View all activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions to manage your CRM</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild className="w-full justify-start">
              <Link href="/contacts/new">
                <Users className="mr-2 h-4 w-4" />
                Add New Contact
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/leads/new">
                <Users className="mr-2 h-4 w-4" />
                Add New Lead
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/deals/new">
                <BarChart3 className="mr-2 h-4 w-4" />
                Create New Deal
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deals Closing Soon</CardTitle>
            <CardDescription>Deals in the final stages of your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Acme Corp Website Redesign</p>
                  <p className="text-sm text-muted-foreground">$12,000</p>
                </div>
                <div className="text-sm text-muted-foreground">Negotiation</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">TechStart Annual Contract</p>
                  <p className="text-sm text-muted-foreground">$8,500</p>
                </div>
                <div className="text-sm text-muted-foreground">Proposal Sent</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">GlobalFirm Consulting</p>
                  <p className="text-sm text-muted-foreground">$4,000</p>
                </div>
                <div className="text-sm text-muted-foreground">Negotiation</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/deals">
                View all deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
