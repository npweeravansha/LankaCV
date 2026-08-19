/* =====================================================
   BASIC HELPERS
===================================================== */

function getValue(id){

    const element =
        document.getElementById(id);

    if(!element){
        return "";
    }

    return element.value.trim();
}


function setText(id,value){

    const element =
        document.getElementById(id);

    if(!element){
        return;
    }

    element.textContent =
        value || "";

}


function hideIfEmpty(sectionId,value){

    const section =
        document.getElementById(sectionId);

    if(!section){
        return;
    }

    if(!value || !value.trim()){

        section.classList.add(
            "is-empty"
        );

    }else{

        section.classList.remove(
            "is-empty"
        );

    }

}



/* =====================================================
   PERSONAL
===================================================== */

function updatePersonal(){

    const name =
        getValue("fullName");

    const job =
        getValue("jobTitle");


    setText(
        "cvName",
        name || "YOUR NAME"
    );


    setText(
        "cvJobTitle",
        job || "PROFESSIONAL"
    );


    setText(
        "cvPhone",
        getValue("phone")
    );


    setText(
        "cvEmail",
        getValue("email")
    );


    setText(
        "cvAddress",
        getValue("address")
    );


    setText(
        "cvDob",
        getValue("dob")
    );


    hideIfEmpty(
        "contactSection",

        getValue("phone") +
        getValue("email") +
        getValue("address")
    );


    hideIfEmpty(
        "dobSection",

        getValue("dob")
    );

}



/* =====================================================
   PROFILE
===================================================== */

function updateProfile(){

    const value =
        getValue("profile");


    setText(
        "cvProfile",
        value
    );


    hideIfEmpty(
        "profileCvSection",
        value
    );

}



/* =====================================================
   A/L
===================================================== */

function updateAL(){

    const school =
        getValue("alSchool");

    const year =
        getValue("alYear");

    const stream =
        getValue("alStream");


    setText(
        "cvAlSchool",
        school
    );


    setText(
        "cvAlYear",
        year
    );


    setText(
        "cvAlStream",
        stream
    );


    const table =
        document.getElementById(
            "alTable"
        );


    if(!table){
        return;
    }


    table.innerHTML = "";


    let hasResult = false;


    for(
        let i = 1;
        i <= 4;
        i++
    ){

        const subject =
            getValue("al" + i);

        const result =
            getValue("alr" + i);


        if(subject || result){

            hasResult = true;


            const row =
                document.createElement(
                    "tr"
                );


            const subjectCell =
                document.createElement(
                    "td"
                );


            const resultCell =
                document.createElement(
                    "td"
                );


            subjectCell.textContent =
                subject;


            resultCell.textContent =
                result;


            row.appendChild(
                subjectCell
            );


            row.appendChild(
                resultCell
            );


            table.appendChild(
                row
            );

        }

    }


    hideIfEmpty(

        "alCvSection",

        school +
        year +
        stream +
        (
            hasResult
            ? "yes"
            : ""
        )

    );

}



/* =====================================================
   O/L
===================================================== */

function updateOL(){

    const school =
        getValue("olSchool");

    const year =
        getValue("olYear");


    setText(
        "cvOlSchool",
        school
    );


    setText(
        "cvOlYear",
        year
    );


    const grid =
        document.getElementById(
            "olGrid"
        );


    if(!grid){
        return;
    }


    grid.innerHTML = "";


    const subjects = [];


    for(
        let i = 1;
        i <= 10;
        i++
    ){

        const subject =
            getValue("ol" + i);

        const result =
            getValue("olr" + i);


        if(subject || result){

            subjects.push({

                subject:subject,

                result:result

            });

        }

    }


    subjects.forEach(
        function(item){

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "ol-result-item";


            const subject =
                document.createElement(
                    "span"
                );


            const result =
                document.createElement(
                    "span"
                );


            subject.textContent =
                item.subject;


            result.textContent =
                item.result;


            div.appendChild(
                subject
            );


            div.appendChild(
                result
            );


            grid.appendChild(
                div
            );

        }
    );


    hideIfEmpty(

        "olCvSection",

        school +
        year +
        (
            subjects.length
            ? "yes"
            : ""
        )

    );

}



