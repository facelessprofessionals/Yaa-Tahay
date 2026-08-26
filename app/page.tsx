"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  GitBranch,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Person = {
  id: string;
  name: string;
  shortName: string;
  relation: string;
  years: string;
  clan: string;
  branch: string;
  location: string;
  status: "Verified" | "Family-confirmed" | "Unverified";
  initials: string;
  tone: "blue" | "gold" | "sage";
  namePath: string[];
};

const people: Person[] = [
  {
    id: "sahra",
    name: "Sahra Maxamed Nuur",
    shortName: "Sahra Maxamed",
    relation: "Center person",
    years: "1989–present",
    clan: "Majeerteen",
    branch: "Family-confirmed branch",
    location: "Minneapolis, Minnesota",
    status: "Verified",
    initials: "SM",
    tone: "blue",
    namePath: ["Sahra", "Maxamed", "Nuur"],
  },
  {
    id: "maxamed",
    name: "Maxamed Nuur Cabdi",
    shortName: "Maxamed Nuur",
    relation: "Father",
    years: "1962–present",
    clan: "Majeerteen",
    branch: "Paternal line",
    location: "Garowe, Puntland",
    status: "Family-confirmed",
    initials: "MN",
    tone: "sage",
    namePath: ["Maxamed", "Nuur", "Cabdi"],
  },
  {
    id: "maryan",
    name: "Maryan Xasan Warsame",
    shortName: "Maryan Xasan",
    relation: "Mother",
    years: "1967–present",
    clan: "Private",
    branch: "Maternal line",
    location: "Minneapolis, Minnesota",
    status: "Family-confirmed",
    initials: "MX",
    tone: "gold",
    namePath: ["Maryan", "Xasan", "Warsame"],
  },
  {
    id: "nuur",
    name: "Nuur Cabdi Faarax",
    shortName: "Nuur Cabdi",
    relation: "Paternal grandfather",
    years: "1932–2008",
    clan: "Majeerteen",
    branch: "Paternal line",
    location: "Qardho, Puntland",
    status: "Family-confirmed",
    initials: "NC",
    tone: "sage",
    namePath: ["Nuur", "Cabdi", "Faarax"],
  },
  {
    id: "hodan",
    name: "Hodan Aadan Yuusuf",
    shortName: "Hodan Aadan",
    relation: "Paternal grandmother",
    years: "1938–2019",
    clan: "Private",
    branch: "Paternal line",
    location: "Bosaso, Puntland",
    status: "Unverified",
    initials: "HA",
    tone: "gold",
    namePath: ["Hodan", "Aadan", "Yuusuf"],
  },
  {
    id: "xasan",
    name: "Xasan Warsame Cali",
    shortName: "Xasan Warsame",
    relation: "Maternal grandfather",
    years: "1935–2012",
    clan: "Private",
    branch: "Maternal line",
    location: "Mogadishu, Somalia",
    status: "Family-confirmed",
    initials: "XW",
    tone: "blue",
    namePath: ["Xasan", "Warsame", "Cali"],
  },
  {
    id: "asha",
    name: "Asha Cumar Samatar",
    shortName: "Asha Cumar",
    relation: "Maternal grandmother",
    years: "1940–present",
    clan: "Private",
    branch: "Maternal line",
    location: "Nairobi, Kenya",
    status: "Unverified",
    initials: "AC",
    tone: "gold",
    namePath: ["Asha", "Cumar", "Samatar"],
  },
];

const positions: Record<string, { left: string; top: string }> = {
  nuur: { left: "2%", top: "5%" },
  hodan: { left: "27%", top: "5%" },
  xasan: { left: "52%", top: "5%" },
  asha: { left: "77%", top: "5%" },
  maxamed: { left: "16%", top: "39%" },
  maryan: { left: "65%", top: "39%" },
  sahra: { left: "40.5%", top: "73%" },
};

