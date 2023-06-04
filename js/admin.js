// function thu vien
// get danh sach nguoi dung
function getUserList() {
    let userList = JSON.parse(localStorage.getItem("listUsers"));
    if (!userList) {
        return []
    }
    return userList
}
// hien thi active
function getTextIsActive(isActive) {
    if (isActive) {
        return "Hoat dong"
    }
    return "Bi khoa"
}

// hien thi active
function getClassIsActive(isActive) {
    if (isActive) {
        return "active"
    }
    return "block"
}

// hien thi chuc vu
function getTextIsAdmin(isAdmin) {
    if (isAdmin) {
        return "Quan tri vien"
    }
    return "Thanh vien"
}


// lay thong tin nguoi dung theo id
function getInforUser(userId) {
    let userList = JSON.parse(localStorage.getItem("listUsers"));
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            return userList[i];
        }
    }
    return false
}

// kiem tra nguoi dung da dang nhap hay chua vac¥. co phai la admn¥in hay khong
function checkLogion() {
    if (!localStorage.getItem("checkLogin")) {
        window.location.href = "login.html"
        return
    }
    let userInfor = getInforUser(localStorage.getItem("checkLogin"));
    if (userInfor) {
        if (!userInfor.isAdmin) {
            window.location.href = "login.html"
        }
    } else {
        window.location.href = "login.html"
    }
}

// goi
checkLogion()


// hien thi nguoi dung
function showUserListToUi() {
    const table = document.querySelector(".tableUser");
    let tableContent = `
        <tr>
            <th class="tabe--title">STT</th>
            <th class="tabe--title">Id</th>
            <th class="tabe--title">Email</th>
            <th class="tabe--title">Trạng thái</th>
            <th class="tabe--title">Chức vụ</th>
            <th class="tabe--title">Công cụ</th>
        </tr>
    `;
    let i = 1;
    for (user of getUserList()) {
        tableContent += `
                <td class="tabe--content">${i}</td>
                <td class="tabe--content">${user.idUser}</td>
                <td class="tabe--content">${user.email}</td>
                <td class="tabe--content status ${getClassIsActive(user.isActive)}">${getTextIsActive(user.isActive)}</td>
                <td class="tabe--content">${getTextIsAdmin(user.isAdmin)}</td>
                <td class="tabe--content">
                    <span onclick="deleteUser(${user.idUser})" class="btn material-symbols-outlined">delete</span>
                    <span onclick="controlStatusBlockUser(${user.idUser})" class="btn btn-block material-symbols-outlined">block</span>
                </td>
            </tr>
        `
    }
    table.innerHTML = tableContent;
}
showUserListToUi()
// delete user
function deleteUser(userId) {
    let userList = getUserList();
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            userList.splice(i, 1);
            localStorage.setItem("listUsers", JSON.stringify(userList)) // save to local
            showUserListToUi();
            return true
        }
    }
    return false
}
function controlStatusBlockUser(userId) {
    let userList = getUserList();
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            userList[i].isActive = !userList[i].isActive;
            localStorage.setItem("listUsers", JSON.stringify(userList)) // save to local
            showUserListToUi();
            return true
        }
    }
    return false
}

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
let listProducts = JSON.parse(localStorage.getItem("listProducts"));
function renderManegeProduct(params) {
    let result = "";
    for (let i = 0; i < params.length; i++) {
        result +=
            `
         <div class="cartProduct-item">
            <div class="cart-img">
                <img src="${params[i].image}">
            </div>
            <div class="cart-info">
                <div class="content-product">
                    <b>${params[i].name}</b>
                    <p>${VND.format(params[i].price)}</p>
                </div>
                <div class="numberProduct">
                    <span onclick="decrease()" class="material-symbols-outlined">
                        remove
                    </span>
                    <span></span>
                    <span onclick="increase()" class="material-symbols-outlined">
                        add
                    </span>
                </div>
            </div>
        </div>
         `
    }
    document.querySelector(".manage-product").innerHTML = result;
}
renderManegeProduct(listProducts);






