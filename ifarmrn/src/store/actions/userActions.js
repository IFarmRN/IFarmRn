const AddUser = usersData => {
  const date = new Date();

  return {
    type: "ADD_USER_DATA",
    payload: {
      usersData,
      id: Date.now(),
      Date: {
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        time: `${date.getHours()}:${date.getMinutes()}`
      }
    }
  };
};

const updateUser = (usersData, user, confinamento) => {
  const { id, Date } = user;
  return {
    type: "UPDATE_DATA",
    payload: {
      usersData,
      confinamento: confinamento || user.confinamento || null,
      id,
      Date
    }
  };
};

export { AddUser, updateUser };
