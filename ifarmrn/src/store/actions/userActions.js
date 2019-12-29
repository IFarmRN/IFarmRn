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

export default AddUser;
