document.addEventListener("DOMContentLoaded", function () {
  var courseCountSelect = document.getElementById("courseCount");
  var courseGpaInputs = document.getElementById("courseGpaInputs");
  var hasCSE400Checkbox = document.getElementById("hasCSE400");

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

  document
    .getElementById("calculateButton")
    .addEventListener("click", function (event) {
      event.preventDefault();

      var cdcom = parseInt(document.getElementById("cdcom").value);
      var oldcgpa = parseFloat(document.getElementById("oldcgpa").value);
      var courseCount = parseInt(courseCountSelect.value);
      var hasCSE400 = hasCSE400Checkbox.checked;

      var lastsempoints = cdcom * oldcgpa;

      var recentpoints = 0;

      for (var i = 1; i <= courseCount; i++) {
        var courseGpa = parseFloat(document.getElementById(`c${i}_gpa`).value);
        var courseCredit = 3;
        if (hasCSE400 && i === courseCount) {
          courseCredit = 4; // If has CSE400 and it's the last course, set credit to 4
        }
        recentpoints += courseCredit * courseGpa;
      }

      var res = lastsempoints + recentpoints;
      var newcd = courseCount * 3;
      if (hasCSE400) {
        newcd += 1; // Add 1 additional credit if CSE400 is taken
      }

      var FINAL = res / (cdcom + newcd);
      var CGPA = Math.round(FINAL * 100) / 100;

      var resultText = document.getElementById("resultText");
      var resultBox = document.getElementById("resultBox");

      resultText.textContent = "Your CGPA is " + CGPA;
      resultBox.style.display = "block";
    });
});
