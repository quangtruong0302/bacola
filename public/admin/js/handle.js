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

const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  let url = new URL(window.location.href);
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

const buttonChangeSatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeSatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  buttonChangeSatus.forEach((button) => {
    button.addEventListener("click", () => {
      const dataId = button.getAttribute("data-id");
      const dataStatusCurrent = button.getAttribute("data-status");
      const dataStatus = dataStatusCurrent == "active" ? "inactive" : "active";
      formChangeStatus.action = `/administratoristrator/products/change-status/${dataStatus}/${dataId}?_method=PATCH`;
      formChangeStatus.submit();
    });
  });
}

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

// Xử lí xoá sản phẩm
const buttonDeleteSingle = document.querySelectorAll("[button-delete-single]");
if (buttonDeleteSingle.length > 0) {
  const formDeleteSingle = document.querySelector("[form-delete-single]");
  buttonDeleteSingle.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn xoá sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const dataName = button.getAttribute("data-name");
        let action = "";
        if (dataName == "product") {
          action = `/administrator/products/delete/${id}?_method=PATCH`;
        }
        if (dataName == "product-in-trash") {
          action = `/administrator/products/trash/delete/${id}?_method=DELETE`;
        }

        formDeleteSingle.action = action;
        formDeleteSingle.submit();
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
