import Slidebar from "../../assets/components/Slidebar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { format } from "date-fns";

import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type StatsCardProps = {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  sxProps?: object;
};

const StatsCard = ({
  title,
  value,
  icon,
  description,
  sxProps = {},
}: StatsCardProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-5px)" },
        ...sxProps,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          {icon && (
            <Box
              sx={{
                color: "#92CAFF",
                mr: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: theme.palette.grey[800] }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#A192FF",
            mb: 1,
          }}
        >
          {value}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const testAnalyticsData = {
  remindersByCategory: [
    { name: "Покупка", value: 30000, color: "#42A5F5" },
    { name: "Встреча", value: 25000, color: "#66BB6A" },
    { name: "Звонок", value: 15000, color: "#FFA726" },
    { name: "Событие", value: 10000, color: "#EF5350" },
    { name: "Личное", value: 12000, color: "#AB47BC" },
    { name: "Другое", value: 8000, color: "#78909C" },
  ],
  reminderTypesUsage: {
    byTime: 40000,
    byGeolocation: 10000,
    byEvent: 8000,
    integratedWithCalendar: 5000,
    combinations: {
      geoEvent: 1500,
      timeCalendar: 3000,
    },
  },
  keywords: [
    { word: "Купить", count: 15000 },
    { word: "Напомнить", count: 12000 },
    { word: "Встреча", count: 10000 },
    { word: "Магазин", count: 8000 },
    { word: "Звонок", count: 7000 },
    { word: "Отправить", count: 6500 },
    { word: "Документы", count: 6000 },
    { word: "Забрать", count: 5500 },
    { word: "Оплатить", count: 5000 },
    { word: "День рождения", count: 4500 },
  ],
  geolocationAnalysis: {
    popularZones: [
      { name: "Дом", activations: 1200, lat: 59.9343, lon: 30.3351 },
      { name: "Работа", activations: 900, lat: 59.94, lon: 30.315 },
      { name: "Супермаркет", activations: 750, lat: 59.93, lon: 30.34 },
      { name: "Фитнес-клуб", activations: 500, lat: 59.92, lon: 30.3 },
      { name: "Школа", activations: 400, lat: 59.95, lon: 30.32 },
    ],
    activationTrend: [
      { date: format(new Date(2025, 5, 9), "dd.MM"), activations: 50 },
      { date: format(new Date(2025, 5, 10), "dd.MM"), activations: 65 },
      { date: format(new Date(2025, 5, 11), "dd.MM"), activations: 70 },
      { date: format(new Date(2025, 5, 12), "dd.MM"), activations: 60 },
      { date: format(new Date(2025, 5, 13), "dd.MM"), activations: 80 },
      { date: format(new Date(2025, 5, 14), "dd.MM"), activations: 75 },
      { date: format(new Date(2025, 5, 15), "dd.MM"), activations: 90 },
    ],
  },
};

const AnaliticsPage = () => {
  const theme = useTheme();

  return (
    <>
      <Slidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          ml: { xs: 0, lg: "150px" },
          width: { xs: "100%", lg: `calc(100% - 150px)` },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Аналитика напоминаний по категориям и типам
        </Typography>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Распределение напоминаний по категориям
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2, }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Процентное соотношение по категориям
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={testAnalyticsData.remindersByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {testAnalyticsData.remindersByCategory.map(
                      (entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${Number(value).toLocaleString()} шт.`,
                      name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Количество напоминаний по категориям
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={testAnalyticsData.remindersByCategory}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                  />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                    formatter={(value) =>
                      `${Number(value).toLocaleString()} шт.`
                    }
                  />
                  <Legend />
                  <Bar dataKey="value" name="Количество напоминаний">
                    {testAnalyticsData.remindersByCategory.map(
                      (entry, index) => (
                        <Cell key={`bar-cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Использование типов напоминаний
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="По времени"
              value={testAnalyticsData.reminderTypesUsage.byTime.toLocaleString()}
              icon={<AccessTimeIcon />}
              description="Напоминания, привязанные к конкретному времени."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="По геолокации"
              value={testAnalyticsData.reminderTypesUsage.byGeolocation.toLocaleString()}
              icon={<LocationOnIcon />}
              description="Напоминания, срабатывающие по прибытии/убытии из геозоны."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="С интеграцией календаря"
              value={testAnalyticsData.reminderTypesUsage.integratedWithCalendar.toLocaleString()}
              icon={<CalendarMonthIcon />}
              description="Напоминания, синхронизированные с внешним календарём."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="По событию"
              value={testAnalyticsData.reminderTypesUsage.byEvent.toLocaleString()}
              icon={<EventIcon />}
              description="Напоминания, привязанные к определенным событиям."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Комбинации типов"
              value={`${testAnalyticsData.reminderTypesUsage.combinations.geoEvent.toLocaleString()} (Гео+Событие)`}
              description={`${testAnalyticsData.reminderTypesUsage.combinations.timeCalendar.toLocaleString()} (Время+Календарь).`}
              icon={<CategoryIcon />}
              sxProps={{ height: "auto" }}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Анализ ключевых слов/фраз
        </Typography>
        <Card sx={{ borderRadius: 2, mb: 4, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Топ-10 часто используемых слов в запросах
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", borderRadius: 2 }}
          >
            <Table size="small" aria-label="keywords table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Место</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Ключевое слово/фраза
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Количество использований
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testAnalyticsData.keywords.map((row, index) => (
                  <TableRow key={row.word}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.word}</TableCell>
                    <TableCell align="right">
                      {row.count.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 2, display: "block" }}
          >
            *Данные анонимизированы и используются для улучшения LLM.
          </Typography>
        </Card>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Географический анализ (для геозависимых напоминаний)
        </Typography>
        <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Статистика активаций гео-напоминаний (7 дней)
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={testAnalyticsData.geolocationAnalysis.activationTrend}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="activations"
                stroke={theme.palette.primary.main}
                activeDot={{ r: 8 }}
                name="Активации"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </>
  );
};

export default AnaliticsPage;
