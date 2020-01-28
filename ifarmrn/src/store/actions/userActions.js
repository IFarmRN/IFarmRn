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

const updateUser = (usersData, user) => {
  const { id, Date } = user;
  const confinamento = user.confinamento || "null";

  return {
    type: "UPDATE_DATA",
    payload: {
      usersData,
      confinamento,
      id,
      Date
    }
  };
};

const updateUserConfinamento = (usersData, user, confinamento) => {
  const { id, Date } = user;

  const data = {
    type: "UPDATE_DATA",
    payload: {
      usersData,
      confinamento,
      id,
      Date
    }
  };
  return data;
};

export { AddUser, updateUser, updateUserConfinamento };
