package main

import (
    "net/http"
    "math/rand"
    "time"
    "strconv"

    "github.com/labstack/echo"
    "github.com/labstack/echo/middleware"
)

func main() {
    e := echo.New()

    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.File("/", "public/index.html")
    e.Static("/static", "assets")

    e.GET("/location", get_location)

    e.Logger.Fatal(e.Start(":1323"))
}

func is_excluded(location string) bool {
    exclude := [...]string{
        "A1", "A2", "A3", "A7", "A8", "A9", "A10", "B8",
        "B9", "B10", "C9", "C10", "E1", "F1", "G1", "H1",
        "I1", "I10", "J1", "J2", "J9", "J10",
    }

    for _, x := range exclude {
        if x == location {
            return true
        }
    }

    return false
}

func generate_location() string {
    vert := [...]string{"A", "B", "C", "D", "E", "F", "J", "H", "I", "J"}

    rand.Seed(time.Now().Unix())

    excluded := true
    var location string

    for excluded {
        location = vert[rand.Intn(len(vert))] + strconv.Itoa(rand.Intn(11))

        excluded = is_excluded(location)
    }

    return location
}

func get_location(c echo.Context) error {
    location := generate_location()

    return c.String(http.StatusOK, location)
}
