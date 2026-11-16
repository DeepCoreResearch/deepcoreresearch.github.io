
/*
    DCR CONTENT DATABASE
    Edit this file to update the website.
*/

// ==========================================
// DEPARTMENTS
// ==========================================

const departments = [
    {
        code: "AI",
        number: "01",
        name: "Artificial Intelligence",
        description: "Research into neural architectures, learning systems and experimental AI models.",
        focus: ["Neural architectures", "Machine learning", "Model research"]
    },
    {
        code: "COMP",
        number: "02",
        name: "Computational Research",
        description: "Research into computational models, processing systems and optimization.",
        focus: ["Computational models", "Processing systems", "Optimization"]
    },
    {
        code: "MATH",
        number: "03",
        name: "Mathematical Research",
        description: "Mathematical foundations of algorithms, numerical methods and theoretical systems.",
        focus: ["Mathematical models", "Algorithms", "Numerical methods"]
    },
    {
        code: "EXP",
        number: "04",
        name: "Experimental Systems",
        description: "Development and testing of experimental technologies and prototypes.",
        focus: ["Prototypes", "System testing", "Experimental technology"]
    }
];


// ==========================================
// PROJECTS
// Add a new project by copying one object.
// ==========================================

const projects = [
    {
        id: "DCR-001",
        title: "Neural Architecture Research",
        department: "AI",
        status: "Research",
        description: "Investigation of alternative neural network architectures and computational approaches.",
        updated: "2026-11-16",
        link: ""
    }
];


// ==========================================
// RESEARCH LOG
// Newest entries should be placed first.
// ==========================================

const researchLog = [
    {
        date: "2026-11-16",
        department: "DCR",
        title: "Research portal established",
        description: "The DeepCoreResearch research portal was created.",
        type: "Administrative"
    }
];


// ==========================================
// PUBLICATIONS
// link can be a URL or a relative file path.
// ==========================================

const publications = [
    // Example:
    // {
    //     title: "Research Report 001",
    //     type: "Technical Report",
    //     date: "2026-11-16",
    //     link: "documents/report-001.pdf"
    // }
];


// ==========================================
// ARCHIVE
// ==========================================

const archive = [
    // Example:
    // {
    //     title: "Experiment 001",
    //     category: "Experimental Record",
    //     date: "2026-10-20",
    //     link: "archive/experiment-001.html"
    // }
];


// ==========================================
// PAGE RENDERING
// You normally do not need to edit below.
// ==========================================

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
})[char]);

const formatDate = (date) => {
    if (!date) return "Undated";

    const parsed = new Date(date + "T00:00:00");

    if (Number.isNaN(parsed.getTime())) return escapeHTML(date);

    return parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

const emptyState = (message) => `
    <div class="empty-state">
        <span class="empty-symbol">—</span>
        <p>${escapeHTML(message)}</p>
    </div>
`;


// STATISTICS

document.getElementById("stats").innerHTML = `
    <div class="stat-card">
        <span>DEPARTMENTS</span>
        <strong>${departments.length.toString().padStart(2, "0")}</strong>
        <small>Research units</small>
    </div>

    <div class="stat-card">
        <span>PROJECTS</span>
        <strong>${projects.length.toString().padStart(2, "0")}</strong>
        <small>Registered projects</small>
    </div>

    <div class="stat-card">
        <span>RESEARCH LOGS</span>
        <strong>${researchLog.length.toString().padStart(2, "0")}</strong>
        <small>Recorded entries</small>
    </div>

    <div class="stat-card">
        <span>DOCUMENTS</span>
        <strong>${(publications.length + archive.length).toString().padStart(2, "0")}</strong>
        <small>Published and archived</small>
    </div>
`;


// DEPARTMENTS

document.getElementById("department-list").innerHTML =
    departments.map(dep => `
        <article class="department-card">
            <div class="card-top">
                <span>${escapeHTML(dep.code)}</span>
                <span>${escapeHTML(dep.number)}</span>
            </div>

            <h3>${escapeHTML(dep.name)}</h3>
            <p>${escapeHTML(dep.description)}</p>

            <div class="focus-list">
                ${dep.focus.map(item =>
                    `<span>${escapeHTML(item)}</span>`
                ).join("")}
            </div>
        </article>
    `).join("");


// PROJECTS

document.getElementById("project-count").textContent =
    `${projects.length} registered`;

document.getElementById("project-list").innerHTML =
    projects.length
        ? projects.map(project => `
            <article class="project-card">
                <div class="card-top">
                    <span>${escapeHTML(project.id)}</span>
                    <span class="project-status">${escapeHTML(project.status)}</span>
                </div>

                <h3>${escapeHTML(project.title)}</h3>
                <p>${escapeHTML(project.description)}</p>

                <div class="project-meta">
                    <span>DEPARTMENT: ${escapeHTML(project.department)}</span>
                    <span>UPDATED: ${formatDate(project.updated)}</span>
                </div>

                ${project.link
                    ? `<a class="text-link" href="${escapeHTML(project.link)}">Open project →</a>`
                    : ""}
            </article>
        `).join("")
        : emptyState("No projects have been registered yet.");


// RESEARCH LOG

const renderLog = (entries) => entries.length
    ? entries.map(entry => `
        <article class="log-entry">
            <div class="log-date">${formatDate(entry.date)}</div>

            <div class="log-marker"></div>

            <div class="log-content">
                <div class="log-meta">
                    <span>${escapeHTML(entry.department)}</span>
                    <span>${escapeHTML(entry.type)}</span>
                </div>

                <h3>${escapeHTML(entry.title)}</h3>
                <p>${escapeHTML(entry.description)}</p>
            </div>
        </article>
    `).join("")
    : emptyState("No research entries available.");

document.getElementById("latest-activity").innerHTML =
    renderLog(researchLog.slice(0, 3));

document.getElementById("full-log").innerHTML =
    renderLog(researchLog);


// PUBLICATIONS

document.getElementById("publication-list").innerHTML =
    publications.length
        ? publications.map(doc => `
            <a class="document-entry"
               href="${escapeHTML(doc.link || "#")}"
               ${doc.link ? "" : 'aria-disabled="true"'}>
                <div>
                    <strong>${escapeHTML(doc.title)}</strong>
                    <span>${escapeHTML(doc.type)} · ${formatDate(doc.date)}</span>
                </div>
                <span>↗</span>
            </a>
        `).join("")
        : emptyState("No publications have been added.");


// ARCHIVE

document.getElementById("archive-list").innerHTML =
    archive.length
        ? archive.map(item => `
            <a class="document-entry"
               href="${escapeHTML(item.link || "#")}"
               ${item.link ? "" : 'aria-disabled="true"'}>
                <div>
                    <strong>${escapeHTML(item.title)}</strong>
                    <span>${escapeHTML(item.category)} · ${formatDate(item.date)}</span>
                </div>
                <span>↗</span>
            </a>
        `).join("")
        : emptyState("The research archive is currently empty.");
