/* =====================================================
   BASIC HELPERS
===================================================== */
function getValue(id){
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function setText(id,value){
    const element = document.getElementById(id);
    if(element) element.textContent = value || "";
}

function hideIfEmpty(sectionId,value){
    const section = document.getElementById(sectionId);
    if(!section) return;
    if(!value || !value.trim()){
        section.classList.add("is-empty");
    }else{
        section.classList.remove("is-empty");
    }
}

/* =====================================================
   PERSONAL & PROFILE
===================================================== */
function updatePersonal(){
    setText("cvName", getValue("fullName") || "YOUR NAME");
    setText("cvJobTitle", getValue("jobTitle") || "PROFESSIONAL");
    setText("cvPhone", getValue("phone"));
    setText("cvEmail", getValue("email"));
    setText("cvAddress", getValue("address"));
    setText("cvDob", getValue("dob"));
    
    hideIfEmpty("contactSection", getValue("phone") + getValue("email") + getValue("address"));
    hideIfEmpty("dobSection", getValue("dob"));
}

function updateProfile(){
    const value = getValue("profile");
    setText("cvProfile", value);
    hideIfEmpty("profileCvSection", value);
}

/* =====================================================
   A/L - Updated for Grid
===================================================== */
function updateAL(){
    const school = getValue("alSchool");
    const year = getValue("alYear");
    const stream = getValue("alStream");

    setText("cvAlSchool", school);
    setText("cvAlYear", year);
    setText("cvAlStream", stream);

    const grid = document.getElementById("alGrid");
    if(!grid) return;
    grid.innerHTML = "";

    let hasResult = false;
    for(let i = 1; i <= 4; i++){
        const subject = getValue("al" + i);
        const result = getValue("alr" + i);

        if(subject || result){
            hasResult = true;
            const item = document.createElement("div");
            item.className = "result-table-item";
            
            const subSpan = document.createElement("span");
            subSpan.textContent = subject;
            
            const resSpan = document.createElement("span");
            resSpan.textContent = result;

            item.appendChild(subSpan);
            item.appendChild(resSpan);
            grid.appendChild(item);
        }
    }
    hideIfEmpty("alCvSection", school + year + stream + (hasResult ? "yes" : ""));
}

/* =====================================================
   O/L - Updated for Grid
===================================================== */
function updateOL(){
    const school = getValue("olSchool");
    const year = getValue("olYear");

    setText("cvOlSchool", school);
    setText("cvOlYear", year);

    const grid = document.getElementById("olGrid");
    if(!grid) return;
    grid.innerHTML = "";

    let hasResult = false;
    for(let i = 1; i <= 10; i++){
        const subject = getValue("ol" + i);
        const result = getValue("olr" + i);

        if(subject || result){
            hasResult = true;
            const item = document.createElement("div");
            item.className = "result-table-item";
            
            const subSpan = document.createElement("span");
            subSpan.textContent = subject;
            
            const resSpan = document.createElement("span");
            resSpan.textContent = result;

            item.appendChild(subSpan);
            item.appendChild(resSpan);
            grid.appendChild(item);
        }
    }
    hideIfEmpty("olCvSection", school + year + (hasResult ? "yes" : ""));
}

/* =====================================================
   QUALIFICATIONS & EXPERIENCE
===================================================== */
let qualificationCount = 0;
function addQualification(){
    qualificationCount++;
    const id = qualificationCount;
    const card = document.createElement("div");
    card.className = "dynamic-card";
    card.dataset.id = id;
    card.innerHTML = `
        <button type="button" class="remove-btn">Remove</button>
        <h4>Qualification ${id}</h4>
        <label>Qualification / Course</label><input class="qualification-name" placeholder="Diploma in IT">
        <label>Institute</label><input class="qualification-institute" placeholder="Institute name">
        <label>Year</label><input class="qualification-year" placeholder="2025">
        <label>Result / Grade</label><input class="qualification-result" placeholder="Distinction / A / Completed">
    `;
    const forms = document.getElementById("qualificationForms");
    if(forms) forms.appendChild(card);

    card.querySelector(".remove-btn").addEventListener("click", function(){
        card.remove(); updateQualifications();
    });
    card.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", updateQualifications);
    });
    updateQualifications();
}

