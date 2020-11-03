var base_url = "https://api.football-data.org/v2/";
let api_token = '9aaf7b8ec81e4ecf8d3292f6594b58b3'


function showNotifikasiSederhana() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function saveTeam() {
    console.log("Tombol FAB di klik.");
    var item = getTeamsById();
    item.then(function(teams) {
        saveForLater(teams);
    });
};

function json(response) {
    return response.json();
}

function getRandomColor() {
    var color = ["red", "blue", "yellow", "green", "cyan", "purple", "orange", "lime"];
    return color[Math.floor(Math.random() * color.length)];
}

function error(error) {

    console.log("Error : " + error);
}
// menampilkan daftar klasemen berdasarkan id liga
function getStandings(value) {
    if ("caches" in window) {
        caches.match(base_url + "competitions/" + value + "/standings", {
            method: 'GET',
            headers: {
                'X-Auth-Token': api_token,
            },
        }).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let headerHTML = ""
                    headerHTML = `<tr>
                    <th>Pos</th>
                    <th class="crest-team"></th>
                    <th>Club</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Points</th>
                </tr>`;
                    document.getElementById("head-league").innerHTML = headerHTML
                    var teamsHTML = "";
                    let stands = data.standings.filter(function(elem) { return elem.type === "TOTAL"; })
                    stands.forEach(function(table) {

                        table.table.forEach(function(team) {
                            teamsHTML += `
                            <tr>
                            <td>${team.position}</td>
                            <td class="crest-team"><img width="18px" height="18px" class="responsive-img" src="${team.team.crestUrl}" /></td>
                            <td>${team.team.name}</td>
                            <td>${team.playedGames}</td>
                            <td>${team.won}</td>
                            <td>${team.draw}</td>
                            <td>${team.lost}</td>
                            <td>${team.goalsFor}</td>
                            <td>${team.goalsAgainst}</td>
                            <td>${team.goalDifference}</td>
                            <td>${team.points}</td>
                        </tr>
                    `;
                        })
                    });
                    document.getElementById("standing-league").innerHTML = teamsHTML;
                });
            }
        });
    }

    fetch(base_url + "competitions/" + value + "/standings", {
            method: 'GET',
            headers: {

                'X-Auth-Token': api_token,

            },
        })
        .then(status)
        .then(json)
        .then(function(data) {
            let headerHTML = ""
            headerHTML = `<tr>
            <th>Pos</th>
            <th class="crest-team"></th>
            <th>Club</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
        </tr>`;
            document.getElementById("head-league").innerHTML = headerHTML
            var teamsHTML = "";
            let stands = data.standings.filter(function(elem) { return elem.type === "TOTAL"; })
            stands.forEach(function(table) {

                table.table.forEach(function(team) {
                    teamsHTML += `
                    <tr>
                    <td>${team.position}</td>
                    <td class="crest-team"><img width="18px" height="18px" class="responsive-img" src="${team.team.crestUrl}" /></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td>${team.goalDifference}</td>
                    <td>${team.points}</td>
                </tr>
            `;
                })

            });
            document.getElementById("standing-league").innerHTML = teamsHTML;
        })
        .catch(error);

}
// menampilkan value tim dengan memasukkan id liga
function getTeams(value) {


    if ("caches" in window) {
        caches.match(base_url + "competitions/" + value + "/teams", {
            method: 'GET',
            headers: {
                'X-Auth-Token': api_token,
            },
        }).then(function(response) {
            if (response) {

                response.json().then(function(data) {
                    var teamsHTML = "";
                    data.teams.forEach(function(team) {

                        teamsHTML += `
                        <div  class="col s12 m2">
                        <div class="card team-card">
                            <div class="card-image">
                                <img class="responsive-img" src="${team.crestUrl}">
                            </div>
                            <div class="card-content">
                                <span class="card-title truncate">${team.shortName}</span>
                                <p class="flow-text truncate">${team.venue}</p>
                                <a href="./detailteam.html?id=${team.id}">Club Profile <i class="material-icons" style="color: black; font-size: 12px;">arrow_forward</i></a>
                            </div>
                        </div>
                    </div>
                `;
                    });
                    document.getElementById("card-team").innerHTML = teamsHTML;
                });
            }
        });
    }

    fetch(base_url + "competitions/" + value + "/teams", {
            method: 'GET',
            headers: {
                'X-Auth-Token': api_token,
            },
        })
        .then(status)
        .then(json)
        .then(function(data) {
            var teamsHTML = "";
            data.teams.forEach(function(team) {
                console.log(team)
                teamsHTML += `
                <div  class="col s12 m2">
                <div class="card team-card">
                    <div class="card-image">
                        <img class="responsive-img" src="${team.crestUrl}"/>
                    </div>
                    <div class="card-content">
                        <span class="card-title truncate">${team.shortName}</span>
                        <p class="flow-text truncate">${team.venue}</p>
                        <a href="./detailteam.html?id=${team.id}">Club Profile <i class="material-icons" style="color: black; font-size: 12px;">arrow_forward</i></a>
                    </div>
                </div>
            </div>
        `;
            });
            document.getElementById("card-team").innerHTML = teamsHTML;
        })
        .catch(error);

}
// Menampilkan data tim berdasarkan id
function getTeamsById() {
    return new Promise(function(resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': api_token,
                },
            }).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        let btnHTML = ``
                        let tableHTML = ``
                        let position = ''
                        let squadFilter = data.squad.filter(function(elem) { return elem.role === "PLAYER"; })
                        squadFilter.forEach(function(squad) {
                            if (squad.position === "Goalkeeper") {
                                position = "GK"
                            } else if (squad.position === "Defender") {
                                position = "DF"
                            } else if (squad.position === "Midfielder") {
                                position = "MF"
                            } else {
                                position = "FW"
                            }
                            tableHTML += `<tr>
                            <td>${position}</td>
                            <td>${squad.name}</td>
                            <td>${squad.nationality}</td>
                        </tr>`
                        })
                        data.activeCompetitions.forEach(function(compe) {
                            btnHTML += `<a class="waves-effect waves-light btn-small ${getRandomColor()} darken-1">${compe.name}</a>`
                        })

                        let teamHTML = `
                        <div class="row">
                        <div class="col s12">
                            <div class="detail-crest col s12 m3">
                                <img class="responsive-img" src="${data.crestUrl}" />
                            </div>
                            <div class="detail-overview col s12 m8">
                                <h2>${data.name}</h2>
                                <h6> <i class="material-icons">map</i>${data.venue}</h6>
                                <a href="${data.website}"> <i class="material-icons">language</i>${data.website}</a>
                                <h6 id="detail-compe">Competitions: </h6>
                                <div class="col s12 detail-btn-compe">
                                    ${btnHTML}
                                </div>
                                <div class="col s12 detail-btn-compe">
                                 <a class="waves-effect waves-light btn-small blue darken-1" onclick="saveTeam()"><i class="material-icons right" style="color:#f7f7f7;">save</i>Save</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <div class="col s12 m3 ">
                                <div class="card detail-profile ">
                                    <div class="col s12 detail-card-header">
                                        <h6>${data.shortName}</h6>
                                    </div>
                                    <div class="card-content detail-profile-content">
        
                                        <p>Founded: ${data.founded}</p>
                                        <p><i class="material-icons">location_on</i>${data.address}</p>
                                        <p><i class="material-icons">email</i>${data.email}</p>
                                        <p><i class="material-icons">call</i>${data.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m8 ">
                                <ul id="tabs-swipe-demo" class="tabs ">
                                    <li class="tab col s3"><a class="active" href="#swipe-1">Squad List</a></li>
                                </ul>
                                </div>
                                <div class="col s12 m8">
                                <div class="detail-tab-squad" id="swipe-1">
                                    <div class="detail-card-squad">
                                        <div class="card-content">
                                            <table class="responsive-table highlight striped">
                                                <thead>
                                                    <tr>
                                                        <th>Pos</th>
                                                        <th>Name</th>
                                                        <th>Nationality</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${tableHTML}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      `;

                        document.getElementById("body-detail").innerHTML = teamHTML;
                        resolve(data);
                    });
                }
            });
        }
        fetch(base_url + "teams/" + idParam, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': api_token,
                },
            })
            .then(status)
            .then(json)
            .then(function(data) {
                let btnHTML = ``
                let tableHTML = ``
                let position = ''
                let squadFilter = data.squad.filter(function(elem) { return elem.role === "PLAYER"; })
                squadFilter.forEach(function(squad) {
                    if (squad.position === "Goalkeeper") {
                        position = "GK"
                    } else if (squad.position === "Defender") {
                        position = "DF"
                    } else if (squad.position === "Midfielder") {
                        position = "MF"
                    } else {
                        position = "FW"
                    }
                    tableHTML += `<tr>
                    <td>${position}</td>
                    <td>${squad.name}</td>
                    <td>${squad.nationality}</td>
                </tr>`
                })
                data.activeCompetitions.forEach(function(compe) {
                    btnHTML += `<a class="waves-effect waves-light btn-small ${getRandomColor()} darken-1">${compe.name}</a>`
                })

                let teamHTML = `
                <div class="row">
                <div class="col s12">
                    <div class="detail-crest col s12 m3">
                        <img class="responsive-img" src="${data.crestUrl}" />
                    </div>
                    <div class="detail-overview col s12 m8">
                        <h2>${data.name}</h2>
                        <h6> <i class="material-icons">map</i>${data.venue}</h6>
                        <a href="${data.website}"> <i class="material-icons">language</i>${data.website}</a>
                        <h6 id="detail-compe">Competitions: </h6>
                        <div class="col s12 detail-btn-compe">
                            ${btnHTML}
                        </div>
                        <div class="col s12 detail-btn-compe">
                        <a class="waves-effect waves-light btn-small blue darken-1" onclick="saveTeam()"><i class="material-icons right" style="color:#f7f7f7;">save</i>Save</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <div class="col s12 m3 ">
                        <div class="card detail-profile ">
                            <div class="col s12 detail-card-header">
                                <h6>${data.shortName}</h6>
                            </div>
                            <div class="card-content detail-profile-content">

                                <p>Founded: ${data.founded}</p>
                                <p><i class="material-icons">location_on</i>${data.address}</p>
                                <p><i class="material-icons">email</i>${data.email}</p>
                                <p><i class="material-icons">call</i>${data.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m8 ">
                        <ul id="tabs-swipe-demo" class="tabs ">
                            <li class="tab col s3"><a class="active" href="#swipe-1">Squad List</a></li>
                        </ul>
                        </div>
                        <div class="col s12 m8">
                        <div class="detail-tab-squad" id="swipe-1">
                            <div class="detail-card-squad">
                                <div class="card-content">
                                    <table class="responsive-table highlight striped">
                                        <thead>
                                            <tr>
                                                <th>Pos</th>
                                                <th>Name</th>
                                                <th>Nationality</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${tableHTML}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
              `;
                document.getElementById("body-detail").innerHTML = teamHTML;
                resolve(data);
            });
    });

}

