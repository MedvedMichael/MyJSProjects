const widthAndHeight = 3;
let bool = true;
startInitialization();

function startInitialization() {
    let table = document.getElementById('mainTable');
    //console.log(table);
    let tr, th;

    for (let i = 0; i < widthAndHeight; i++) {
        tr = document.createElement('tr');
        th = document.createElement('th');
        th.className = 'th';
        tr.appendChild(th);
        table.appendChild(tr);
    }

    th = document.body.querySelectorAll('.th');
    for (let i = 0; i < th.length; i++) {
        for (let j = 0; j < widthAndHeight; j++) {

            let newElement = document.createElement('input');
            newElement.className = "textInput";
            newElement.type = 'text';
            newElement.readOnly = true;
            newElement.id = 'textArea' + i + '' + (j);
            th[i].appendChild(newElement);
        }
    }

    initAllListeners();
}



function initAllListeners() {
    let inputs = document.getElementsByClassName('textInput');
    for (let i = 0; i < inputs.length; i++)
        inputs[i].addEventListener("click", function () {
            //console.log(this);
            let txt = "";
            if(this.value!='X' && this.value!='O')
            {
            if (bool) txt = 'X';
            else txt = 'O';

            this.value = txt;
            bool = !bool;
            
            let matrix = getMatrix();

            let winner = analyzeMatrix(matrix);
            if (winner != 0) {
                if (winner == 'X' || winner == 'O') {
                    alert(winner +  " is the winner!");
                } else {
                    alert("There\'s no winners :(");
                }
            }
        }
        else alert("Wrong input!");


        });


        // mainButton = ;
        document.getElementById("mainButton").addEventListener('click',function(){
            clearMatrix();
            bool=true;
        });

}

function clearMatrix()
{
    let inputs = document.getElementsByClassName('textInput');
    console.log(inputs);
    for(let i=0;i<inputs.length;i++)
    inputs[i].value='';
}


function analyzeMatrix(matrix) {
    let winner = 0;
    for (let i = 0; i < widthAndHeight; i++) {
        if (matrix[i][0].value == matrix[i][1].value && matrix[i][1].value == matrix[i][2].value && matrix[i][2].value !='') {
            winner = matrix[i][0].value;
            break;
        } else if (matrix[0][i].value == matrix[1][i].value && matrix[1][i].value == matrix[2][i].value && matrix[2][i].value !='') {
            winner = matrix[0][i].value;
            break;
        }
    }
    if (((matrix[0][0].value == matrix[1][1].value && matrix[1][1].value == matrix[2][2].value) ||
        (matrix[2][0].value == matrix[1][1].value && matrix[1][1].value == matrix[0][2].value)) && matrix[1][1].value !='') {
        winner = matrix[1][1].value;
    }

    let flag = ifMatrixHasNoPlaces(matrix);
    if (flag) winner = -1;

    return winner;
}

function ifMatrixHasNoPlaces(matrix) {
    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[0].length; j++)
            if (matrix[i][j].value == '')
                return false;
    return true;
}






function getMatrix() {
    let arr = new Array(0);
    //table = document.getElementById('table');
    let inputs = document.getElementsByClassName('textInput');
    //console.log(inputs[0])
    for (let i = 0; i < widthAndHeight; i++) {
        let line = new Array(0);
        for (let j = 0; j < widthAndHeight; j++) {
            line.push(inputs[i * widthAndHeight + j]);
        }

        arr.push(line);

    }
    return arr;
}