function updateQualifications(){
    const container = document.getElementById("qualificationPreview");
    if(!container) return;
    container.innerHTML = "";
    
    const cards = document.querySelectorAll("#qualificationForms .dynamic-card");
    cards.forEach(card => {
        const name = card.querySelector(".qualification-name").value.trim();
        const institute = card.querySelector(".qualification-institute").value.trim();
        const year = card.querySelector(".qualification-year").value.trim();
        const result = card.querySelector(".qualification-result").value.trim();

        if(!name && !institute && !year && !result) return;

        const preview = document.createElement("div");
        preview.className = "dynamic-preview";
        
        const title = document.createElement("h4");
        title.textContent = name || "Qualification";
        
        const meta = document.createElement("div");
        meta.className = "preview-meta";
        
        if(institute) { const s = document.createElement("span"); s.textContent = institute; meta.appendChild(s); }
        if(year) { const s = document.createElement("span"); s.textContent = year; meta.appendChild(s); }
        if(result) { const s = document.createElement("span"); s.textContent = result; meta.appendChild(s); }
        
        preview.appendChild(title);
        if(meta.children.length) preview.appendChild(meta);
        container.appendChild(preview);
    });
    hideIfEmpty("qualificationCvSection", container.textContent);
}

let experienceCount = 0;
function addExperience(){
    experienceCount++;
    const id = experienceCount;
    const card = document.createElement("div");
    card.className = "dynamic-card";
    card.dataset.id = id;
    card.innerHTML = `
        <button type="button" class="remove-btn">Remove</button>
        <h4>Experience ${id}</h4>
        <label>Job / Position</label><input class="experience-title" placeholder="Web Developer">
        <label>Company</label><input class="experience-company" placeholder="Company name">
        <label>Duration</label><input class="experience-duration" placeholder="2024 - 2025">
        <label>Description</label><textarea class="experience-description" placeholder="Describe your work..."></textarea>
    `;
    const forms = document.getElementById("experienceForms");
    if(forms) forms.appendChild(card);

    card.querySelector(".remove-btn").addEventListener("click", function(){
        card.remove(); updateExperiences();
    });
    card.querySelectorAll("input,textarea").forEach(input => {
        input.addEventListener("input", updateExperiences);
    });
    updateExperiences();
}

function updateExperiences(){
    const container = document.getElementById("experiencePreview");
    if(!container) return;
    container.innerHTML = "";
    
    const cards = document.querySelectorAll("#experienceForms .dynamic-card");
    cards.forEach(card => {
        const title = card.querySelector(".experience-title").value.trim();
        const company = card.querySelector(".experience-company").value.trim();
        const duration = card.querySelector(".experience-duration").value.trim();
        const description = card.querySelector(".experience-description").value.trim();

        if(!title && !company && !duration && !description) return;

        const preview = document.createElement("div");
        preview.className = "dynamic-preview";
        
        const heading = document.createElement("h4");
        heading.textContent = title || "Experience";
        
        const meta = document.createElement("div");
        meta.className = "preview-meta";
        
        if(company){ const s = document.createElement("span"); s.textContent = company; meta.appendChild(s); }
        if(duration){ const s = document.createElement("span"); s.textContent = duration; meta.appendChild(s); }
        
        preview.appendChild(heading);
        if(meta.children.length) preview.appendChild(meta);
        
        if(description){
            const paragraph = document.createElement("p");
            paragraph.textContent = description;
            preview.appendChild(paragraph);
        }
        container.appendChild(preview);
    });
    hideIfEmpty("experienceCvSection", container.textContent);
}

/* =====================================================
   SKILLS, LANGUAGES, SOCIAL & HOBBIES
===================================================== */
function formatList(id, value) {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = "";
    
    const items = value.split('\n').filter(item => item.trim() !== "");
    if (items.length > 0) {
        const ul = document.createElement("ul");
        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.trim();
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }
}

function updateSkills(){
    const value = getValue("skills");
    formatList("cvSkills", value);
    hideIfEmpty("skillsSideSection", value);
}

function updateLanguages(){
    const value = getValue("languages");
    formatList("cvLanguages", value);
    hideIfEmpty("languagesSideSection", value);
}

function updateSocials(){
    const linkedin = getValue("linkedin");
    const portfolio = getValue("portfolio");
    
    setText("cvLinkedin", linkedin);
    setText("cvPortfolio", portfolio);
    
    hideIfEmpty("socialSideSection", linkedin + portfolio);
}

