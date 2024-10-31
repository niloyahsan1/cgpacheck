document.addEventListener("DOMContentLoaded", function () {
    var courseCountSelect = document.getElementById("courseCount");
    var courseGpaInputs = document.getElementById("courseGpaInputs");
    var hasCSE400Checkbox = document.getElementById("hasCSE400");
    var cse400GpaInput = document.getElementById("cse400GpaInput");

    // Update course GPA inputs based on selected course count
    courseCountSelect.addEventListener("change", function () {
        var courseCount = parseInt(courseCountSelect.value);
        courseGpaInputs.innerHTML = ""; // Clear previous inputs

        for (var i = 1; i <= courseCount; i++) {
            var div = document.createElement("div");
            div.innerHTML = `
                <label for="c${i}_gpa">Course ${i} GPA:</label>
                <input type="number" step="0.01" id="c${i}_gpa" name="c${i}_gpa" required>
            `;
            courseGpaInputs.appendChild(div);
        }
    });

    // Show CSE400 GPA input when checkbox is checked
    hasCSE400Checkbox.addEventListener("change", function () {
        if (hasCSE400Checkbox.checked) {
            cse400GpaInput.innerHTML = `
                <label for="cse400_gpa">CSE400 GPA:</label>
                <input type="number" step="0.01" id="cse400_gpa" name="cse400_gpa" required>
            `;
        } else {
            cse400GpaInput.innerHTML = ""; // Clear CSE400 input if unchecked
        }
    });

    document.getElementById("calculateButton").addEventListener("click", function (event) {
        event.preventDefault();

        var cdcom = parseInt(document.getElementById("cdcom").value);
        var oldcgpa = parseFloat(document.getElementById("oldcgpa").value);
        var courseCount = parseInt(courseCountSelect.value);
        var hasCSE400 = hasCSE400Checkbox.checked;

        var lastsempoints = cdcom * oldcgpa;
        var recentpoints = 0;

        // Calculate points for regular courses
        for (var i = 1; i <= courseCount; i++) {
            var courseGpa = parseFloat(document.getElementById(`c${i}_gpa`).value);
            recentpoints += 3 * courseGpa; // Assuming each course has 3 credits
        }

        // Add points for CSE400 if taken
        var newcd = courseCount * 3;
        if (hasCSE400) {
            var cse400Gpa = parseFloat(document.getElementById("cse400_gpa").value);
            recentpoints += 4 * cse400Gpa; // Assuming CSE400 has 4 credits
            newcd += 4; // Add 4 credits for CSE400
        }

        var res = lastsempoints + recentpoints;
        var FINAL = res / (cdcom + newcd);
        var CGPA = Math.round(FINAL * 100) / 100;

        var resultText = document.getElementById("resultText");
        var resultBox = document.getElementById("resultBox");

        resultText.textContent = "Your CGPA is " + CGPA;
        resultBox.style.display = "block";
    });
});