function PersonNode({
  person,
  selected,
  onSelect,
}: {
  person: Person;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`person-node ${selected ? "is-selected" : ""}`}
      style={positions[person.id]}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`View ${person.name}, ${person.relation}`}
    >
      <span className={`node-avatar avatar-${person.tone}`}>{person.initials}</span>
      <span className="node-copy">
        <strong>{person.shortName}</strong>
        <small>{person.relation}</small>
      </span>
      {person.status !== "Unverified" && (
        <CheckCircle2 className="node-check" aria-label={person.status} />
      )}
    </button>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("sahra");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);

  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  const results = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    if (!search) return [];
    return people.filter((person) =>
      [person.name, person.relation, person.clan, person.location]
        .join(" ")
        .toLocaleLowerCase()
        .includes(search),
    );
  }, [query]);

  const choosePerson = (id: string) => {
    setSelectedId(id);
    setQuery("");
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand-block" aria-label="Yaa Tahay home">
          <span className="brand-mark"><GitBranch /></span>
          <span>
            <strong>Yaa Tahay</strong>
            <small>Somali lineage</small>
          </span>
        </div>
        <div className="topbar-note">
          <LockKeyhole />
          <span>Private family workspace</span>
        </div>
        <Badge className="demo-badge">Example family</Badge>
      </header>

      <section className="intro-strip">
        <div>
          <p className="eyebrow">Abtirsiin, made visible</p>
          <h1>Every name carries a path.</h1>
        </div>
        <p>
          Explore a family across generations through Somali names, relationships,
          and family-confirmed clan history.
        </p>
      </section>

      <section className="workspace" aria-label="Somali lineage explorer">
        <aside className="search-panel">
          <div className="panel-heading">
            <span className="heading-icon"><Search /></span>
            <div>
              <h2>Find a connection</h2>
              <p>Search this family record</p>
            </div>
          </div>

          <div className="search-wrap">
            <Search className="search-icon" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, clan, or place"
              aria-label="Search by name, clan, or place"
              autoComplete="off"
            />
          </div>

          {query ? (
            <div className="search-results" aria-live="polite">
              <p className="result-count">
                {results.length} {results.length === 1 ? "match" : "matches"}
              </p>
              {results.length ? (
                results.map((person) => (
                  <button key={person.id} onClick={() => choosePerson(person.id)}>
                    <span className={`mini-avatar avatar-${person.tone}`}>
                      {person.initials}
                    </span>
                    <span>
                      <strong>{person.shortName}</strong>
                      <small>{person.relation}</small>
                    </span>
                    <ChevronRight />
                  </button>
                ))
              ) : (
                <div className="empty-search">
                  <UserRound />
                  <span>No family member found</span>
                </div>
              )}
            </div>
          ) : (
            <div className="family-summary">
              <div className="summary-ring"><UsersRound /></div>
              <strong>7 people</strong>
              <span>3 generations connected</span>
            </div>
          )}

          <div className="legend" aria-label="Family tree legend">
            <p>Lineage key</p>
            <span><i className="line paternal" />Paternal line</span>
            <span><i className="line maternal" />Maternal line</span>
            <span><CheckCircle2 />Family-confirmed</span>
          </div>

          <div className="principle-note">
            <ShieldCheck />
            <p>
              <strong>Clan is never guessed.</strong>
              It appears only when a person or family has chosen to share it.
            </p>
          </div>
        </aside>

        <section className="tree-panel" aria-label="Interactive family tree">
          <div className="tree-toolbar">
            <div>
              <p className="eyebrow">Family view</p>
              <h2>Sahra’s ancestors</h2>
            </div>
            <div className="tree-actions" aria-label="Tree zoom controls">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom((value) => Math.max(0.82, value - 0.08))}
                aria-label="Zoom out"
              >
                <Minus />
              </Button>
              <span>{Math.round(zoom * 100)}%</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom((value) => Math.min(1.16, value + 0.08))}
                aria-label="Zoom in"
              >
                <Plus />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoom(1)}
                aria-label="Reset zoom"
              >
                <RotateCcw />
              </Button>
            </div>
          </div>

          <div className="tree-scroll">
            <div className="tree-canvas" style={{ transform: `scale(${zoom})` }}>
              <svg className="tree-lines" viewBox="0 0 1000 600" aria-hidden="true">
                <path className="paternal-path" d="M264 408 V344 H135 V162" />
                <path className="paternal-path" d="M264 344 H385 V162" />
                <path className="maternal-path" d="M755 408 V344 H635 V162" />
                <path className="maternal-path" d="M755 344 H885 V162" />
                <path className="paternal-path" d="M264 490 V520 H500 V528" />
                <path className="maternal-path" d="M755 490 V520 H500 V528" />
                <circle cx="264" cy="344" r="5" className="paternal-dot" />
                <circle cx="755" cy="344" r="5" className="maternal-dot" />
                <circle cx="500" cy="520" r="6" className="center-dot" />
              </svg>

              <div className="generation-label generation-grandparents">
                <span>03</span> Grandparents
              </div>
              <div className="generation-label generation-parents">
                <span>02</span> Parents
              </div>
              <div className="generation-label generation-center">
                <span>01</span> Center
              </div>

              {people.map((person) => (
                <PersonNode
                  key={person.id}
                  person={person}
                  selected={selectedId === person.id}
                  onSelect={() => setSelectedId(person.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className="profile-panel" aria-live="polite">
          <div className="profile-topline">
            <span>Person record</span>
            <Badge className={`status-badge status-${selected.status.toLowerCase()}`}>
              {selected.status === "Verified" && <CheckCircle2 />}
              {selected.status}
            </Badge>
          </div>

          <div className="profile-identity">
            <span className={`profile-avatar avatar-${selected.tone}`}>
              {selected.initials}
            </span>
            <p>{selected.relation}</p>
            <h2>{selected.name}</h2>
            <span>{selected.years}</span>
          </div>

          <div className="record-section">
            <p className="record-label">Name path</p>
            <div className="name-path" aria-label={`Name path: ${selected.namePath.join(", ")}`}>
              {selected.namePath.map((name, index) => (
                <div key={name}>
                  <span>{index === 0 ? "Given" : index === 1 ? "Father" : "Grandfather"}</span>
                  <strong>{name}</strong>
                  {index < selected.namePath.length - 1 && <ChevronRight />}
                </div>
              ))}
            </div>
            <p className="path-note">Somali names trace ancestry rather than a fixed family surname.</p>
          </div>

          <div className="record-section detail-list">
            <div>
              <span className="detail-icon"><GitBranch /></span>
              <p><small>Clan / family line</small><strong>{selected.clan}</strong></p>
            </div>
            <div>
              <span className="detail-icon"><UsersRound /></span>
              <p><small>Branch</small><strong>{selected.branch}</strong></p>
            </div>
            <div>
              <span className="detail-icon"><MapPin /></span>
              <p><small>Known location</small><strong>{selected.location}</strong></p>
            </div>
          </div>

          <div className="source-note">
            <ShieldCheck />
            <p><strong>Source protected</strong><span>Only family-approved details are visible.</span></p>
          </div>
        </aside>
      </section>

      <footer>
        <span><GitBranch /> Yaa Tahay</span>
        <p>Names connect us. Families confirm the story.</p>
        <span>Private prototype · Example records</span>
      </footer>
    </main>
  );
}
