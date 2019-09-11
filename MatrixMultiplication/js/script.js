var mWidth1 = 5,
    mHeight1 = 4,
    mWidth2 = 4,
    mHeight2 = 5;
var flag = false,
    endFlag = false;
let table1 = document.getElementById('table1'),
    table2 = document.getElementById('table2'),
    endTable = document.getElementById('endTable');

initTable(table1, mWidth1, mHeight1,1);

initTable(table2, mWidth2, mHeight2,2);

initTable(endTable,mWidth2 , mHeight1,3);

let textInputMatrix1 = document.getElementById('textInputMatrix1'),
    textInputMatrix2 = document.getElementById('textInputMatrix2');

textInputMatrix1.addEventListener('input', function () {
    table1 = document.getElementById('table1');
    removeAllElementsFromTable(table1);
    removeAllElementsFromTable(endTable);
    mHeight1 = textInputMatrix1.value.split('x')[0];
    mWidth1 = textInputMatrix1.value.split('x')[1];

   // flag = false;
    initTable(table1, +mWidth1, +mHeight1,1);

    initTable(endTable,mWidth2 , mHeight1,3);
});

textInputMatrix2.addEventListener('input', function () {
    table2 = document.getElementById('table2');
    removeAllElementsFromTable(table2);
    removeAllElementsFromTable(endTable);
    

    mHeight2 = textInputMatrix2.value.split('x')[0];
    mWidth2 = textInputMatrix2.value.split('x')[1];
   // flag = true;
    initTable(table2, +mWidth2, +mHeight2,2);
    initTable(endTable,mWidth2 , mHeight1,3);
});

function removeAllElementsFromTable(table)
{
    while (table.firstChild)
    table.removeChild(table.firstChild);
}



function initTable(table, mWidth, mHeight,numberOfMatrix) {
    let tr, th;
    for (let i = 0; i < mHeight; i++) {
        tr = document.createElement('tr');
        th = document.createElement('th');
        th.className = 'th';
        table.appendChild(tr);
        tr.appendChild(th);
    }
    th = document.body.querySelectorAll('.th');


    let maxHeight;
    if (numberOfMatrix==1) {
        i = 0;
        maxHeight = mHeight;
    } else if (numberOfMatrix==2) {
        i = mHeight1;
        maxHeight = +(+(mHeight) + (+(mHeight1)));
    }
    else if(numberOfMatrix==3) {
        i=(+mHeight1)+(+(mHeight2));
        maxHeight=th.length;
    }


    for (i; i < maxHeight; i++) {
        for (let j = 0; j < mWidth; j++) {
            let newElement = document.createElement('input');
            newElement.className = "textInput";
            newElement.type = 'text';

            newElement.id = 'textArea' + i + '' + (j);
            newElement.textContent = j;
          // console.log(th[i]);
            th[i].appendChild(newElement);
            //console.log(i + 4);

        }
    }
}



let mainButton = document.body.getElementsByClassName('mainButton');
mainButton[0].addEventListener('click', function () {
    multiply();

});


function multiply() {
    if (mWidth1 == mHeight2) {
        while(endTable.firstChild)
        endTable.removeChild(endTable.firstChild);


        let matrix1 = new Array(0),
            matrix2 = new Array(0);
        let textInputs = document.body.getElementsByClassName('textInput');
        for (let i = 0; i < mHeight1; i++) {
            let arr = new Array(0);
            for (let j = 0; j < mWidth1; j++) {
                arr.push(textInputs[mWidth1 * i + j]);

            }
            matrix1[i] = arr;
        }

        for (i = 0; i < mHeight2; i++) {
            let arr = new Array(0);
            let num = 0;
            for (let j = 0; j < mWidth2; j++) {
                arr.push(textInputs[mWidth1 * mHeight1 + (mWidth2 * i + j)]);
            }
            matrix2[i] = arr;
        }
        

        let endMatrix = new Array(0);
        for (i = 0; i < mHeight1; i++) {
            let line = new Array(0);
            for (j = 0; j < mWidth2; j++) {
                let num = 0;
                for (let n = 0; n < mWidth1; n++) {
                    num += (matrix1[i][n].value) * (matrix2[n][j].value);

                }
                line.push(num);
            }
            endMatrix.push(line);
        }

        // flag=false;
        initTable(endTable,mWidth2,mHeight1,3);
        insertNumbersIntoTable(endTable,endMatrix);
        //alert('Result:\n' + printMatrix(endMatrix));
    }
}

function insertNumbersIntoTable(table,matrix)
{
   let eTable=document.querySelectorAll('.endTable');
  let th= eTable[0].getElementsByClassName('th');
  let textInputs=new Array(0);

for(let i=0;i<matrix.length;i++)
  textInputs.push(th[i].querySelectorAll('.textInput'));

  for(let i=0;i<matrix.length;i++)
  {
      for(let j=0;j<matrix[0].length;j++)
      {
          textInputs[i][j].value=matrix[i][j];
      }
  }




    console.log(textInputs);

}


function printMatrix(matrix) {
    let text = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            text += "[" + matrix[i][j] + "]";
        }
        text += "\n";
    }

    return text;
}