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

    const matches =
    universities.filter(university =>
        university.name
        .toLowerCase()
        .includes(search)
    );

    matches.forEach(university => {

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