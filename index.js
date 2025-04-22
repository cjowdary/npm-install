
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CRMPrototype() {
  const [filterProject, setFilterProject] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [leads, setLeads] = useState([
    { name: "Ravi Kumar", phone: "98765xxxxx", project: "Kollur", budget: "₹85L", status: "Site Visit", followUp: "Apr 22" },
    { name: "Sita Reddy", phone: "96543xxxxx", project: "Chandanagar", budget: "₹70L", status: "Booked", followUp: "Apr 21" },
    { name: "Arjun Rao", phone: "91234xxxxx", project: "Patancheru", budget: "₹60L", status: "Contacted", followUp: "Apr 23" },
    { name: "Preethi", phone: "99887xxxxx", project: "Kollur", budget: "₹95L", status: "Not Lifted", followUp: "Apr 24" },
  ]);

  const [newLead, setNewLead] = useState({ name: "", phone: "", project: "", budget: "", status: "New", followUp: "" });
  const [showForm, setShowForm] = useState(false);

  const handleAddLead = () => {
    if (newLead.name && newLead.phone) {
      setLeads([...leads, newLead]);
      setNewLead({ name: "", phone: "", project: "", budget: "", status: "New", followUp: "" });
      setShowForm(false);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      (!filterProject || lead.project === filterProject) &&
      (!filterStatus || lead.status === filterStatus)
  );

  const reportData = ["Kollur", "Chandanagar", "Patancheru"].map((project) => {
    const projectLeads = leads.filter((l) => l.project === project);
    const bookings = projectLeads.filter((l) => l.status === "Booked").length;
    return { project, leads: projectLeads.length, bookings };
  });

  const getWhatsAppLink = (phone, name) => {
    const phoneNumber = phone.replace(/x/g, "0");
    const message = encodeURIComponent(`Hi ${name}, this is from Nandana Realtors. Following up regarding your interest in our project.`);
    return `https://wa.me/91${phoneNumber}?text=${message}`;
  };

  const statusColor = {
    "New": "bg-blue-100 text-blue-800",
    "Contacted": "bg-yellow-100 text-yellow-800",
    "Site Visit": "bg-purple-100 text-purple-800",
    "Booked": "bg-green-100 text-green-800",
    "Not Interested": "bg-red-100 text-red-800",
    "Not Lifted": "bg-gray-100 text-gray-800"
  };

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold text-center">Nandana Realtors - CRM Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-sm">Total Leads</p><p className="text-xl font-semibold">{leads.length}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-sm">Site Visits</p><p className="text-xl font-semibold">{leads.filter(l => l.status === "Site Visit").length}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-sm">Bookings</p><p className="text-xl font-semibold">{leads.filter(l => l.status === "Booked").length}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-sm">Today's Follow-ups</p><p className="text-xl font-semibold">{leads.filter(l => l.followUp === "Apr 22").length}</p></CardContent></Card>
      </div>

      {/* Add New Lead Button */}
      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowForm(!showForm)}>
        + Add New Lead
      </Button>

      {showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Input placeholder="Name" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} />
          <Input placeholder="Phone" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} />
          <Input placeholder="Project" value={newLead.project} onChange={(e) => setNewLead({ ...newLead, project: e.target.value })} />
          <Input placeholder="Budget" value={newLead.budget} onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })} />
          <Input placeholder="Follow-up Date (e.g., Apr 25)" value={newLead.followUp} onChange={(e) => setNewLead({ ...newLead, followUp: e.target.value })} />
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleAddLead}>Submit</Button>
        </div>
      )}

      {/* Tabs for Leads and Reports */}
      <Tabs defaultValue="leads">
        <TabsList className="mt-6">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <div className="flex flex-wrap gap-4 mt-4">
            <Select onValueChange={setFilterProject}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Filter by Project" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Projects</SelectItem>
                <SelectItem value="Kollur">Kollur</SelectItem>
                <SelectItem value="Chandanagar">Chandanagar</SelectItem>
                <SelectItem value="Patancheru">Patancheru</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Site Visit">Site Visit</SelectItem>
                <SelectItem value="Booked">Booked</SelectItem>
                <SelectItem value="Not Interested">Not Interested</SelectItem>
                <SelectItem value="Not Lifted">Not Lifted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Follow-Up</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.project}</TableCell>
                  <TableCell>{lead.budget}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[lead.status] || ""}`}>{lead.status}</span>
                  </TableCell>
                  <TableCell>{lead.followUp}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm">View</Button>
                    <a href={getWhatsAppLink(lead.phone, lead.name)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">WhatsApp</Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center"><p className="text-sm">Leads This Month</p><p className="text-xl font-semibold">{leads.length}</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-sm">Site Visits Done</p><p className="text-xl font-semibold">{leads.filter(l => l.status === "Site Visit").length}</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-sm">Bookings Closed</p><p className="text-xl font-semibold">{leads.filter(l => l.status === "Booked").length}</p></CardContent></Card>
            <Card><CardContent className="p-4 text-center"><p className="text-sm">Avg. Follow-up Time</p><p className="text-xl font-semibold">1.8 Days</p></CardContent></Card>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Leads & Bookings per Project</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="project" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
