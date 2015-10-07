var faker = require('faker')

export default function getUsers() {
  return new Promise((resolve) => {
    var companies = ['American Foundation for Children with AIDS','Friends of Animals','Humane Farming Association','Glaucoma Foundation','Guide Dog Foundation for the Blind','National Breast Cancer Coalition Fund','Childrens Defense Fund','American Humane Association','ChildFund International','World Vision','American Rivers','Environmental Defense Fund'];
    var departments = ['QA','Engineering','Marketing','Sales','HR','Finance'];
    var jsonData = {
      users: [],
    }
    for (var i = 0; i < 2000; i++) {
      var newUser = {};
      var companyId = faker.random.number(12);
      var deptId = faker.random.number(6);
      newUser.name = faker.name.findName();
      newUser.hours = faker.random.number(30);
      newUser.department = departments[deptId];
      newUser.locationOfWork = companies[companyId];
      jsonData.users.push(newUser);
    }
    resolve({
      data: jsonData
    });
  });
}
