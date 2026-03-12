const users = [
    { id: 1, name: "Mandar", active: true },
    { id: 2, name: "Rahul", active: false },
    { id: 3, name: "Amit", active: true }
   ];
   
   const activeNames = users
     .filter(user => user.active)
     .map(user => user.name);
   
   console.log(activeNames);