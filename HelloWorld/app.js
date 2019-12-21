var array = [7,81,12,12,3,14];



 for (var i = 0; i < array.length; i++) {
     array[i] = Math.floor(Math.random() * 100);
 }



function sort(arr) {
    if (arr.length == 1)
        return arr;

    var number = findMedianaOfArray(arr);
    var indexOfNumber;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == number) {
            indexOfNumber = i;
            break;
        }
    }

    var pointer = 0;

    for (i = 0; i < arr.length; i++) {

        if (arr[i] > number && i<indexOfNumber) {
            arr = changePlaceToEnd(arr, i);
            i--;
            indexOfNumber--;

        } else if (arr[i] < number && i>indexOfNumber) {
            arr = changePlaceToStart(arr, i);
            indexOfNumber++;

        }
        pointer++;
        if(pointer>100) break;
    }


    arr1 = new Array(indexOfNumber+1);
    for (i = 0; i < arr1.length; i++) {
        arr1[i] = arr[i];
    }
    for (i = 0; i < arr1.length; i++) {
        arr.shift();
    }

    return summarizeTwoArrays(sort(arr1), sort(arr));

}

function findMedianaOfArray(arr) {
    var number = 0;
    arr.forEach(currentItem => {
        number += currentItem;
    });
    number /= arr.length;
    var med = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (Math.abs(arr[i] - number) < Math.abs(med - number)) {
            med = arr[i];
        }
    }
    return med;

}


function puzyrik(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var p = arr[i];
                arr[i] = arr[j];
                arr[j] = p;
            }

        }
    }
    return arr;
}

function changePlaceToStart(arr, index1) {
    if (index1 != 0) {
        var firstNumber = arr[index1];

        for (var i = index1 - 1; i >= 0; i--) {
            arr[i + 1] = arr[i];

        }
        arr[0] = firstNumber;
    }
    return arr;
}

function changePlaceToEnd(arr, index1) {
    if (index1 != arr.length - 1) {
        var firstNumber = arr[index1];
        for (var i = index1 + 1; i < arr.length; i++) {
            arr[i - 1] = arr[i];
        }
        arr[arr.length - 1] = firstNumber;
    }
    return arr;
}

function summarizeTwoArrays(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++)
        arr1.push(arr2[i]);

    return arr1;
}

// changePlaceToStart(array,4);

alert(array + "\n" + sort(array));
//console.log(array + "\n" + sort(array));

//alert(findMedianaOfArray(array));