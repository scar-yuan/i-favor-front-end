function checkStrContain(i, j) {
  if (!i || !j) {
    return false;
  }
  if (i.charAt(0) != j.charAt(0)) {
    return false;
  }
  i = i.substr(1, i.length - 1);
  j = j.substr(1, j.length - 1);
  var a;
  var b;
  if (i.length > j.length) {
    a = i;
    b = j;
  } else {
    a = j;
    b = i;
  }
  var count = 0;
  for (var bi = 0; bi < b.length; bi++) {
    var bArr = b.split("");
    if (a.indexOf(bArr[bi]) != -1) {
      count++;
    } else {
      break;
    }
  }
  if (b.length == count) {
    return true;
  } else {
    return false;
  }
}

function getArrayByName(name, array, length) {
  if (array.length < 1) {
    return;
  }
  var result = [];
  for (var key in array) {
    if (checkStrContain(array[key].name, name) && result.length < length) {
      result.push(array[key]);
    }
  }
  return result;
}
