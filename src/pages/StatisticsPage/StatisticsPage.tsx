import Slidebar from "../../assets/components/Slidebar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Sector,
} from "recharts";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import MicIcon from "@mui/icons-material/Mic";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value.toLocaleString()}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const StatisticsPage = () => {
  const theme = useTheme();

  const testData = {
    users: {
      total: 12500,
      activeDaily: 3500,
      activeWeekly: 8000,
      activeMonthly: 11000,
      newRegistrations: {
        day: 120,
        week: 750,
        month: 2800,
        dailyTrend: [
          { name: "09.06", newUsers: 80 },
          { name: "10.06", newUsers: 100 },
          { name: "11.06", newUsers: 150 },
          { name: "12.06", newUsers: 130 },
          { name: "13.06", newUsers: 110 },
          { name: "14.06", newUsers: 160 },
          { name: "15.06", newUsers: 120 },
        ],
      },
      accountDeletions: { day: 5, week: 30, month: 100 },
      avgDailyUsageMinutes: 15,
      avgWeeklyUsageMinutes: 90,
    },
    reminders: {
      totalCreated: 58000,
      activePending: 7500,
      completed: 45000,
      overdueMissed: 500,
      avgPerUser: 4.6,
      byType: [
        { name: "По времени", value: 40000, color: theme.palette.primary.main },
        {
          name: "По геолокации",
          value: 10000,
          color: "#FFAC92",
        },
        { name: "По событию", value: 8000, color: "#FFD392" },
      ],
    },
    aiRequests: {
      totalProcessed: 150000,
      successfulInterpretation: 92.5,
      unclearFailed: 1200,
    },
    notifications: {
      totalSent: 50000,
      channels: [
        { name: "Push", count: 35000, color: "#88FFA9" },
        { name: "Telegram", count: 10000, color: "#FFD392" },
        { name: "Email", count: 3000, color: "#FFAC92" },
        { name: "TTS (Голос)", count: 2000, color: "#FE6C7D" },
      ],
      successfulDelivery: 98.2,
    },
    subscriptions: {
      activePremium: 2500,
      newSubscriptions: { day: 15, week: 100, month: 400 },
      cancellations: { day: 2, week: 15, month: 60 },
      arpu: 5.99,
      distribution: { monthly: 1800, annual: 700 },
    },
  };

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
  }: StatsCardProps) => (
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

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

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
          Общая статистика использования приложения
        </Typography>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Пользователи
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard
              title="Всего пользователей"
              value={testData.users.total.toLocaleString()}
              icon={<PersonOutlineIcon />}
              description="Общее количество зарегистрированных аккаунтов."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard
              title="Активные пользователи (день)"
              value={testData.users.activeDaily.toLocaleString()}
              icon={<PersonOutlineIcon />}
              description={`Активны сегодня. За неделю: ${testData.users.activeWeekly.toLocaleString()}, за месяц: ${testData.users.activeMonthly.toLocaleString()}.`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard
              title="Среднее время использования"
              value={`${testData.users.avgDailyUsageMinutes} мин/день`}
              icon={<AnalyticsIcon />}
              description={`В среднем за неделю: ${testData.users.avgWeeklyUsageMinutes} мин.`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Новые регистрации (7 дней)
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={testData.users.newRegistrations.dailyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                  />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                    name="Новых пользователей"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Удаления аккаунтов"
              value={testData.users.accountDeletions.month.toLocaleString()}
              icon={<PersonOutlineIcon sx={{ color: "#FE6C7D" }} />}
              description={`За месяц. За сегодня: ${testData.users.accountDeletions.day}, за неделю: ${testData.users.accountDeletions.week}.`}
              sxProps={{ height: "auto" }}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Напоминания
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Всего создано"
              value={testData.reminders.totalCreated.toLocaleString()}
              icon={<CheckCircleOutlineIcon />}
              description="Общее количество напоминаний в системе."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Активные / Ожидающие"
              value={testData.reminders.activePending.toLocaleString()}
              icon={<CheckCircleOutlineIcon />}
              description="Напоминания, которые еще не сработали или ожидают выполнения."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Выполнено"
              value={testData.reminders.completed.toLocaleString()}
              icon={<CheckCircleOutlineIcon sx={{ color: "#88FFA9" }} />}
              description="Напоминания, отмеченные как выполненные."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Просрочено / Пропущено"
              value={testData.reminders.overdueMissed.toLocaleString()}
              icon={<CheckCircleOutlineIcon sx={{ color: "#FE6C7D" }} />}
              description="Напоминания, не выполненные в срок."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Напоминаний на пользователя"
              value={testData.reminders.avgPerUser.toFixed(1)}
              icon={<CheckCircleOutlineIcon />}
              description="Среднее количество напоминаний, созданных одним пользователем."
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Распределение по типам напоминаний
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={testData.reminders.byType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {testData.reminders.byType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          AI-запросы
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Всего обработано запросов"
              value={testData.aiRequests.totalProcessed.toLocaleString()}
              icon={<MicIcon />}
              description="Общее количество голосовых и текстовых запросов к AI."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Требуют уточнения / Неудачные"
              value={testData.aiRequests.unclearFailed.toLocaleString()}
              icon={<AnalyticsIcon sx={{ color: "#FFAC92" }} />}
              description="Запросы, которые AI не смог интерпретировать."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Процент успешной интерпретации LLM
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Успешно",
                        value: testData.aiRequests.successfulInterpretation,
                      },
                      {
                        name: "Неуспешно",
                        value:
                          100 - testData.aiRequests.successfulInterpretation,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={"#88FFA9"} />
                    <Cell fill="#FE6C7D" />
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${Number(value).toFixed(2)}%`,
                      name,
                    ]}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={theme.palette.text.primary}
                  >
                    {`${testData.aiRequests.successfulInterpretation}%`}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "medium", color: theme.palette.grey[700] }}
        >
          Уведомления
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatsCard
              title="Всего отправлено уведомлений"
              value={testData.notifications.totalSent.toLocaleString()}
              icon={<NotificationsActiveIcon />}
              description={`Успешная доставка: ${testData.notifications.successfulDelivery}%`}
              sxProps={{ height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 2, height: "100%", p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Распределение по каналам уведомлений
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={testData.notifications.channels}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                  />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Количество">
                    {testData.notifications.channels.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
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
          Подписки
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Активные Premium"
              value={testData.subscriptions.activePremium.toLocaleString()}
              icon={<PriceChangeIcon />}
              description="Количество активных платных подписок."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Новые подписки (мес)"
              value={testData.subscriptions.newSubscriptions.month.toLocaleString()}
              icon={<PriceChangeIcon sx={{ color: "#88FFA9" }} />}
              description={`За день: ${testData.subscriptions.newSubscriptions.day}, за неделю: ${testData.subscriptions.newSubscriptions.week}.`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="Отмены подписок (мес)"
              value={testData.subscriptions.cancellations.month.toLocaleString()}
              icon={
                <PriceChangeIcon
                  sx={{ transform: "rotate(180deg)", color: "#FE6C7D" }}
                />
              }
              description={`За день: ${testData.subscriptions.cancellations.day}, за неделю: ${testData.subscriptions.cancellations.week}.`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <StatsCard
              title="ARPU"
              value={`$${testData.subscriptions.arpu.toFixed(2)}`}
              icon={<PriceChangeIcon />}
              description="Средний доход с активного пользователя (Premium)."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <StatsCard
              title="Распределение подписок"
              value={`${testData.subscriptions.distribution.monthly.toLocaleString()} мес.`}
              icon={<PriceChangeIcon />}
              description={`${testData.subscriptions.distribution.annual.toLocaleString()} годовых.`}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StatisticsPage;
