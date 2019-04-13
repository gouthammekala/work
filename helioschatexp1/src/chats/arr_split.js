    // Driver Code


    function findSplitPoint(arr,n) {
    let leftSum = 0;

    // traverse array element
    for (var i = 0; i < n; i++) {

        leftSum += arr[i];

        // find sum of rest array
        // elements (rightSum)
        var rightSum = 0;
        for (let j = i + 1; j < n; j++) {
        rightSum += arr[j];
        }
        // split point index
        if (leftSum == rightSum+1) {
            // console.log(arr,n);
        return i+1;
        }
    }
        return -1;
 
    }

    var arr = [1, 2, 3, 4, 5, 6,7,8,9,10];
    var n = arr.length;
    //console.log(n);
    printTwoParts(arr, n);

    function printTwoParts(arr, n) {
    var splitPoint = findSplitPoint(arr, n);
    console.log(arr,splitPoint);
    if (splitPoint == -1 || splitPoint == n) {
        return null;
    }
    var p1 = arr.slice(0,splitPoint);
    var p2 = arr.slice(splitPoint);
    printTwoParts(p1,p1.length);
    printTwoParts(p2,p2.length);

    /*
    for (let i = 0; i < n; i++) {
        if (splitPoint == i) {
        console.log(arr[i], " ");
        }
    }
    */
    }
