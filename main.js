
document.body.addEventListener('click', function (event) {
    if (event.target.matches('input[type="radio"][name="tipo"]')) {
        showHideResponses(event.target);
    }
});

let questions = []; // array vuoto per le domande
function showHideResponses(radioButton) {
    const questionContainer = radioButton.closest('.question-container');
    const additionalFields = questionContainer.querySelector('#additionalFields' + questions.length);

    if (radioButton.id === 'chiusa' + questions.length) {
        additionalFields.classList.remove('hidden');
    } else {
        additionalFields.classList.add('hidden');
    }
}

function addQuestion(finalQuestion) {
    // raccogli le informazioni sulla domanda dal form
    const domanda = document.getElementById('domanda' + questions.length).value;
    const aperta = document.getElementById('aperta' + questions.length).checked;
    const chiusa = document.getElementById('chiusa' + questions.length).checked;
    const punti = document.getElementById('punti' + questions.length).value;
    const risposta1 = document.getElementById('risposta1' + questions.length).value;
    const risposta2 = document.getElementById('risposta2' + questions.length).value;
    const risposta3 = document.getElementById('risposta3' + questions.length).value;
    const risposta4 = document.getElementById('risposta4' + questions.length).value;
    var solutions = document.getElementsByName('soluzione' + questions.length);
    var soluzione;
    
    for (var i = 0; i < solutions.length; i++) {
        if (solutions[i].checked) {
            soluzione = solutions[i].value;
        }
    }

    // const soluzione = document.querySelector('input[name="soluzione' + questions.length + '"]:checked').value;

    // creare un oggetto domanda
    const question = {
        "domanda": domanda,
        "aperta": aperta,
        "chiusa": chiusa,
        "punti": punti,
        // if(chiusa){
        //     "risposta1": risposta1,
        //     "risposta2": risposta2,
        //     "risposta3": risposta3,
        //     "risposta4": risposta4
        // }
        "risposta1": risposta1,
        "risposta2": risposta2,
        "risposta3": risposta3,
        "risposta4": risposta4,
        "soluzione": soluzione,
    };

    // aggiungi la domanda al array
    questions.push(question);

    // mostra le domande nel console
    console.log(questions);
    console.log(finalQuestion);
    if(!finalQuestion){
        addQuestionForm();
    }

    

    // azzera i campi del form
    // document.getElementById('domanda').value = '';
    // document.getElementById('aperta').checked = true;
    // document.getElementById('chiusa').checked = false;
    // document.getElementById('punti').selectedIndex = 0;
    // document.getElementById('risposta1').value = '';
    // document.getElementById('risposta2').value = '';
    // document.getElementById('risposta3').value = '';
    // document.getElementById('risposta4').value = '';

}


function addQuestionForm() {

    // Creare un nuovo elemento div
    const newQuestionDiv = document.createElement('div');
    newQuestionDiv.classList.add('question-container');

    // Creare un nuovo form domanda e aggiungerlo al nuovo div
    newQuestionDiv.innerHTML = `
                <div>
                    <label for="domanda">Domanda:</label>
                    <input type="text" id="domanda${questions.length}">
                </div>
        
                <div>
        <input type="radio" id="aperta${questions.length}" name="tipo" checked onclick="showHideResponses()">
        <label for="aperta">Aperta</label>
        <input type="radio" id="chiusa${questions.length}" name="tipo" onclick="showHideResponses()">
        <label for="chiusa${questions.length}">Chiusa</label>
        <label for="punti${questions.length}">Punti:</label>
        <select id="punti${questions.length}">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
    </div>
    <div id="additionalFields${questions.length}" class="hidden">
        <div>
            <label for="risposta1${questions.length}">Risposta 1:</label>
            <input type="text" id="risposta1${questions.length}">
            <input type="radio" value"0" name="soluzione${questions.length}" class="single-checkbox" id="soluzione1${questions.length}">
        </div>
        <div>
            <label for="risposta2${questions.length}">Risposta 2:</label>
            <input type="text" id="risposta2${questions.length}">
            <input type="radio" value="1" name="soluzione${questions.length}" class="single-checkbox" id="soluzione2${questions.length}">
        </div>
        <div>
            <label for="risposta3${questions.length}">Risposta 3:</label>
            <input type="text" id="risposta3${questions.length}">
            <input type="radio" value="2" name="soluzione${questions.length}" class="single-checkbox" id="soluzione3${questions.length}">
        </div>
        <div>
            <label for="risposta4${questions.length}">Risposta 4:</label>
            <input type="text" id="risposta4${questions.length}">
            <input type="radio" value="3" name="soluzione${questions.length}" class="single-checkbox" id="soluzione4${questions.length}">
        </div>
    </div>
                <div>
                    <button onclick="addQuestion(false)">Aggiungi</button>
                </div>
<script>
    $("input:checkbox").click(function(){
    if ($("input:checkbox:checked").length > 3){
      return false;
   }
});
</script>`;

    // Inserisci il nuovo div all'interno del contenitore desiderato
    const container = document.querySelector('body');
    container.appendChild(newQuestionDiv);

}



function generateJson() {//TODO: generate json file
    addQuestion(true);
    var json = JSON.stringify(questions);
    // var fs = require('fs');
    // fs.writeFile("thing.json", dictstring, function(err, result) {
    //     if(err) console.log('error', err);
    // });
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "question.json");
dlAnchorElem.click();

    console.log(json);

}



