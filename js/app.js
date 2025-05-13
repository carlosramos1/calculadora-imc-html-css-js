(function () {

  var weightInput = document.getElementById("weight");
  var heightInput = document.getElementById("height");
  var formImc = document.getElementById("imcForm");
  var imcResult = document.getElementById("imcResult");
  var categoryResult = document.getElementById("categoryResult");
  var bar = document.getElementsByClassName('colorbar')[0];

  formImc.addEventListener('submit', function(event) {
    event.preventDefault();

    let w = weightInput.value;
    let h = heightInput.value;

    w = parseFloat(w);
    h = parseFloat(h);

    let imc = calculateIMC(w, h);
    imcResult.textContent = imc;

    let category = classifyIMC(imc);
    categoryResult.textContent = category;

    fillColorBar(category);
  })

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
        bar.style.background = "var(--color-info-danger)";
        break;
      case "Peso normal":
        bar.style.background = "var(--color-info-success)";
        break;
      case "Sobrepeso":
        bar.style.background = "var(--color-info-warning)";
        break;
      case "Obesidad":
        bar.style.background = "var(--color-info-danger)";
        break;
    }
  }

})();