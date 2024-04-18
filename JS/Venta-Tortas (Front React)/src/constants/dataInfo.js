const dataInfo = {
  billing: {
    Security: ["changePassword", "changePin", "changeEmail"],
    TwoFactor: ["enable", "disable", "reset"],
    Millenial: ["local", "global", "reset"],
  },
  local: {
    Personal: ["getRoutes", "changeAddress", "changePhone"],
    Account: ["changeAccount", "changeCurrency", "changeLanguage"],
    Notifications: ["enable", "disable", "reset"],
  },
  sales: {
    Personal: ["changeName", "changeAddress", "changePhone"],
  },
};

export default dataInfo;
