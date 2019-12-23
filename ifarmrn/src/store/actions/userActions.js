const AddUser = usersData => {
  return {
    type: "ADD_USER_DATA",
    payload: { usersData, id: Date.now(), Data: Date() }
  };
};

export default AddUser;
