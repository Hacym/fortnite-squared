function getLocation() {
    var dropLocation = document.getElementById("location");

    m.request({
        method: "GET",
        url: "/location",
        extract: function(xhr) { return xhr.responseText }
    }).then(function(newLocation) {
        m.render(dropLocation, m("p", ""));
        m.render(dropLocation, m("h3", {class: "is-size-2 animated bounce", id:"locationSquare"}, newLocation));
    })
}
