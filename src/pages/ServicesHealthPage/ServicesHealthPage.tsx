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
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useState } from "react";

const testServiceHealthData = {
  serviceStatus: {
    backendApi: { status: "Online", lastCheck: "2025-06-17 14:30:00" },
    workflowManager: {
      status: "Online",
      executedWorkflows: 154321,
      failedWorkflows: 123,
      lastCheck: "2025-06-17 14:30:00",
    },
    integrations: {
      whisper: { status: "Online", lastCheck: "2025-06-17 14:29:55" },
      googleSTT: { status: "Online", lastCheck: "2025-06-17 14:29:50" },
      gptLLM: { status: "Online", lastCheck: "2025-06-17 14:29:45" },
      postgresqlSupabase: {
        status: "Online",
        lastCheck: "2025-06-17 14:29:40",
      },
    },
  },
  apiResponseTime: {
    avgLastHour: 150,
    minLastHour: 80,
    maxLastHour: 320,
    dailyTrend: [
      { name: "09.06", avgResponse: 140 },
      { name: "10.06", avgResponse: 155 },
      { name: "11.06", avgResponse: 130 },
      { name: "12.06", avgResponse: 160 },
      { name: "13.06", avgResponse: 145 },
      { name: "14.06", avgResponse: 170 },
      { name: "15.06", avgResponse: 150 },
    ],
  },
  errorLogs: [
    {
      id: "err-001",
      type: "System Error",
      module: "Backend API",
      message: "Database connection failed",
      timestamp: "2025-06-17 14:25:10",
      status: "Critical",
    },
    {
      id: "err-002",
      type: "Request Processing Error",
      module: "Workflow Manager",
      message: "Failed to parse user input for workflow #12345",
      timestamp: "2025-06-17 14:20:05",
      status: "Warning",
    },
    {
      id: "err-003",
      type: "Notification Error",
      module: "Push Notifications",
      message: "Failed to send push notification to user 9876",
      timestamp: "2025-06-17 14:15:30",
      status: "Warning",
    },
    {
      id: "err-004",
      type: "Integration Error",
      module: "Whisper",
      message: "API rate limit exceeded",
      timestamp: "2025-06-17 14:10:00",
      status: "Error",
    },
    {
      id: "err-005",
      type: "System Error",
      module: "Backend API",
      message: "Authentication service unavailable",
      timestamp: "2025-06-17 13:55:00",
      status: "Critical",
    },
    {
      id: "err-006",
      type: "Request Processing Error",
      module: "GPT/LLM",
      message: "API response timeout",
      timestamp: "2025-06-17 13:40:00",
      status: "Error",
    },
    {
      id: "err-007",
      type: "System Error",
      module: "PostgreSQL/Supabase",
      message: "Disk space low",
      timestamp: "2025-06-17 13:35:00",
      status: "Critical",
    },
    {
      id: "err-008",
      type: "Notification Error",
      module: "Telegram Notifications",
      message: "Invalid Telegram bot token",
      timestamp: "2025-06-17 13:30:00",
      status: "Error",
    },
  ],
};

type StatusCardProps = {
  title: string;
  status: "Online" | "Offline" | "Degraded" | "Critical" | "Warning" | "Error";
  description?: string;
  lastCheck?: string;
  sxProps?: object;
  value?: React.ReactNode;
  children?: React.ReactNode;
};

import type { Theme } from "@mui/material/styles";

const getStatusColor = (currentStatus: string, theme: Theme) => {
  switch (currentStatus) {
    case "Online":
      return "#88FFA9";
    case "Offline":
      return "#FE6C7D";
    case "Degraded":
    case "Warning":
      return "#FFAC92";
    case "Critical":
    case "Error":
      return "#FE6C7D";
    default:
      return theme.palette.grey[500];
  }
};

const getStatusIcon = (currentStatus: string, theme: Theme) => {
  switch (currentStatus) {
    case "Online":
      return (
        <CheckCircleOutlineIcon
          sx={{ color: getStatusColor(currentStatus, theme) }}
        />
      );
    case "Offline":
    case "Critical":
    case "Error":
      return (
        <ErrorOutlineIcon
          sx={{ color: getStatusColor(currentStatus, theme) }}
        />
      );
    case "Degraded":
    case "Warning":
      return (
        <WarningAmberIcon
          sx={{ color: getStatusColor(currentStatus, theme) }}
        />
      );
    default:
      return null;
  }
};

const StatusCard = ({
  title,
  status,
  description,
  lastCheck,
  sxProps = {},
  value,
  children,
}: StatusCardProps) => {
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
          {getStatusIcon(status, theme) && (
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
              {getStatusIcon(status, theme)}
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
        {value && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: getStatusColor(status, theme),
              mb: 1,
            }}
          >
            {value}
          </Typography>
        )}
        <Chip
          label={status}
          sx={{
            backgroundColor: getStatusColor(status, theme),
            color: theme.palette.getContrastText(getStatusColor(status, theme)),
            fontWeight: "bold",
            mb: 1,
          }}
          size="small"
        />
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {lastCheck && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 1, display: "block" }}
          >
            Последняя проверка: {lastCheck}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

