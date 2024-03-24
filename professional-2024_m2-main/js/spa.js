let currentPage = 'mainPage'


function replaceWindow(open) {
    document.getElementById(currentPage).style.display = 'none'
    document.getElementById(open).style.display = 'block'
    currentPage = open;
    if (open == 'login') {
        document.getElementById(open).style.display = 'flex'
    }
    else if (open == 'fromPage' || open == 'backPage' || open == 'bookingPage' || open == 'register' || open == 'seatPage' || open == 'seatPageBack') {
        document.getElementById(open).style.display = 'flex'
    }


}



