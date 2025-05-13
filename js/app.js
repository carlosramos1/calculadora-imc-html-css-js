(function () {

  var inputHeight = document.getElementById("height");
  var inputWeight = document.getElementById("weight");
  var formImc = document.getElementById("imcForm");
  var imcResult = document.getElementById("imcResult");
  var categoryResult = document.getElementById("categoryResult");
  var colorBarCategory = document.getElementsByClassName('colorbar')[0];
  var reset = document.getElementById('btnReset');
  var errorMsgHeight = document.getElementById('errorMsgHeight');
  var errorMsgWeight = document.getElementById('errorMsgWeight');

  formImc.addEventListener('submit', function(event) {
    resetStyles();
    event.preventDefault();

    let h = inputHeight.value;
    let w = inputWeight.value;
    
    /* Validations */
    var errorHeight = existsErrors(h, 3); 
    if(errorHeight){
      inputHeight.style.borderColor = "var(--color-danger)";
      errorMsgHeight.textContent = errorHeight;
    }
    
    var errorWeight = existsErrors(w, 500);
    if(errorWeight) {
      inputWeight.style.borderColor = "var(--color-danger)";
      errorMsgWeight.textContent = errorWeight;
    }

    if (!errorHeight && !errorWeight) {
      w = parseFloat(w);
      h = parseFloat(h);
      
      let imc = calculateIMC(w, h);
      imcResult.textContent = imc;
  
      let category = classifyIMC(imc);
      categoryResult.textContent = category;
  
      fillColorBar(category);
    } 
    
  });

  reset.addEventListener('click', function(e) {
    resetStyles();
    imcResult.textContent = "_";
    categoryResult.textContent = "_"
    colorBarCategory.style.background = "var(--border-color)";
  });


  function calculateIMC(weight, height) {
    let h_2 = height * height;
    let result = weight / h_2;
    return roundDecimal(result, 2);
  }

  function classifyIMC(imc) {
    let category = ""
    if (imc < 18.5) {
      category = "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
      category = "Peso normal";
    } else if (imc >= 24.9 && imc < 29.9) {
      category = "Sobrepeso";
    } else{
      category = "Obesidad";
    }
    return category;
  }

  /**
   * 
   * @param {*} num 
   * @param {*} decimales 
   * @returns El número redondeado, con los decimales indicados.
   */
  function roundDecimal(num, decimales) {
    let factor = Math.pow(10, decimales);
    return Math.round(num * factor) / factor;
  }

  function fillColorBar(category) {
    switch(category) {
      case "Bajo peso":
        colorBarCategory.style.background = "var(--color-danger)";
        break;
      case "Peso normal":
        colorBarCategory.style.background = "var(--color-success)";
        break;
      case "Sobrepeso":
        colorBarCategory.style.background = "var(--color-warning)";
        break;
      case "Obesidad":
        colorBarCategory.style.background = "var(--color-danger)";
        break;
    }
  }

  function existsErrors(value, maxValue) {
    let errorMessage = "";
    let re = /^\d{1,3}(\.\d{0,3})?$/; // is a valid number max 3 decimal
    if(value == "") {
      errorMessage = "Ingrese un valor numérico.";
    }else if(value.search(re) < 0) {
      errorMessage = "Solo se permite números positivos.";
    } else if(value < 0 || value > maxValue) {
      errorMessage = `El valor ingresado debe ser entre 0 y ${maxValue}.`
    }
    return errorMessage;
  }

  function resetStyles() {
    inputHeight.style.borderColor = "var(--border-color)"
    inputWeight.style.borderColor = "var(--border-color)";
    errorMsgHeight.textContent = "";
    errorMsgWeight.textContent = "";
    imcResult.textContent = "_"; 
    categoryResult.textContent = "_";
    colorBarCategory.style.background = "var(--border-color)";
  }

  inputHeight.addEventListener('keydown', function(e) {
    if(e.key == "Enter") {
      e.preventDefault();
      inputWeight.focus();
    }
  })

})();