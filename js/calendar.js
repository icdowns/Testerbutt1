(function () {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  let currentYear = today.getFullYear();

  const calendarEl = document.getElementById("calendar");
  const yearLabel = document.getElementById("yearLabel");
  const yearSelect = document.getElementById("yearSelect");
  const expandAllBtn = document.getElementById("expandAll");
  const collapseAllBtn = document.getElementById("collapseAll");

  function initYearSelect(centerYear) {
    yearSelect.innerHTML = "";
    for (let y = centerYear - 5; y <= centerYear + 5; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      if (y === centerYear) opt.selected = true;
      yearSelect.appendChild(opt);
    }
  }

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function makeId(prefix, i) {
    return `${prefix}-${i}`;
  }

  function buildMonthSection(year, monthIndex) {
    const section = document.createElement("section");
    section.className = "month";

    const header = document.createElement("h2");
    header.className = "month-header";

    const btn = document.createElement("button");
    const btnId = makeId("month-btn", monthIndex);
    const panelId = makeId("month-panel", monthIndex);
    btn.id = btnId;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", panelId);

    const title = document.createElement("span");
    title.className = "month-title";
    title.textContent = `${monthNames[monthIndex]} ${year}`;

    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▾";

    btn.appendChild(title);
    btn.appendChild(chevron);
    header.appendChild(btn);

    const panel = document.createElement("div");
    panel.className = "month-panel";
    panel.id = panelId;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", btnId);
    panel.hidden = true;

    const ul = document.createElement("ul");
    ul.className = "days-list";

    const totalDays = daysInMonth(year, monthIndex);

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, monthIndex, d);
      const li = document.createElement("li");
      li.className = "day";

      if (
        year === today.getFullYear() &&
        monthIndex === today.getMonth() &&
        d === today.getDate()
      ) {
        li.classList.add("today");
      }

      const num = document.createElement("span");
      num.className = "date";
      num.textContent = d;

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = `${weekdayNames[date.getDay()]}, ${monthNames[monthIndex]} ${d}`;

      li.appendChild(num);
      li.appendChild(label);
      ul.appendChild(li);
    }

    panel.appendChild(ul);

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  }
});