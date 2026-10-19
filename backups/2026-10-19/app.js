(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const subjects = $("#subjects");
  const errorBox = $("#form-error");
  const addButton = $("#add-subject");
  const targetInput = $("#target-percentage");
  const targetMessage = $("#target-message");
  const resultPanel = $("#results");
  let nextId = 4;
  let lastResult = null;
  const MAX_SUBJECTS = 20;
  const numberFrom = input => input.value.trim() === "" ? null : Number(input.value);
  function setError(message) { errorBox.textContent = message; }
  function clearResult() {
    lastResult = null;
    $("#percentage-result").textContent = "—";
    $("#total-result").textContent = "— / —";
    $("#count-result").textContent = "—";
    targetMessage.textContent = "Calculate your marks first to see your target status.";
    targetMessage.className = "target-message";
  }
  function updateRemoveButtons() {
    const rows = $$(".subject-row", subjects);
    rows.forEach((row, index) => {
      const button = $(".remove-row", row);
      button.disabled = rows.length === 1;
      button.setAttribute("aria-label", "Remove " + ($('[name="subject-name"]', row).value.trim() || "subject " + (index + 1)));
    });
    addButton.disabled = rows.length >= MAX_SUBJECTS;
    addButton.textContent = rows.length >= MAX_SUBJECTS ? "Maximum 20 subjects reached" : "＋ Add another subject";
  }
  function makeRow(id) {
    const row = document.createElement("div");
    row.className = "subject-row";
    const fields = [
      {id:"subject-" + id, name:"subject-name", type:"text", value:"Subject " + id, label:"Subject " + id + " name", placeholder:"Subject name", maxLength:"50"},
      {id:"scored-" + id, name:"marks-scored", type:"number", label:"Marks scored for subject " + id, placeholder:"e.g. 78", min:"0", step:"any", inputmode:"decimal"},
      {id:"possible-" + id, name:"marks-possible", type:"number", label:"Maximum marks for subject " + id, placeholder:"e.g. 100", min:"0.01", step:"any", inputmode:"decimal"}
    ];
    fields.forEach(field => {
      const label = document.createElement("label");
      label.className = "sr-only"; label.htmlFor = field.id; label.textContent = field.label;
      const input = document.createElement("input");
      Object.entries(field).forEach(([key, value]) => {
        if (key === "label") return;
        if (key === "inputmode") input.setAttribute("inputmode", value);
        else if (key === "maxLength") input.maxLength = Number(value);
        else input.setAttribute(key, value);
      });
      row.append(label, input);
    });
    const remove = document.createElement("button");
    remove.type = "button"; remove.className = "remove-row"; remove.textContent = "×";
    remove.setAttribute("aria-label", "Remove subject " + id);
    row.append(remove);
    return row;
  }
  function collectSubjects() {
    const rows = $$(".subject-row", subjects);
    if (!rows.length) { setError("Add at least one subject."); return null; }
    const entries = [];
    let firstInvalid = null;
    rows.forEach((row, index) => {
      const nameInput = $('[name="subject-name"]', row);
      const scoredInput = $('[name="marks-scored"]', row);
      const possibleInput = $('[name="marks-possible"]', row);
      [scoredInput, possibleInput].forEach(input => input.removeAttribute("aria-invalid"));
      const scored = numberFrom(scoredInput), possible = numberFrom(possibleInput);
      if (scored === null && possible === null) return;
      if (scored === null || possible === null) {
        firstInvalid ||= {input: scored === null ? scoredInput : possibleInput, message: "Enter both marks scored and maximum marks for subject " + (index + 1) + "."};
        return;
      }
      if (!Number.isFinite(scored) || !Number.isFinite(possible)) {
        firstInvalid ||= {input: scoredInput, message: "Use valid numbers for subject " + (index + 1) + "."}; return;
      }
      if (scored < 0) {
        firstInvalid ||= {input: scoredInput, message: "Marks scored cannot be negative (subject " + (index + 1) + ")."}; return;
      }
      if (possible <= 0) {
        firstInvalid ||= {input: possibleInput, message: "Maximum marks must be greater than zero (subject " + (index + 1) + ")."}; return;
      }
      if (scored > possible) {
        firstInvalid ||= {input: scoredInput, message: "Marks scored cannot exceed maximum marks (subject " + (index + 1) + ")."}; return;
      }
      entries.push({name: nameInput.value.trim() || "Subject " + (index + 1), scored, possible});
    });
    if (firstInvalid) {
      firstInvalid.input.setAttribute("aria-invalid", "true");
      setError(firstInvalid.message); firstInvalid.input.focus(); return null;
    }
    if (!entries.length) { setError("Enter marks for at least one subject."); return null; }
    return entries;
  }
  function updateTarget() {
    targetMessage.className = "target-message";
    if (!lastResult) {
      targetMessage.textContent = "Calculate your marks first to see your target status."; return;
    }
    if (targetInput.value.trim() === "") {
      targetMessage.textContent = "Add a target percentage to see your target status."; return;
    }
    const target = Number(targetInput.value);
    if (!Number.isFinite(target) || target < 0 || target > 100) {
      targetMessage.textContent = "Enter a target between 0 and 100."; targetMessage.classList.add("warning"); return;
    }
    if (lastResult.percentage + 1e-9 >= target) {
      targetMessage.textContent = "You've reached your target based on the marks entered.";
      targetMessage.classList.add("success");
    } else {
      const needed = Math.ceil((target / 100) * lastResult.possible - lastResult.scored);
      targetMessage.textContent = "You need at least " + Math.max(0, needed) + " more mark" + (Math.max(0, needed) === 1 ? "" : "s") + " across these subjects to reach " + target + "%, assuming the same total maximum.";
      targetMessage.classList.add("warning");
    }
  }
  function calculate() {
    setError("");
    const entries = collectSubjects();
    if (!entries) { clearResult(); return; }
    const scored = entries.reduce((sum, item) => sum + item.scored, 0);
    const possible = entries.reduce((sum, item) => sum + item.possible, 0);
    const percentage = possible > 0 ? scored / possible * 100 : 0;
    lastResult = {scored, possible, percentage, count: entries.length};
    $("#percentage-result").textContent = percentage.toFixed(2);
    $("#total-result").textContent = formatNumber(scored) + " / " + formatNumber(possible);
    $("#count-result").textContent = String(entries.length);
    updateTarget();
    resultPanel.classList.remove("result-flash");
    void resultPanel.offsetWidth;
    resultPanel.classList.add("result-flash");
  }
  function formatNumber(value) {
    return new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(value);
  }
  addButton.addEventListener("click", () => {
    if ($$(".subject-row", subjects).length >= MAX_SUBJECTS) { setError("You can add up to 20 subjects."); return; }
    subjects.append(makeRow(nextId++));
    setError(""); updateRemoveButtons(); clearResult();
    const rows = $$(".subject-row", subjects);
    $('[name="subject-name"]', rows[rows.length - 1]).focus();
  });
  subjects.addEventListener("click", event => {
    const button = event.target.closest(".remove-row");
    if (!button || button.disabled) return;
    button.closest(".subject-row").remove();
    setError(""); updateRemoveButtons(); clearResult();
  });
  subjects.addEventListener("input", () => { setError(""); clearResult(); updateRemoveButtons(); });
  $("#calculate").addEventListener("click", calculate);
  $("#reset").addEventListener("click", () => {
    subjects.innerHTML = "";
    nextId = 1;
    for (let i = 0; i < 3; i++) subjects.append(makeRow(nextId++));
    targetInput.value = "";
    setError(""); clearResult(); updateRemoveButtons();
  });
  targetInput.addEventListener("input", updateTarget);
  $("#print").addEventListener("click", () => window.print());
  updateRemoveButtons();
})();