const ServicesHealthPage = () => {
  const theme = useTheme();
  const [filterType, setFilterType] = useState<string>("All");
  const [filterModule, setFilterModule] = useState<string>("All");

  const getSeverityColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "error";
      case "Error":
        return "error";
      case "Warning":
        return "warning";
      default:
        return "info";
    }
  };

  const filteredErrorLogs = testServiceHealthData.errorLogs.filter((log) => {
    const matchesType = filterType === "All" || log.type === filterType;
    const matchesModule = filterModule === "All" || log.module === filterModule;

    return matchesType && matchesModule;
  });

  const uniqueErrorTypes = [
    "All",
    ...new Set(testServiceHealthData.errorLogs.map((log) => log.type)),
  ];
  const uniqueErrorModules = [
    "All",
    ...new Set(testServiceHealthData.errorLogs.map((log) => log.module)),
  ];

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
          Мониторинг и управление системой
        </Typography>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Состояние сервисов
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatusCard
              title="Backend API"
              status={
                testServiceHealthData.serviceStatus.backendApi.status as
                  | "Online"
                  | "Offline"
                  | "Degraded"
                  | "Critical"
                  | "Warning"
                  | "Error"
              }
              lastCheck={
                testServiceHealthData.serviceStatus.backendApi.lastCheck
              }
              description="Основной API приложения."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatusCard
              title="Workflow-Manager (n8n)"
              status={
                testServiceHealthData.serviceStatus.workflowManager.status as
                  | "Online"
                  | "Offline"
                  | "Degraded"
                  | "Critical"
                  | "Warning"
                  | "Error"
              }
              lastCheck={
                testServiceHealthData.serviceStatus.workflowManager.lastCheck
              }
              value={`${testServiceHealthData.serviceStatus.workflowManager.executedWorkflows.toLocaleString()} выполненных / ${testServiceHealthData.serviceStatus.workflowManager.failedWorkflows.toLocaleString()} ошибочных`}
              description="Система автоматизации рабочих процессов."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatusCard
              title="Интеграции"
              status={
                Object.values(
                  testServiceHealthData.serviceStatus.integrations
                ).every((integration) => integration.status === "Online")
                  ? "Online"
                  : "Degraded"
              }
              description="Состояние внешних сервисов."
              sxProps={{ height: "auto" }}
            >
              <Box mt={2}>
                {Object.entries(
                  testServiceHealthData.serviceStatus.integrations
                ).map(([name, data]) => (
                  <Box
                    key={name}
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    {getStatusIcon(data.status, theme)}
                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                      {name}:{" "}
                      <Chip
                        label={data.status}
                        size="small"
                        color={getSeverityColor(
                          data.status === "Online" ? "info" : "error"
                        )}
                      />
                    </Typography>
                  </Box>
                ))}
              </Box>
            </StatusCard>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Время ответа API
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatusCard
              title="Среднее время ответа (последний час)"
              status={
                testServiceHealthData.apiResponseTime.avgLastHour > 200
                  ? "Warning"
                  : "Online"
              }
              value={`${testServiceHealthData.apiResponseTime.avgLastHour} мс`}
              description={`Минимальное: ${testServiceHealthData.apiResponseTime.minLastHour} мс, Максимальное: ${testServiceHealthData.apiResponseTime.maxLastHour} мс.`}
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Тренд времени ответа API (7 дней)
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={testServiceHealthData.apiResponseTime.dailyTrend}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                  />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis unit="мс" stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgResponse"
                    stroke={theme.palette.info.main}
                    activeDot={{ r: 8 }}
                    name="Среднее время ответа"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Логи ошибок
        </Typography>
        <Card sx={{ borderRadius: 2, mb: 4, p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="filter-type-label">Тип ошибки</InputLabel>
              <Select
                labelId="filter-type-label"
                value={filterType}
                label="Тип ошибки"
                onChange={(e) => setFilterType(e.target.value as string)}
              >
                {uniqueErrorTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="filter-module-label">Модуль</InputLabel>
              <Select
                labelId="filter-module-label"
                value={filterModule}
                label="Модуль"
                onChange={(e) => setFilterModule(e.target.value as string)}
              >
                {uniqueErrorModules.map((module) => (
                  <MenuItem key={module} value={module}>
                    {module}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", borderRadius: 2 }}
          >
            <Table stickyHeader aria-label="error logs table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Время</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Тип</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Модуль</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Сообщение</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredErrorLogs.length > 0 ? (
                  filteredErrorLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.type}</TableCell>
                      <TableCell>{log.module}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>
                        <Chip
                          label={log.status}
                          color={getSeverityColor(log.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Нет ошибок, соответствующих выбранным фильтрам.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
};

export default ServicesHealthPage;