/* =====================================================
   QUALIFICATIONS
===================================================== */

let qualificationCount = 0;


function addQualification(){

    qualificationCount++;


    const id =
        qualificationCount;


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "dynamic-card";


    card.dataset.id =
        id;


    card.innerHTML = `

        <button
            type="button"
            class="remove-btn"
        >
            Remove
        </button>


        <h4>
            Qualification ${id}
        </h4>


        <label>
            Qualification / Course
        </label>

        <input
            class="qualification-name"
            placeholder="Diploma in IT"
        >


        <label>
            Institute
        </label>

        <input
            class="qualification-institute"
            placeholder="Institute name"
        >


        <label>
            Year
        </label>

        <input
            class="qualification-year"
            placeholder="2025"
        >


        <label>
            Result / Grade
        </label>

        <input
            class="qualification-result"
            placeholder="Distinction / A / Completed"
        >

    `;


    const forms =
        document.getElementById(
            "qualificationForms"
        );


    if(forms){

        forms.appendChild(
            card
        );

    }


    const removeButton =
        card.querySelector(
            ".remove-btn"
        );


    removeButton.addEventListener(
        "click",
        function(){

            card.remove();

            updateQualifications();

        }
    );


    card
        .querySelectorAll("input")
        .forEach(
            function(input){

                input.addEventListener(
                    "input",
                    updateQualifications
                );

            }
        );


    updateQualifications();

}



/* =====================================================
   UPDATE QUALIFICATIONS
===================================================== */

function updateQualifications(){

    const container =
        document.getElementById(
            "qualificationPreview"
        );


    if(!container){
        return;
    }


    container.innerHTML = "";


    const cards =
        document.querySelectorAll(
            "#qualificationForms .dynamic-card"
        );


    cards.forEach(
        function(card){

            const name =
                card.querySelector(
                    ".qualification-name"
                ).value.trim();


            const institute =
                card.querySelector(
                    ".qualification-institute"
                ).value.trim();


            const year =
                card.querySelector(
                    ".qualification-year"
                ).value.trim();


            const result =
                card.querySelector(
                    ".qualification-result"
                ).value.trim();


            if(
                !name &&
                !institute &&
                !year &&
                !result
            ){

                return;

            }


            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "dynamic-preview";


            const title =
                document.createElement(
                    "h4"
                );


            title.textContent =
                name || "Qualification";


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "preview-meta";


            const instituteSpan =
                document.createElement(
                    "span"
                );


            const yearSpan =
                document.createElement(
                    "span"
                );


            const resultSpan =
                document.createElement(
                    "span"
                );


            instituteSpan.textContent =
                institute;


            yearSpan.textContent =
                year;


            resultSpan.textContent =
                result;


            if(institute){

                meta.appendChild(
                    instituteSpan
                );

            }


            if(year){

                meta.appendChild(
                    yearSpan
                );

            }


            if(result){

                meta.appendChild(
                    resultSpan
                );

            }


            preview.appendChild(
                title
            );


            if(meta.children.length){

                preview.appendChild(
                    meta
                );

            }


            container.appendChild(
                preview
            );

        }
    );


    hideIfEmpty(
        "qualificationCvSection",
        container.textContent
    );

}



/* =====================================================
   EXPERIENCE
===================================================== */

let experienceCount = 0;


function addExperience(){

    experienceCount++;


    const id =
        experienceCount;


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "dynamic-card";


    card.dataset.id =
        id;


    card.innerHTML = `

        <button
            type="button"
            class="remove-btn"
        >
            Remove
        </button>


        <h4>
            Experience ${id}
        </h4>


        <label>
            Job / Position
        </label>

        <input
            class="experience-title"
            placeholder="Web Developer"
        >


        <label>
            Company
        </label>

        <input
            class="experience-company"
            placeholder="Company name"
        >


        <label>
            Duration
        </label>

        <input
            class="experience-duration"
            placeholder="2024 - 2025"
        >


        <label>
            Description
        </label>

        <textarea
            class="experience-description"
            placeholder="Describe your work..."
        ></textarea>

    `;


    const forms =
        document.getElementById(
            "experienceForms"
        );


    if(forms){

        forms.appendChild(
            card
        );

    }


    card
        .querySelector(".remove-btn")
        .addEventListener(
            "click",
            function(){

                card.remove();

                updateExperiences();

            }
        );


    card
        .querySelectorAll(
            "input,textarea"
        )
        .forEach(
            function(input){

                input.addEventListener(
                    "input",
                    updateExperiences
                );

            }
        );


    updateExperiences();

}



