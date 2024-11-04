function showForm(type) {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear previous form
    document.getElementById('output').textContent = ''; // Clear previous output

    if (type === 'student') {
        formContainer.innerHTML = `
            <div class="form-section">
                <h2>Enter Student Details</h2>
                <form id="studentForm">
                    <label for="studentName">Name:</label>
                    <input type="text" id="studentName" name="studentName" required>

                    <label for="studentAge">Age:</label>
                    <input type="number" id="studentAge" name="studentAge" required>

                    <label for="studentCourse">Course:</label>
                    <input type="text" id="studentCourse" name="studentCourse" required>

                    <button type="button" class="convert" onclick="convertStudentToJSON()">Convert Student to JSON</button>
                </form>
            </div>
        `;
    } else if (type === 'patient') {
        formContainer.innerHTML = `
            <div class="form-section">
                <h2>Enter Patient Details</h2>
                <form id="patientForm">
                    <label for="patientName">Name:</label>
                    <input type="text" id="patientName" name="patientName" required>

                    <label for="patientAge">Age:</label>
                    <input type="number" id="patientAge" name="patientAge" required>

                    <label for="disease">Disease:</label>
                    <input type="text" id="disease" name="disease" required>

                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required>

                    <label for="severity">Severity Level:</label>
                    <select id="severity" name="severity">
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                    </select>

                    <button type="button" class="convert" onclick="convertPatientToJSON()">Convert Patient to JSON</button>
                </form>
            </div>
        `;
    } else if (type === 'file') {
        formContainer.innerHTML = `
            <div class="form-section">
                <h2>Upload a File</h2>
                <form id="fileUploadForm">
                    <label for="fileInput">Select a file (text, image, or JSON):</label>
                    <input type="file" id="fileInput" name="fileInput" accept=".txt,.json,.jpg,.jpeg,.png" required>
                    <button type="button" class="convert" onclick="handleFileUpload()">Convert to JSON</button>
                </form>
            </div>
        `;
    }
}

function convertStudentToJSON() {
    const studentName = document.getElementById('studentName').value;
    const studentAge = document.getElementById('studentAge').value;
    const studentCourse = document.getElementById('studentCourse').value;

    const studentJSON = {
        type: "Student",
        name: studentName,
        age: studentAge,
        course: studentCourse
    };

    displayOutput(studentJSON);
}

function convertPatientToJSON() {
    const patientName = document.getElementById('patientName').value;
    const patientAge = document.getElementById('patientAge').value;
    const disease = document.getElementById('disease').value;
    const location = document.getElementById('location').value;
    const severity = document.getElementById('severity').value;

    const patientJSON = {
        type: "Patient",
        name: patientName,
        age: patientAge,
        disease: disease,
        location: location,
        severity: severity
    };

    displayOutput(patientJSON);
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        displayOutput({ error: "No file selected." });
        return;
    }

    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        const fileContent = event.target.result;
        let jsonOutput;

        const fileType = file.type;

        if (fileType === "application/json") {
            try {
                jsonOutput = JSON.parse(fileContent);
            } catch (e) {
                jsonOutput = { error: "Invalid JSON format." };
            }
        } else if (fileType === "text/plain") {
            jsonOutput = { content: fileContent };
        } else if (fileType.startsWith("image/")) {
            jsonOutput = {
                fileName: file.name,
                fileType: fileType,
                fileSize: file.size,
                message: "Image files cannot be converted to JSON."
            };
        } else {
            jsonOutput = { error: "Unsupported file type." };
        }

        jsonOutput.fileType = fileType;
        jsonOutput.fileName = file.name;

        displayOutput(jsonOutput);
    };

    if (file.type === "application/json" || file.type === "text/plain") {
        fileReader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
        displayOutput({
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            message: "Image files cannot be converted to JSON."
        });
    } else {
        displayOutput({ error: "Unsupported file type." });
    }
}

function displayOutput(data) {
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(data, null, 2);
}
