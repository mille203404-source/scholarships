let map;
let markers = [];

// Initialize map on page load
function initMap() {
    map = L.map('map').setView([50.5, 4.5], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

function searchUniversity(){

    const search =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    const results =
    document
    .getElementById("results");

    results.innerHTML = "";

    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const matches =
    universities.filter(university =>
        university.name
        .toLowerCase()
        .includes(search)
    );

    if (matches.length === 0) {
        results.innerHTML = "<p>No universities found.</p>";
        return;
    }

    // Reset map view
    if (matches.length > 0) {
        const bounds = L.latLngBounds();
        matches.forEach(university => {
            bounds.extend([university.lat, university.lng]);
        });
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    matches.forEach(university => {

        // Add marker to map
        const marker = L.marker([university.lat, university.lng])
            .bindPopup(`
                <div class="marker-popup">
                    <h3>${university.name}</h3>
                    <p><strong>Country:</strong> ${university.country}</p>
                    <p><strong>City:</strong> ${university.city}</p>
                    <p><strong>Scholarship:</strong> ${university.scholarship}</p>
                    <p><strong>Requirements:</strong> ${university.requirements}</p>
                    <a href="${university.website}" target="_blank">Visit Website</a>
                </div>
            `)
            .addTo(map);
        markers.push(marker);

        // Add card to results
        results.innerHTML += `
            <div class="card">

                <h2>${university.name}</h2>

                <p>
                Country:
                ${university.country}
                </p>

                <p>
                City:
                ${university.city}
                </p>

                <p>
                Scholarship:
                ${university.scholarship}
                </p>

                <p>
                Requirements:
                ${university.requirements}
                </p>

                <a
                    href="${university.website}"
                    target="_blank"
                >
                    Website
                </a>

            </div>
        `;
    });

}