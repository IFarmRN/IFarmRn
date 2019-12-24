const AddUser = usersData => {
  return {
    type: "ADD_USER_DATA",
    payload: { usersData, id: Date.now(), Date: Date() }
  };
};

export default AddUser;