function getSavedTeam() {

    var urlParams = new URLSearchParams(window.location.search);

    getAll().then(function(data) {
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var teamsHTML = "";
        data.forEach(function(team) {
            teamsHTML += `
                <div  class="col s12 m2">
                <div class="card team-card">
                    <div class="card-image">
                        <img class="responsive-img" src="${team.crestUrl}">
    
                    </div>
                    <div class="card-content">
                        <span class="card-title truncate">${team.shortName}</span>
                        <p class="flow-text truncate">${team.venue}</p>
                        <a href="./detailteam.html?id=${team.id}&saved=true">Club Profile <i class="material-icons" style="color: black; font-size: 12px;">arrow_forward</i></a>
                    </div>
                </div>
            </div>
        `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("teams").innerHTML = teamsHTML;

    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then(function(data) {
        let btnHTML = ``
        let tableHTML = ``
        let position = ''
        console.log(data)
        let squadFilter = data.squad.filter(function(elem) { return elem.role === "PLAYER"; })
        squadFilter.forEach(function(squad) {
            if (squad.position === "Goalkeeper") {
                position = "GK"
            } else if (squad.position === "Defender") {
                position = "DF"
            } else if (squad.position === "Midfielder") {
                position = "MF"
            } else {
                position = "FW"
            }
            tableHTML += `<tr>
            <td>${position}</td>
            <td>${squad.name}</td>
            <td>${squad.nationality}</td>
        </tr>`
        })
        data.activeCompetitions.forEach(function(compe) {
            btnHTML += `<a class="waves-effect waves-light btn-small ${getRandomColor()} darken-1">${compe.name}</a>`
        })

        let teamHTML = `
        <div class="row">
        <div class="col s12">
            <div class="detail-crest col s12 m3">
                <img class="responsive-img" src="${data.crestUrl}" />
            </div>
            <div class="detail-overview col s12 m8">
                <h2>${data.name}</h2>
                <h6> <i class="material-icons">map</i>${data.venue}</h6>
                <a href="${data.website}"> <i class="material-icons">language</i>${data.website}</a>
                <h6 id="detail-compe">Competitions: </h6>
                <div class="col s12 detail-btn-compe">
                    ${btnHTML}
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <div class="col s12 m3 ">
                <div class="card detail-profile ">
                    <div class="col s12 detail-card-header">
                        <h6>${data.shortName}</h6>
                    </div>
                    <div class="card-content detail-profile-content">

                        <p>Founded: ${data.founded}</p>
                        <p><i class="material-icons">location_on</i>${data.address}</p>
                        <p><i class="material-icons">email</i>${data.email}</p>
                        <p><i class="material-icons">call</i>${data.phone}</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m8 ">
                <ul id="tabs-swipe-demo" class="tabs ">
                    <li class="tab col s3"><a class="active" href="#swipe-1">Squad List</a></li>
                </ul>
                </div>
                <div class="col s12 m8">
                <div class="detail-tab-squad" id="swipe-1">
                    <div class="detail-card-squad">
                        <div class="card-content">
                            <table class="responsive-table highlight striped">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Name</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableHTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
      `;
        document.getElementById("body-detail").innerHTML = teamHTML;

    });

}