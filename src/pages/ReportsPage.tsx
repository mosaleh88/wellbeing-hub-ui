import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ReportFilterBar } from '@/components/reports/ReportFilterBar';
import { ReportCharts } from '@/components/reports/ReportCharts';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, Users, TrendingUp } from 'lucide-react';
import type { ReportFilters } from '@/types';

const mockCounselors = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Michael Chen' },
];

const mockGrades = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];

export default function ReportsPage() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dateTo: new Date().toISOString().split('T')[0],
  });

  const caseVolumeData = [
    { name: 'Week 1', value: 12 },
    { name: 'Week 2', value: 15 },
    { name: 'Week 3', value: 10 },
    { name: 'Week 4', value: 18 },
  ];

  const casesByTypeData = [
    { name: 'Anxiety', value: 35 },
    { name: 'Behaviour', value: 20 },
    { name: 'Family', value: 15 },
    { name: 'Other', value: 30 },
  ];

  const sessionsByCounsellorData = [
    { name: 'Sarah Johnson', value: 24 },
    { name: 'Michael Chen', value: 18 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Analytics and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export CSV</Button>
            <Button variant="outline"><FileText className="h-4 w-4 mr-2" />Export PDF</Button>
          </div>
        </div>

        <ReportFilterBar filters={filters} onFiltersChange={setFilters} counsellors={mockCounselors} grades={mockGrades} />

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Cases" value={45} icon={Users} />
          <StatCard title="Total Sessions" value={128} icon={TrendingUp} />
          <StatCard title="Avg Sessions/Case" value="2.8" icon={FileText} />
        </div>

        <ReportCharts caseVolumeData={caseVolumeData} casesByTypeData={casesByTypeData} sessionsByCounsellorData={sessionsByCounsellorData} />

        <Card>
          <CardHeader><CardTitle>Case Summary</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Emily T.</TableCell><TableCell>Year 9</TableCell><TableCell>3</TableCell><TableCell>Open</TableCell></TableRow>
                <TableRow><TableCell>James W.</TableCell><TableCell>Year 10</TableCell><TableCell>5</TableCell><TableCell>Monitoring</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
