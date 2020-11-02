function toastSaved() {
    M.toast({ html: 'Team Saved!' })
}

function tabsInit() {
    let option = ({
        swipeable: true
    })
    var elem = document.querySelectorAll('.tabs')
    var instance = M.Tabs.init(elem, option);
}

function loadSelect() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}
document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    loadSideNav();
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                var urlParams = new URLSearchParams(window.location.search);
                var idParam = urlParams.get("id");
                if (idParam !== null) {
                    content = document.querySelector("#body-detail");
                    var newScript = document.createElement("script");
                    newScript.text = "tabsInit()";
                    content.appendChild(newScript);
                    var isFromSaved = urlParams.get("saved");
                    console.log(isFromSaved)
                    if (isFromSaved) {
                        getSavedTeamById()
                    } else { getTeamsById() }


                } else {
                    if (this.status == 200) {

                        content.innerHTML = xhttp.responseText;
                        if (page === 'home') {
                            var newScript = document.createElement("script");
                            newScript.text = "loadSelect()";
                            content.appendChild(newScript);
                            select = document.getElementById("standing-select");
                            select.onchange = function() {
                                getStandings(this.value)
                            };
                        } else if (page === 'teams') {
                            var newScript = document.createElement("script");
                            newScript.text = "loadSelect()";
                            content.appendChild(newScript);
                            select = document.getElementById("team-select");
                            select.onchange = function() {
                                getTeams(this.value)
                            };
                        } else if (page === 'saved') {

                            getSavedTeam()
                        }

                    } else if (this.status == 404) {
                        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                    } else {
                        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                    }
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    function loadSideNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                document.querySelectorAll(".sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                document.querySelectorAll(".sidenav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "sidenav.html", true);
        xhttp.send();
    }

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                document.querySelectorAll(".topnav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                document.querySelectorAll(".topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
});