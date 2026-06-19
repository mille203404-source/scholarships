"use client";

import { useState } from "react";
import { universities, type University } from "@/data/universities";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const matches = universities.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(matches);
    setSearched(true);
  }

  return (
    <main>
      <h1>Benelux University</h1>

      <input
        type="text"
        placeholder="Search university..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button onClick={handleSearch}>Search</button>

      <div id="results">
        {searched && results.length === 0 && <p>No universities found.</p>}
        {results.map((u) => (
          <div key={u.name} className="card">
            <h2>{u.name}</h2>
            <p>Country: {u.country}</p>
            <p>City: {u.city}</p>
            <p>Scholarship: {u.scholarship}</p>
            <p>Requirements: {u.requirements}</p>
            <a href={u.website} target="_blank" rel="noreferrer">
              Website
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
