
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const form = $("tool-form");
  if (!form) return;
  const error = $("tool-error");
  const result = $("tool-result");
  const output = $("tool-output");
  const detail = $("tool-detail");
  const fmt = n => new Intl.NumberFormat(undefined,{maximumFractionDigits:4}).format(n);
  const fail = msg => { error.textContent=msg; result.hidden=true; };
  const success = (value, message) => { error.textContent=""; output.textContent=value; detail.textContent=message; result.hidden=false; };
  const num = id => { const el=$(id); if(!el || el.value.trim()==="") return null; const n=Number(el.value); return Number.isFinite(n)?n:null; };
  const nonnegative = (n) => n !== null && n >= 0;
  const positive = (n) => n !== null && n > 0;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const tool=form.dataset.tool;
    if(tool==="cgpa"){
      const cgpa=num("cgpa"), scale=$("scale").value;
      if(cgpa===null || !nonnegative(cgpa)){fail("Enter a valid CGPA of zero or higher.");return;}
      let pct, label;
      if(scale==="cbse95"){if(cgpa>10){fail("For the CBSE-style × 9.5 scale, CGPA must be 0–10.");return;}pct=cgpa*9.5;label="CGPA × 9.5 (a commonly used CBSE-style formula; verify your institution's rules).";}
      else if(scale==="linear10"){if(cgpa>10){fail("For the 10-point linear scale, CGPA must be 0–10.");return;}pct=cgpa/10*100;label="CGPA ÷ 10 × 100 (simple linear conversion, not an official universal rule).";}
      else if(scale==="linear4"){if(cgpa>4){fail("For the 4-point linear scale, CGPA must be 0–4.");return;}pct=cgpa/4*100;label="CGPA ÷ 4 × 100 (simple linear conversion; institutions may use a different method).";}
      else {const max=num("custom-max"), multiplier=num("custom-multiplier");if(!positive(max)||!positive(multiplier)||cgpa>max){fail("Enter a valid maximum CGPA and positive conversion multiplier; CGPA cannot exceed its maximum.");return;}pct=cgpa*multiplier;label="Custom multiplier: CGPA × "+fmt(multiplier)+". Check that this formula matches your institution's policy.";}
      if(!Number.isFinite(pct)){fail("Unable to calculate this value.");return;}
      success(fmt(pct)+"%",label+" This result is an estimate based on the selected formula.");
    } else if(tool==="required"){
      const scored=num("scored"), completed=num("completed"), remaining=num("remaining"), target=num("target");
      if(!nonnegative(scored)||!positive(completed)||!nonnegative(remaining)||target===null||target<0||target>100||scored>completed){fail("Enter valid marks: scored must be 0 or higher and no more than completed maximum; completed maximum must be positive; remaining marks cannot be negative; target must be 0–100%.");return;}
      const finalMax=completed+remaining, needed=target/100*finalMax-scored;
      if(needed<=0){success("Target already reached","Your current score already meets the target percentage.");}
      else if(needed>remaining){success("Target not reachable","You need "+fmt(needed)+" more marks, but only "+fmt(remaining)+" marks remain available.");}
      else {success(fmt(needed)+" marks needed","You need at least "+fmt(needed)+" out of "+fmt(remaining)+" remaining marks to finish with "+fmt(target)+"%.");}
    } else if(tool==="average"){
      const raw=$("marks").value.trim();
      if(!raw){fail("Enter at least one mark, separated by commas or new lines.");return;}
      const vals=raw.split(/[\s,;]+/).filter(Boolean).map(Number);
      if(!vals.length||vals.some(n=>!Number.isFinite(n)||n<0)){fail("Use non-negative numbers separated by commas or new lines.");return;}
      const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
      success(fmt(avg),"Average of "+vals.length+" value"+(vals.length===1?"":"s")+". Total: "+fmt(vals.reduce((a,b)=>a+b,0))+".");
    } else if(tool==="grade"){
      const score=num("score"), max=num("maximum"), scale=$("grade-scale").value;
      if(!nonnegative(score)||!positive(max)||score>max){fail("Enter a score from 0 up to a positive maximum score.");return;}
      const pct=score/max*100;
      let grade;
      if(scale==="us"){grade=pct>=90?"A":pct>=80?"B":pct>=70?"C":pct>=60?"D":"F";}
      else {grade=pct>=90?"A":pct>=80?"B":pct>=70?"C":pct>=60?"D":pct>=50?"E":"F";}
      success(grade+" ("+fmt(pct)+"%)",scale==="us"?"Using the selected example scale: A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60.":"Using the selected example scale: A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, E ≥ 50, F < 50. Change this to match your school or course rules.");
    }
  });
  const scale=$("scale");
  if(scale){const custom=$("custom-fields");const sync=()=>{custom.hidden=scale.value!=="custom";};scale.addEventListener("change",sync);sync();}
})();