function updateHobbies(){
    const value = getValue("hobbies");
    formatList("cvHobbies", value);
    hideIfEmpty("hobbiesSideSection", value);
}

function updateReferences(){
    const value = getValue("references");
    setText("cvReferences", value);
    hideIfEmpty("referencesCvSection", value);
}

/* =====================================================
   PHOTO UPLOAD
===================================================== */
const photoInput = document.getElementById("photo");

if (photoInput) {
    photoInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (!file) return;

        // Only allow JPG and PNG
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(file.type)) {
            alert("JPG හෝ PNG image එකක් පමණක් upload කරන්න.");
            photoInput.value = "";
            return;
        }

        // Maximum file size: 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert("Photo එක 2MB ට වඩා අඩු විය යුතුයි.");
            photoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const src = e.target.result;

            const preview = document.getElementById("photoPreview");
            const cvPhoto = document.getElementById("cvPhoto");
            const photoText = document.getElementById("photoText");

            if (preview) {
                preview.src = src;
                preview.style.display = "block";
            }

            if (photoText) {
                photoText.style.display = "none";
            }

            if (cvPhoto) {
                cvPhoto.src = src;
            }
        };

        reader.readAsDataURL(file);
    });
}

/* =====================================================
   COLOR & THEMES
===================================================== */
function changeColor(color){
    document.documentElement.style.setProperty("--primary", color);
    const cv = document.getElementById("cv");
    if(cv) cv.style.setProperty("--cv-primary", color);
    
    document.querySelectorAll(".color-btn").forEach(button => {
        button.classList.remove("active");
        if(button.dataset.color === color) button.classList.add("active");
    });
}

document.querySelectorAll(".color-btn").forEach(button => {
    button.addEventListener("click", () => changeColor(button.dataset.color));
});

const customColor = document.getElementById("customColor");
if(customColor){
    customColor.addEventListener("input", event => changeColor(event.target.value));
}

document.querySelectorAll(".theme-btn").forEach(button => {
    button.addEventListener("click", function(){
        const theme = button.dataset.theme;
        const cv = document.getElementById("cv");
        if(!cv) return;
        
        cv.classList.remove("modern", "classic", "minimal", "elegant", "corporate", "creative");
        cv.classList.add(theme);
        
        document.querySelectorAll(".theme-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

/* =====================================================
   EVENT LISTENERS & INIT
===================================================== */
const inputs = document.querySelectorAll(".editor input:not([type='file']):not([type='color']), .editor textarea");
inputs.forEach(input => {
    input.addEventListener("input", function(){
        updatePersonal(); updateProfile(); updateAL(); updateOL(); 
        updateSkills(); updateLanguages(); updateSocials(); 
        updateHobbies(); updateReferences();
    });
});

const addQualBtn = document.getElementById("addQualification");
if(addQualBtn) addQualBtn.addEventListener("click", addQualification);

const addExpBtn = document.getElementById("addExperience");
if(addExpBtn) addExpBtn.addEventListener("click", addExperience);

const printBtn = document.getElementById("printBtn");
if(printBtn) printBtn.addEventListener("click", () => window.print());

/* PDF Modal Logic */
const pdfHelpBtn = document.getElementById("pdfHelpBtn");
const pdfModal = document.getElementById("pdfModal");
const closePdfModal = document.getElementById("closePdfModal");
const closePdfModalBottom = document.getElementById("closePdfModalBottom");

function openPdfHelp(){ if(pdfModal){ pdfModal.classList.add("open"); document.body.style.overflow = "hidden"; } }
function closePdfHelp(){ if(pdfModal){ pdfModal.classList.remove("open"); document.body.style.overflow = ""; } }

if(pdfHelpBtn) pdfHelpBtn.addEventListener("click", openPdfHelp);
if(closePdfModal) closePdfModal.addEventListener("click", closePdfHelp);
if(closePdfModalBottom) closePdfModalBottom.addEventListener("click", closePdfHelp);
if(pdfModal) pdfModal.addEventListener("click", event => { if(event.target === pdfModal) closePdfHelp(); });
document.addEventListener("keydown", event => { if(event.key === "Escape") closePdfHelp(); });

/* INIT */
updatePersonal(); updateProfile(); updateAL(); updateOL(); 
updateSkills(); updateLanguages(); updateSocials(); updateHobbies(); updateReferences();
addQualification(); addExperience();