/* =====================================================
   UPDATE EXPERIENCE
===================================================== */

function updateExperiences(){

    const container =
        document.getElementById(
            "experiencePreview"
        );


    if(!container){
        return;
    }


    container.innerHTML = "";


    const cards =
        document.querySelectorAll(
            "#experienceForms .dynamic-card"
        );


    cards.forEach(
        function(card){

            const title =
                card.querySelector(
                    ".experience-title"
                ).value.trim();


            const company =
                card.querySelector(
                    ".experience-company"
                ).value.trim();


            const duration =
                card.querySelector(
                    ".experience-duration"
                ).value.trim();


            const description =
                card.querySelector(
                    ".experience-description"
                ).value.trim();


            if(
                !title &&
                !company &&
                !duration &&
                !description
            ){

                return;

            }


            const preview =
                document.createElement(
                    "div"
                );


            preview.className =
                "dynamic-preview";


            const heading =
                document.createElement(
                    "h4"
                );


            heading.textContent =
                title || "Experience";


            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "preview-meta";


            if(company){

                const companySpan =
                    document.createElement(
                        "span"
                    );

                companySpan.textContent =
                    company;

                meta.appendChild(
                    companySpan
                );

            }


            if(duration){

                const durationSpan =
                    document.createElement(
                        "span"
                    );

                durationSpan.textContent =
                    duration;

                meta.appendChild(
                    durationSpan
                );

            }


            preview.appendChild(
                heading
            );


            if(meta.children.length){

                preview.appendChild(
                    meta
                );

            }


            if(description){

                const paragraph =
                    document.createElement(
                        "p"
                    );


                paragraph.textContent =
                    description;


                preview.appendChild(
                    paragraph
                );

            }


            container.appendChild(
                preview
            );

        }
    );


    hideIfEmpty(
        "experienceCvSection",
        container.textContent
    );

}



/* =====================================================
   SKILLS
===================================================== */

function updateSkills(){

    const value =
        getValue("skills");


    setText(
        "cvSkills",
        value
    );


    hideIfEmpty(
        "skillsSideSection",
        value
    );

}



/* =====================================================
   LANGUAGES
===================================================== */

function updateLanguages(){

    const value =
        getValue("languages");


    setText(
        "cvLanguages",
        value
    );


    hideIfEmpty(
        "languagesSideSection",
        value
    );

}



/* =====================================================
   REFERENCES
===================================================== */

function updateReferences(){

    const value =
        getValue("references");


    setText(
        "cvReferences",
        value
    );


    hideIfEmpty(
        "referencesCvSection",
        value
    );

}



/* =====================================================
   PHOTO
===================================================== */

const photoInput =
    document.getElementById(
        "photo"
    );


