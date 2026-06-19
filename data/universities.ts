export interface University {
  name: string;
  country: string;
  city: string;
  website: string;
  scholarship: string;
  apply: string;
  requirements: string;
}

export const universities: University[] = [
  {
    name: "KU Leuven",
    country: "Belgium",
    city: "Leuven",
    website: "https://www.kuleuven.be",
    scholarship: "KU Leuven Scholarships",
    apply: "https://www.kuleuven.be/english/admissions",
    requirements: "Secondary school diploma",
  },
  {
    name: "Ghent University",
    country: "Belgium",
    city: "Ghent",
    website: "https://www.ugent.be",
    scholarship: "UGent Top-up Grants",
    apply: "https://www.ugent.be/en",
    requirements: "Secondary school diploma",
  },
];
