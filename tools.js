
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
    } else if(tool==="discount"){
      const price=num("price"), discount=num("discount");
      if(!positive(price)||discount===null||discount<0||discount>100){fail("Enter a price greater than zero and a discount between 0% and 100%.");return;}
      const saved=price*discount/100, finalPrice=price-saved;
      success(fmt(finalPrice),"You save "+fmt(saved)+" ("+fmt(discount)+"%). Final price is before any taxes or extra fees.");
    } else if(tool==="interest"){
      const principal=num("principal"), rate=num("rate"), years=num("years");
      if(!positive(principal)||rate===null||rate<0||!positive(years)){fail("Enter a principal greater than zero, a non-negative annual rate, and a time period greater than zero.");return;}
      const interest=principal*rate*years/100;
      success(fmt(principal+interest),"Simple interest: "+fmt(interest)+". Formula: principal × annual rate × time ÷ 100. Assumes the rate stays constant and time is in years.");
    } else if(tool==="bmi"){
      const weight=num("weight"), height=num("height"), age=num("age");
      if(!positive(weight)||!positive(height)||!Number.isInteger(age)||age<1||age>120||weight>500||height<50||height>250){fail("Enter a valid age (1–120 years), weight (1–500 kg), and height (50–250 cm).");return;}
      const metres=height/100, bmi=weight/(metres*metres);
      if(age<18){
        success(fmt(bmi)+" kg/m²","Teen BMI needs age- and sex-specific growth charts, so this calculator cannot reliably label it as overweight or okay.");
      } else {
        let category;
        if(bmi<18.5) category="Below the usual adult BMI range";
        else if(bmi<25) category="Weight is in the usual adult BMI range";
        else if(bmi<30) category="Overweight range";
        else category="Obesity range";
        success(fmt(bmi)+" kg/m²",category);
      }
    } else if(tool==="date"){
      const start=$("start-date").value, end=$("end-date").value;
      if(!start||!end){fail("Choose both a start date and an end date.");return;}
      const s=Date.parse(start+"T00:00:00Z"), e=Date.parse(end+"T00:00:00Z");
      if(!Number.isFinite(s)||!Number.isFinite(e)){fail("Enter valid dates.");return;}
      const days=Math.round((e-s)/86400000), abs=Math.abs(days);
      success(fmt(abs)+" days",days===0?"Both dates are the same.":days>0?"The end date is "+fmt(abs)+" days after the start date.":"The end date is "+fmt(abs)+" days before the start date.");
    } else if(tool==="age"){
      const raw=$("birth-date").value;
      if(!raw){fail("Enter your date of birth.");return;}
      const birth=new Date(raw+"T00:00:00"), today=new Date();
      const b=new Date(birth.getFullYear(),birth.getMonth(),birth.getDate());
      const t=new Date(today.getFullYear(),today.getMonth(),today.getDate());
      if(!Number.isFinite(b.getTime())||b>t){fail("Enter a valid date of birth that is not in the future.");return;}
      let years=t.getFullYear()-b.getFullYear(), months=t.getMonth()-b.getMonth(), days=t.getDate()-b.getDate();
      if(days<0){months--;days+=new Date(t.getFullYear(),t.getMonth(),0).getDate();}
      if(months<0){years--;months+=12;}
      success(years+" years, "+months+" months, "+days+" days","Age calculated using today's local date. Your age may differ by timezone near midnight.");
    } else if(tool==="countdown"){
      const raw=$("exam-date").value;
      if(!raw){fail("Choose your exam date.");return;}
      const exam=Date.parse(raw+"T00:00:00Z"), now=new Date(), today=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());
      if(!Number.isFinite(exam)){fail("Choose a valid exam date.");return;}
      const diff=Math.round((exam-today)/86400000);
      success(diff>0?fmt(diff)+" days to go":diff===0?"Your exam is today":fmt(Math.abs(diff))+" days ago",diff>0?"Use this countdown to plan your revision schedule.":diff===0?"Good luck with your exam.":"This date is in the past; choose a future date for a countdown.");
    }
  });
  const scale=$("scale");
  if(scale){const custom=$("custom-fields");const sync=()=>{custom.hidden=scale.value!=="custom";};scale.addEventListener("change",sync);sync();}
  const mealForm=$("meal-form");
  if(mealForm){
    mealForm.addEventListener("submit",event=>{
      event.preventDefault();
      const preference=$("meal-preference").value;
      const mealResult=$("meal-result"), mealOutput=$("meal-output");
      const options={
        vegetarian:[
          ["Breakfast","Oats or porridge with milk/fortified soy milk, fruit, and nuts or seeds if safe."],
          ["Lunch","Dal or beans, rice or roti, and a variety of vegetables."],
          ["Snack","Yogurt/curd or a fortified alternative with fruit."],
          ["Dinner","Chickpeas, tofu, paneer, or lentils with whole grains and vegetables."]
        ],
        eggs:[
          ["Breakfast","Eggs with whole-grain toast and fruit, or oats with milk and nuts/seeds if safe."],
          ["Lunch","Dal or beans, rice or roti, vegetables, and curd/yogurt."],
          ["Snack","Fruit with yogurt/curd or a handful of nuts if safe."],
          ["Dinner","Vegetable omelette or tofu/paneer with roti and vegetables."]
        ],
        mixed:[
          ["Breakfast","Oats with milk/yogurt and fruit, or eggs with whole-grain toast."],
          ["Lunch","Chicken, fish, beans, or dal with rice/roti and vegetables."],
          ["Snack","Fruit with yogurt/curd or nuts/seeds if safe."],
          ["Dinner","Fish, chicken, tofu, or lentils with whole grains and vegetables."]
        ]
      };
      mealOutput.replaceChildren();
      const list=document.createElement("ul");
      options[preference].forEach(([label,description])=>{
        const item=document.createElement("li");
        const strong=document.createElement("strong"); strong.textContent=label+": ";
        item.append(strong,document.createTextNode(description)); list.appendChild(item);
      });
      mealOutput.appendChild(list); mealResult.hidden=false;
    });
  }
})();