if(photoInput){

    photoInput.addEventListener(
        "change",
        function(event){

            const file =
                event.target.files[0];


            if(!file){
                return;
            }


            if(
                !file.type.startsWith(
                    "image/"
                )
            ){

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(e){

                    const src =
                        e.target.result;


                    const preview =
                        document.getElementById(
                            "photoPreview"
                        );


                    const cvPhoto =
                        document.getElementById(
                            "cvPhoto"
                        );


                    if(preview){

                        preview.src =
                            src;

                        preview.style.display =
                            "block";

                    }


                    const photoText =
                        document.getElementById(
                            "photoText"
                        );


                    if(photoText){

                        photoText.style.display =
                            "none";

                    }


                    if(cvPhoto){

                        cvPhoto.src =
                            src;

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}



/* =====================================================
   COLOR
===================================================== */

function changeColor(color){

    document.documentElement
        .style
        .setProperty(
            "--primary",
            color
        );


    const cv =
        document.getElementById(
            "cv"
        );


    if(cv){

        cv.style.setProperty(
            "--cv-primary",
            color
        );

    }


    document
        .querySelectorAll(
            ".color-btn"
        )
        .forEach(
            function(button){

                button.classList.remove(
                    "active"
                );


                if(
                    button.dataset.color ===
                    color
                ){

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

}



/* =====================================================
   COLOR BUTTONS
===================================================== */

document
    .querySelectorAll(
        ".color-btn"
    )
    .forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    changeColor(
                        button.dataset.color
                    );

                }
            );

        }
    );



/* =====================================================
   CUSTOM COLOR
===================================================== */

const customColor =
    document.getElementById(
        "customColor"
    );


if(customColor){

    customColor.addEventListener(
        "input",
        function(event){

            changeColor(
                event.target.value
            );

        }
    );

}



/* =====================================================
   THEMES
===================================================== */

document
    .querySelectorAll(
        ".theme-btn"
    )
    .forEach(
        function(button){

            button.addEventListener(
                "click",
                function(){

                    const theme =
                        button.dataset.theme;


                    const cv =
                        document.getElementById(
                            "cv"
                        );


                    if(!cv){
                        return;
                    }


                    cv.classList.remove(

                        "modern",
                        "classic",
                        "minimal",
                        "elegant",
                        "corporate",
                        "creative"

                    );


                    cv.classList.add(
                        theme
                    );


                    document
                        .querySelectorAll(
                            ".theme-btn"
                        )
                        .forEach(
                            function(btn){

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );



/* =====================================================
   COMMON INPUTS
===================================================== */

const inputs =
    document.querySelectorAll(

        ".editor input:not([type='file']):not([type='color']), " +
        ".editor textarea"

    );


inputs.forEach(
    function(input){

        input.addEventListener(
            "input",
            function(){

                updatePersonal();

                updateProfile();

                updateAL();

                updateOL();

                updateSkills();

                updateLanguages();

                updateReferences();

            }
        );

    }
);



/* =====================================================
   ADD QUALIFICATION
===================================================== */

const addQualificationButton =
    document.getElementById(
        "addQualification"
    );


if(addQualificationButton){

    addQualificationButton.addEventListener(
        "click",
        addQualification
    );

}



/* =====================================================
   ADD EXPERIENCE
===================================================== */

const addExperienceButton =
    document.getElementById(
        "addExperience"
    );


if(addExperienceButton){

    addExperienceButton.addEventListener(
        "click",
        addExperience
    );

}



/* =====================================================
   PRINT / PDF
===================================================== */

const printButton =
    document.getElementById(
        "printBtn"
    );


if(printButton){

    printButton.addEventListener(
        "click",
        function(){

            window.print();

        }
    );

}



/* =====================================================
   PDF HELP MODAL
===================================================== */

const pdfHelpBtn =
    document.getElementById(
        "pdfHelpBtn"
    );


const pdfModal =
    document.getElementById(
        "pdfModal"
    );


const closePdfModal =
    document.getElementById(
        "closePdfModal"
    );


const closePdfModalBottom =
    document.getElementById(
        "closePdfModalBottom"
    );


function openPdfHelp(){

    if(pdfModal){

        pdfModal.classList.add(
            "open"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closePdfHelp(){

    if(pdfModal){

        pdfModal.classList.remove(
            "open"
        );

        document.body.style.overflow =
            "";

    }

}


if(pdfHelpBtn){

    pdfHelpBtn.addEventListener(
        "click",
        openPdfHelp
    );

}


if(closePdfModal){

    closePdfModal.addEventListener(
        "click",
        closePdfHelp
    );

}


if(closePdfModalBottom){

    closePdfModalBottom.addEventListener(
        "click",
        closePdfHelp
    );

}


if(pdfModal){

    pdfModal.addEventListener(
        "click",
        function(event){

            if(
                event.target ===
                pdfModal
            ){

                closePdfHelp();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closePdfHelp();

        }

    }
);



/* =====================================================
   INITIAL UPDATE
===================================================== */

updatePersonal();

updateProfile();

updateAL();

updateOL();

updateSkills();

updateLanguages();

updateReferences();


/*
    Start with one empty qualification
    and one empty experience.
*/

addQualification();

addExperience();
