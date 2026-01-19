import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface ReportChartsProps {
  caseVolumeData: ChartData[];
  casesByTypeData: ChartData[];
  sessionsByCounsellorData: ChartData[];
}

// Use HSL colors from design system
const CHART_COLORS = [
  'hsl(173, 58%, 39%)', // primary teal
  'hsl(38, 92%, 50%)', // warning amber
  'hsl(142, 70%, 40%)', // success green
  'hsl(210, 20%, 60%)', // muted gray
  'hsl(0, 70%, 55%)', // destructive red
];

export function ReportCharts({
  caseVolumeData,
  casesByTypeData,
  sessionsByCounsellorData,
}: ReportChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Case Volume Over Time */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Case Volume Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caseVolumeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(173, 58%, 39%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(173, 58%, 39%)', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  name="Cases"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cases by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Cases by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={casesByTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {casesByTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sessions by Counsellor */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions by Counsellor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionsByCounsellorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  type="number"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(173, 58%, 39%)"
                  radius={[0, 4, 4, 0]}
                  name="Sessions"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
