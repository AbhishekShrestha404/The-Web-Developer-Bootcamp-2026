maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS.DARK,
    center: campgroundCoordinates,
    zoom: 9
});

new maptilersdk.Marker()
    .setLngLat(campgroundCoordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(`<h3>${campgroundTitle}</h3>`)
    )
    .addTo(map);