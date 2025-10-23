import React, { useEffect, useState } from "react";

export default function JournalList() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const token = localStorage.getItem("mh_token");
      const res = await fetch("http://localhost:4000/api/journal", {
        headers: { "Authorization": token },
      });
      const data = await res.json();
      if (res.ok) setJournals(data);
    };
    fetchJournals();
  }, []);

  const deleteJournal = async (id) => {
    const token = localStorage.getItem("mh_token");
    await fetch(`http://localhost:4000/api/journal/${id}`, {
      method: "DELETE",
      headers: { "Authorization": token },
    });
    setJournals(journals.filter((j) => j._id !== id));
  };

  return (
    <div>
      <h3>Your Journal Entries</h3>
      {journals.map((j) => (
        <div key={j._id} className="card mb-2">
          <div className="card-body">
            <h5>{j.title}</h5>
            <p>{j.content}</p>
            <small>{new Date(j.date).toLocaleString()}</small>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => deleteJournal(j._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}