var courseApi = "http://localhost:3000/products";

function start() {
  getCourses(renderCourses);
  handleCreateForm();
}

start();

// Functions

// Render Courses

function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderCourses(courses) {
  var listCoursesBlock = document.querySelector("#list-products");
  var htmls = courses.map(function (course) {
    return `
      <tr class="course-item-${course.id}">
        <td>${course.id}</td>
        <td>
          <div class="order-owner">
            <img src="${course.image}" alt="user image">
            <span>${course.name}</span>
          </div>
        </td>
        <td>${course.price}</td>
        <td>
          ${course.category}
        </td>
        <td>
          ${course.brand}
        </td>
        <td>
        <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
          <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
        </td>
      </tr>`;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}

// CreateCourse

function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleCreateForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };
    if (name != "" && description != "") {
      createCourse(formData, function () {
        getCourses(renderCourses);
      });
    } else {
      alert("Hãy nhập đầy đủ thông tin");
    }
  };
}

// Delete course
function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}

//Update course

function updateCourse(id, data, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleUpdateCourse(id) {
  var courseItem = document.querySelector(".course-item-" + id);

  var getName = courseItem.querySelector("h2").innerText;
  var getDescription = courseItem.querySelector("p").innerText;

  var name = document.querySelector('input[name="name"]');
  var description = document.querySelector('input[name="description"]');

  name.value = getName;
  description.value = getDescription;
  if (!document.querySelector("#update")) {
    document.querySelector("#create").id = "update";
  }
  document.querySelector("#update").innerText = "Lưu";

  var updateBtn = document.querySelector("#update");
  updateBtn.onclick = function () {
    var formData = {
      name: name.value,
      description: description.value,
    };
    if (name.value != "" && description.value != "") {
      updateCourse(id, formData, function () {
        getCourses(renderCourses);
      });
    } else {
      alert("Hãy nhập đầy đủ thông tin");
    }
  };
}
