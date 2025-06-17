import Slidebar from "../../assets/components/Slidebar";
import {
  Box,
  Typography,
  Card,
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { format, subDays, addMonths } from "date-fns";

import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateUserId = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

const userSubscriptionStatuses = ["Бесплатно", "Премиум"];
const userCountries = ["Россия", "Казахстан"];
const userLanguages = ["Английский", "Русский"];
const notificationTypes = ["Push", "Email", "Telegram"];
const reminderCategories = [
  "Покупка",
  "Встреча",
  "Звонок",
  "Событие",
  "Личное",
  "Другое",
];
const reminderStatuses = ["Активно", "Завершено", "Просроченно"];

const testUsersData = Array.from({ length: 20 }, (_, i) => {
  const registrationDate = generateRandomDate(
    subDays(new Date(), 365),
    new Date()
  );
  const lastActivity = generateRandomDate(registrationDate, new Date());
  const subscriptionStatus =
    userSubscriptionStatuses[
      Math.floor(Math.random() * userSubscriptionStatuses.length)
    ];
  const subscriptionEndDate =
    subscriptionStatus === "Премиум"
      ? addMonths(registrationDate, Math.floor(Math.random() * 12) + 1)
      : undefined;
  const country =
    userCountries[Math.floor(Math.random() * userCountries.length)];
  const language =
    userLanguages[Math.floor(Math.random() * userLanguages.length)];

  const userId = generateUserId();

  return {
    id: userId,
    registrationDate: format(registrationDate, "dd.MM.yyyy"),
    lastActivity: format(lastActivity, "dd.MM.yyyy HH:mm"),
    subscriptionStatus: subscriptionStatus,
    subscriptionEndDate: subscriptionEndDate
      ? format(subscriptionEndDate, "dd.MM.yyyy")
      : "N/A",
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    country: country,
    language: language,
    profile: {
      subscriptionHistory: [
        {
          status: "Бесплатно",
          startDate: format(registrationDate, "dd.MM.yyyy"),
          endDate:
            subscriptionStatus === "Премиум"
              ? format(registrationDate, "dd.MM.yyyy")
              : "Current",
        },
        ...(subscriptionStatus === "Премиум"
          ? [
              {
                status: "Премиум",
                startDate: format(registrationDate, "dd.MM.yyyy"),
                endDate: subscriptionEndDate
                  ? format(subscriptionEndDate, "dd.MM.yyyy")
                  : "Current",
              },
            ]
          : []),
      ],
      activity: {
        createdReminders: Math.floor(Math.random() * 500) + 10,
        activatedGeoReminders: Math.floor(Math.random() * 100) + 5,
        calendarIntegrations: Math.floor(Math.random() * 10),
        usedNotificationTypes: Array.from(
          { length: Math.floor(Math.random() * notificationTypes.length) + 1 },
          () =>
            notificationTypes[
              Math.floor(Math.random() * notificationTypes.length)
            ]
        ).filter((value, index, self) => self.indexOf(value) === index),
        lastLoginTime: format(lastActivity, "dd.MM.yyyy HH:mm:ss"),
      },
      requestHistory: Array.from(
        { length: Math.floor(Math.random() * 15) + 5 },
        (_, j) => ({
          id: `req-${userId}-${j + 1}`,
          timestamp: format(
            generateRandomDate(subDays(lastActivity, 30), lastActivity),
            "dd.MM.yyyy HH:mm:ss"
          ),
          querySnippet: `Запрос о ${reminderCategories[
            Math.floor(Math.random() * reminderCategories.length)
          ].toLowerCase()}`,
          responseStatus: Math.random() > 0.1 ? "Успешно" : "Провалено",
        })
      ),
      userReminders: Array.from(
        { length: Math.floor(Math.random() * 30) + 5 },
        (_, k) => ({
          id: `rem-${userId}-${k + 1}`,
          text: `Напоминание: ${
            reminderCategories[
              Math.floor(Math.random() * reminderCategories.length)
            ]
          } в ${format(
            generateRandomDate(
              subDays(new Date(), 90),
              addMonths(new Date(), 3)
            ),
            "dd.MM HH:mm"
          )}`,
          category:
            reminderCategories[
              Math.floor(Math.random() * reminderCategories.length)
            ],
          status:
            reminderStatuses[
              Math.floor(Math.random() * reminderStatuses.length)
            ],
          creationDate: format(
            generateRandomDate(subDays(new Date(), 180), new Date()),
            "dd.MM.yyyy"
          ),
        })
      ),
    },
  };
});

const UsersPage = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<
    (typeof testUsersData)[0] | null
  >(null);

  const handleOpenDialog = (user: (typeof testUsersData)[0]) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
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
          Пользователи и их профили
        </Typography>

        <Card sx={{ borderRadius: 2, mb: 4, p: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: theme.palette.grey[700] }}
          >
            Список пользователей
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", borderRadius: 2 }}
          >
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Имя/Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Регистрация</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Последняя активность
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Подписка</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Страна/Язык</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Действия
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testUsersData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      {user.name} <br />{" "}
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>{user.lastActivity}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.subscriptionStatus}
                        color={
                          user.subscriptionStatus === "Премиум"
                            ? "primary"
                            : "default"
                        }
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {user.subscriptionEndDate !== "N/A" && (
                        <Typography variant="caption" color="text.secondary">
                          до {user.subscriptionEndDate}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.country} / {user.language}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog(user)}
                        color="info"
                        aria-label="view user details"
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Детали профиля пользователя: {selectedUser?.name}
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedUser ? (
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    Общая информация
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: "none", mb: 2 }}
                  >
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>ID:</TableCell>
                          <TableCell>{selectedUser.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Имя:
                          </TableCell>
                          <TableCell>{selectedUser.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Email:
                          </TableCell>
                          <TableCell>{selectedUser.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Регистрация:
                          </TableCell>
                          <TableCell>{selectedUser.registrationDate}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Последняя активность:
                          </TableCell>
                          <TableCell>{selectedUser.lastActivity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Подписка:
                          </TableCell>
                          <TableCell>
                            {selectedUser.subscriptionStatus}{" "}
                            {selectedUser.subscriptionEndDate !== "N/A" &&
                              `(до ${selectedUser.subscriptionEndDate})`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Страна/Язык:
                          </TableCell>
                          <TableCell>
                            {selectedUser.country} / {selectedUser.language}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    История подписки
                  </Typography>
                  <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Статус
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Дата начала
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Дата окончания
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedUser.profile.subscriptionHistory.map(
                          (sub, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Chip
                                  label={sub.status}
                                  color={
                                    sub.status === "Премиум"
                                      ? "primary"
                                      : "default"
                                  }
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{sub.startDate}</TableCell>
                              <TableCell>{sub.endDate}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    Активность пользователя
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        <DirectionsRunIcon color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Создано напоминаний:
                          </Typography>
                          <Typography variant="h5">
                            {selectedUser.profile.activity.createdReminders.toLocaleString()}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Активировано гео-напоминаний:
                          </Typography>
                          <Typography variant="h5">
                            {selectedUser.profile.activity.activatedGeoReminders.toLocaleString()}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        <CalendarMonthIcon color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Интеграций с календарем:
                          </Typography>
                          <Typography variant="h5">
                            {selectedUser.profile.activity.calendarIntegrations.toLocaleString()}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        <NotificationsActiveIcon
                          color="primary"
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Типы уведомлений:
                          </Typography>
                          <Typography variant="h6">
                            {selectedUser.profile.activity.usedNotificationTypes.join(
                              ", "
                            )}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      >
                        <LogoutIcon color="primary" sx={{ mr: 2 }} />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Время последнего входа:
                          </Typography>
                          <Typography variant="h6">
                            {selectedUser.profile.activity.lastLoginTime}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    История запросов
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: "none", maxHeight: 300, overflow: "auto" }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Время
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Фрагмент запроса
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Статус
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedUser.profile.requestHistory.map((req) => (
                          <TableRow key={req.id}>
                            <TableCell>{req.timestamp}</TableCell>
                            <TableCell>{req.querySnippet}</TableCell>
                            <TableCell>
                              <Chip
                                label={req.responseStatus}
                                color={
                                  req.responseStatus === "Успешно"
                                    ? "success"
                                    : "error"
                                }
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mt: 1, display: "block" }}
                  >
                    *Представлены анонимизированные фрагменты запросов для
                    анализа паттернов.
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    История напоминаний пользователя
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: "none", maxHeight: 300, overflow: "auto" }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Дата создания
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Текст напоминания
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Категория
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Статус
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedUser.profile.userReminders.map((reminder) => (
                          <TableRow key={reminder.id}>
                            <TableCell>{reminder.creationDate}</TableCell>
                            <TableCell>{reminder.text}</TableCell>
                            <TableCell>{reminder.category}</TableCell>
                            <TableCell>
                              <Chip
                                label={reminder.status}
                                color={
                                  reminder.status === "Активно"
                                    ? "primary"
                                    : reminder.status === "Завершено"
                                    ? "success"
                                    : reminder.status === "Просроченно"
                                    ? "error"
                                    : "warning"
                                }
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              variant="outlined"
            >
              Закрыть
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default UsersPage;
