// Xử lí bộ lọc theo trạng thái
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}

// Xử lí phân trang
const pagination = document.querySelectorAll("[button-pagination]");
const buttonNext = document.querySelector("[button-next]");
const buttonPrevsios = document.querySelector("[button-previous]");
if (pagination) {
  let url = new URL(window.location.href);
  pagination.forEach((button) => {
    button.addEventListener("click", () => {
      let page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url;
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);

  // Xử lý form tìm kiếm
  const formSearch = document.querySelector("[form-search]");
  if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = e.target.elements.search.value;
      if (keyword) {
        url.searchParams.set("search", keyword);
      } else {
        url.searchParams.delete("search");
      }
      window.location.href = url.href;
    });
  }

  // Xử lý form sắp xếp
  const formSort = document.querySelector("[form-sort]");
  if (formSort) {
    formSort.addEventListener("submit", (e) => {
      e.preventDefault();
      const sortValue = e.target.elements["sort-value"].value;
      const sortKey = e.target.elements["sort-key"].value;
      if (sortValue && sortKey) {
        url.searchParams.set("sort-value", sortValue);
        url.searchParams.set("sort-key", sortKey);
      } else {
        url.searchParams.delete("sort-value");
        url.searchParams.delete("sort-key");
      }
      window.location.href = url.href;
    });
  }

  // Xử lý form danh mục
  const formCategory = document.querySelector("[form-category]");
  if (formCategory) {
    formCategory.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = e.target.elements.category.value;
      if (category) {
        url.searchParams.set("category", category);
      } else {
        url.searchParams.delete("category");
      }
      window.location.href = url.href;
    });
  }
});

// Xử lí thay đổi trạng thái
const buttonChangeSatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeSatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  buttonChangeSatus.forEach((button) => {
    button.addEventListener("click", () => {
      const dataId = button.getAttribute("data-id");
      const dataName = button.getAttribute("data-name");
      if (dataName == "product") {
        const dataStatusCurrent = button.getAttribute("data-status");
        const dataStatus =
          dataStatusCurrent == "active" ? "inactive" : "active";
        formChangeStatus.action = `/administrator/products/change-status/${dataStatus}/${dataId}?_method=PATCH`;
      }
      if (dataName == "category") {
        const dataStatusCurrent = button.getAttribute("data-status");
        const dataStatus =
          dataStatusCurrent == "active" ? "inactive" : "active";
        formChangeStatus.action = `/administrator/categories/change-status/${dataStatus}/${dataId}?_method=PATCH`;
      }

      formChangeStatus.submit();
    });
  });
}

// Xử lí chọn nhiều sản phẩm
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const checkAll = document.querySelector("input[name='check-all']");
  const checkSingle = document.querySelectorAll("input[name='id']");
  // Xử lí chọn check-all
  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  // Xử lí chọn từng checkbox
  checkSingle.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const countCheckbox = document.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countCheckbox == checkSingle.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkeds = document.querySelectorAll("input[name='id']:checked");
    const actionType = e.target.elements["action-type"].value;
    if (actionType == "delete-all") {
      const isConfirm = confirm("Bạn chắc chắn muốn xóa các sản phẩm này?");
      if (!isConfirm) {
        return;
      }
    }
    if (checkeds.length > 0) {
      let listID = [];
      checkeds.forEach((checked) => {
        let id = checked.value;
        listID.push(id);
      });
      formChangeMulti.querySelector("input[name='list-id']").value =
        listID.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm");
    }
  });
}

// Xử lí xoá single
const buttonDeleteSingle = document.querySelectorAll("[button-delete-single]");
if (buttonDeleteSingle.length > 0) {
  const formDeleteSingle = document.querySelector("[form-delete-single]");
  buttonDeleteSingle.forEach((button) => {
    button.addEventListener("click", () => {
      const dataName = button.getAttribute("data-name");
      let action = "";
      // Xóa sản phẩm
      if (dataName == "product") {
        const isConfirm = confirm("Bạn muốn xoá sản phẩm này?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          action = `/administrator/products/delete/${id}?_method=PATCH`;
          formDeleteSingle.action = action;
          formDeleteSingle.submit();
        }
      }
      // Xóa sản phẩm trong thùng rác
      if (dataName == "product-in-trash") {
        const isConfirm = confirm("Bạn muốn xoá vĩnh viễn sản phẩm này?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          action = `/administrator/products/trash/delete/${id}?_method=DELETE`;
          formDeleteSingle.action = action;
          formDeleteSingle.submit();
        }
      }
      // Xóa danh mục sản phẩm
      if (dataName == "category") {
        const isConfirm = confirm("Bạn muốn xóa danh mục này?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          action = `/administrator/categories/delete/${id}?_method=PATCH`;
          formDeleteSingle.action = action;
          formDeleteSingle.submit();
        }
      }
      // Xóa nhóm quyền
      if (dataName == "role") {
        const isConfirm = confirm("Bạn muốn xóa nhóm quyền này?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          action = `/administrator/roles/delete/${id}?_method=PATCH`;
          formDeleteSingle.action = action;
          formDeleteSingle.submit();
        }
      }
    });
  });
}

// Xử lí khôi phục sản phẩm
const buttonRestoreSingle = document.querySelectorAll(
  "[button-restore-single]"
);
if (buttonRestoreSingle.length > 0) {
  const formRestoreSingle = document.querySelector("[form-restore-single]");
  buttonRestoreSingle.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn khôi phục sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        formRestoreSingle.action = `/administrator/products/trash/restore/${id}?_method=PATCH`;
        formRestoreSingle.submit();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const alertBox = document.getElementById("alertBox");
  if (alertBox) {
    setTimeout(() => {
      alertBox.style.transition = "opacity 0.5s ease";
      alertBox.style.opacity = "0";
      setTimeout(() => alertBox.remove(), 500);
    }, 2000);
  }
});

// Xử lí prewiew upload ảnh
const thumbnailInput = document.querySelector("#thumbnail");
const imgPreview = document.querySelector("#img-preview");
if (thumbnailInput && imgPreview) {
  thumbnailInput.onchange = (e) => {
    const [file] = thumbnailInput.files;
    imgPreview.src = URL.createObjectURL(file);
  };
}

const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit-permissions]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const rows = tablePermissions.querySelectorAll("tr[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          permissions.push({
            id: input.value,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, idx) => {
          if (input.checked) {
            permissions[idx].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "[form-change-permissions]"
      );
      const input = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      input.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}

const dataRoles = document.querySelector(".data-roles");
if (dataRoles) {
  const newData = JSON.parse(dataRoles.getAttribute("data"));
  const tablePermissions = document.querySelector("[table-permissions]");

  newData.forEach((item, index) => {
    const permissions = item.permissions;
    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
