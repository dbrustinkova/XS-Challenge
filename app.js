var list = new Array();
var pageList = new Array();
var paginationList = new Array();
var currentPage = 1;
var numberPerPage = 5;
var numberOfPages = 1;

function makeList() {
    let url = `./ranking.json`;
    let img = `<img src="./Images/avatar.png" alt='avatar' class="avatarImage">`;
    let message = `<img src="./Images/message.png" alt='message'>`;

    fetch(url)
        .then((info => info.json()))
        .then((data) => {
            if (data.status == 1) {
                let obj = Object.entries(data.ranking);
                
                for (let [key, value] of obj) {
                    
                    list.push('<tr class="tr">' + '<td>' + key + '</td>' + '<td style="text-align: right;">' + img + '</td>' + '<td style="text-align: left; color: rgb(233, 0, 164); font-weight: normal;">' + value.name + '</td>' + '<td style="text-align: left; color: rgb(233, 0, 164); font-weight: normal;">' + value.club + '</td>' + '<td>' + value.level + '</td>' + '<td>' + value.experience + '</td>' + '<td>' + message + '</td>' + '</tr>');
                }
                numberOfPages = getNumberOfPages();
                loadList();
            } else {
                document.getElementById('errorPopUp').style.visibility = 'visible';
            }
        })
}

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
}

function drawList() {
    document.getElementById("tbody").innerHTML = "";
    for (i = 0; i < pageList.length; i++) {
        document.getElementById("tbody").innerHTML += pageList[i];
    }
}

function check() {
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
}

const pag_element = document.getElementById('pagNumbers');

function loading() {
    makeList();
    drawPaginationNumbers(pag_element);
    loadList();
}

window.addEventListener("load", loading);

drawPaginationNumbers(pag_element);

function drawPaginationNumbers(wrapper) {
    wrapper.innerHTML = "";

    for (let i = 1; i < numberOfPages + 1; i++) {
        let btn = PaginationBtn(i);

        wrapper.appendChild(btn);
    }
}

function paginationBtn(page) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) {
        button.classList.add('active');
    }
    return button;
}

function reLoad() {
    var elem = document.getElementById("myBar");
    document.getElementById("myProgress").style.visibility = 'visible';
    document.getElementById('btnReload').classList.remove('btnReload');
    document.getElementById('btnReload').classList.add('btnReloadInactive');
    document.getElementById('btnReload').disabled = true;
    
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width == 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }

    var timeleft = 10;
    var downloadTimer = setInterval(function () {
        timeleft--;

        document.getElementById("countdownTimer").value = '00:00:0' + timeleft;

        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("myProgress").style.visibility = 'hidden';
            document.getElementById('btnReload').classList.remove('btnReloadInactive');
            document.getElementById('btnReload').classList.add('btnReload');
            document.getElementById('btnReload').disabled = false;
        }
    }, 100);
}

function hideTable() {
    const a = document.getElementById('btn_hide_table');
    const b = window.getComputedStyle(a).transform;
    console.log(b);

    if (b == 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
        document.getElementById('thead').style.visibility = 'hidden';
        document.getElementById('tbody').style.visibility = 'hidden';
        document.getElementById('btn_hide_table').style.transform = 'rotateZ(90deg)';
        document.getElementById('pagination').style.visibility = 'hidden';

        for (i = 0; i < list.length; i++) {
            document.getElementsByClassName('tr')[i].style.boxShadow = 'none';
        }
    } else {
        document.getElementById('thead').style.visibility = 'visible';
        document.getElementById('tbody').style.visibility = 'visible';
        document.getElementById('btn_hide_table').style.transform = 'rotateZ(270deg)';
        document.getElementById('pagination').style.visibility = 'visible';

        for (i = 0; i < list.length; i++) {
            document.getElementsByClassName('tr')[i].style.boxShadow = '0px 15px 22px #ceb2c4';
        }
    }
}