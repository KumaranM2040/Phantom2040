var toDoItemList = [];

var countOfCompleted = 0;
var application = angular.module("toDoApplication", []);

application.factory('toDoListCRUD', function ($http) {
  return {
    issueAddCommand: function (success, failure, newToDoItem) {
      $http.post(`http://127.0.0.1:4041/todos/`, newToDoItem).then(success, failure)
    },

    toDoItemList: function (success, failure) {
        $http.get('http://127.0.0.1:4041/todos').then(success, failure);
      },

    issueRemoveCommand: function (success, failure,id) {
        $http.delete(`http://127.0.0.1:4041/todos/${id}`).then(success, failure);
      }
    }
  }
);

application.controller("TodoListController", function ($scope, toDoListCRUD) {
  function success(response) {

    console.log({
      success: response
    });
    $scope.toDoList = response.data;
    $scope.toDoList.forEach(element => {
      var toDoItem = {
        name: "",
        completionStatus: false,
        comments: ""
      };

      toDoItem.name = element.title;
      toDoItem.completionStatus = element.done;
      if (element.done) {
        countOfCompleted++;
      }
      toDoItemList.push(toDoItem);
    });
    $scope.toDoItem = {
      toDoList: toDoItemList,
      countOfCompleted: countOfCompleted
    };
  }

  function failure(response) {
    console.log({
      failure: response
    });
  }
  toDoListCRUD.toDoItemList(success, failure);

  $scope.toDoItem = {
    addItem: function () {
      console.log($scope.text);
      toDoListCRUD.issueAddCommand(success, failure, {
        "title": $scope.text,
        "done": false
      });
      console.log($scope);
    },
    removeItem: function () {
      console.log($scope.text);
      toDoListCRUD.issueRemoveCommand(success, failure, { 
        "id":$scope.id
      });
      console.log($scope);
    }
  };

});
