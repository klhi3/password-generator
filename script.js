// *welcome user 
// alert("Welcome to Generate a Password");

// given qty, create randomly an array 
function createList(x,y){
  let z=[];
  while(x>0) {
    let ind = Math.floor(Math.random()*y.length);  
    z.push(y[ind]);
    x--; //decrease   
  }
  return z;
}

function newPassword(inputN, okListNP) {
    var totalList=[];
    
    let tmpN = inputN;
    let tmpList = okListNP;
    let total = tmpList.filter(xz => xz==true).length;
    var qty = Math.round(inputN/total);

    // Set up variable ********************************************
    // characterString:  [~`!@#$%^&*()[{]}\|;:'"]`<,>.?/-_ =+]
    var tmpSet=[];
    if (okListNP[0]) {
       tmpSet = ['~','`','!','@','#','$','%','^','&','*','(',')','[','{',']','}','\'','|',';',':','\'','"',']','`','<',',','>','.','?','/','-','_',' ','=','+'];
       totalList.push(createList(qty,tmpSet));
       tmpN -= qty;
    }
    // number array
    if (okListNP[1]) {
      tmpSet = '0123456789'.split(''); // string to array
      qty = (tmpN<qty) ? tmpN:qty;
      totalList.push(createList(qty,tmpSet));
      tmpN -= qty;
    }

    // alphabet array Uppercase Lowercase
    function genCharArray(charA, charZ) {
      let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
      for (; i <= j; ++i) {
          a.push(String.fromCharCode(i));
      }
      return a;
    }

    if (okListNP[2]) {
      tmpSet = genCharArray('a','z'); // ["a", ..., "z"]
      qty = (tmpN<qty) ? tmpN:qty;
      totalList.push(createList(qty,tmpSet));
      tmpN -= qty;
    }
    if (okListNP[3]) {
      tmpSet = genCharArray('A','Z'); // ["A", ..., "Z"]
      qty = (tmpN<qty) ? tmpN:qty;
      totalList.push(createList(qty,tmpSet));
      tmpN -= qty;
    }
    // var exceptSet = ['i', 'l', '1', 'L', 'o', '0', 'O'];

    // tmpN=0;



    //combine Lists to create merged Password String
    var finalList=[];
    
    var i = 0, j=total;  //total in (S,N,L,U)
    while (i < inputN) {
      // which one pops up first ?
      let indx = Math.floor(Math.random()*j); 
      finalList.push(totalList[indx].shift());
      if (totalList[indx].length==0){
        totalList.splice(indx, 1);
        j--;
      }
      i++;
    }

    return finalList;
  }

// validate password length input
function askNumber(){
  var n = prompt("How many characters do you want for your password? (between 8 and 128)");
  console.log("Your pick: ", n);
  
  while (n<8 || n>128) {
        if (n<8) {
            n = prompt("It's too short. Please input between 8 and 128.");
            console.log("User small pick is ",n);
        } else if(n >128) {
            n = prompt("It's too large. Please input between 8 and 128.");
            console.log("User large pick is ",n);
        }
    }
  return n;
}

function askOption(){
  let aoList = [];
  aoList.push(confirm("include Symbol?"));
  aoList.push(confirm("include Number?"));
  aoList.push(confirm("include Lowercase Character?"));
  aoList.push(confirm("include Uppercase Character?"));

  return aoList;
}

//final function to create password
function generatePassword() {
  let num = 0;
  let okList = [false,false,false,false];

  num = askNumber();
  okList[0] = confirm("include Symbol?");
  okList[1] = confirm("include Number?");
  okList[2] = confirm("include Lower Character?");
  okList[3] = confirm("include Uppercase Character?");
  
  // if there is no choice ask them 
  testList = okList;
  test = testList.filter(xz => xz==true).length;
  while (test==0){
    okList = askOption();
    testList = okList;
    test = testList.filter(xz => xz==true).length;
  }
  
  return newPassword(num, okList).join('');
 }
 

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
