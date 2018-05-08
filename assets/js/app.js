var locationHistory = []

function getLocation() {
    var dropLocation = document.getElementById("location");
    var historyLocation = document.getElementById("history");

    m.request({
        method: "GET",
        url: "/location",
        extract: function(xhr) { return xhr.responseText }
    }).then(function(newLocation) {
        m.render(dropLocation, m("p", ""))
        m.render(dropLocation, [
            m("p", "Head to"),
            m("h3", {class: "is-size-2 animated bounceInDown", id:"locationSquare"}, newLocation),
            m("p", "and good luck!"),
            m("br")
        ]);
        m.render(historyLocation, m("p", ""))

        locationHistory.unshift(newLocation)
        m.render(historyLocation, [
            m("h3", {class: "is-size-3 animated fadeIn"}, locationHistory[0]),
            m("h3", {class: "is-size-3"}, locationHistory[1]),
            m("h3", {class: "is-size-3", style: "opacity: .6"}, locationHistory[2]),
            m("h3", {class: "is-size-3", style: "opacity: .3"}, locationHistory[3]),
            m("h3", {class: "is-size-3", style: "opacity: .1"}, locationHistory[4]),
        ])
    })
}
