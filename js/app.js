(function () {

  var weightInput = document.getElementById("weight");
  var heightInput = document.getElementById("height");
  var imcForm = document.getElementById("imcForm");
  var imcResult = document.getElementById("imcResult");
  var categoryResult = document.getElementById("categoryResult");

  imcForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let w = weightInput.value;
    let h = heightInput.value;

    w = parseFloat(w);
    h = parseFloat(h);

    let result = calculateIMC(w, h);
    
    imcResult.textContent = result;

  })

  function calculateIMC(weight, height) {
    let h_2 = height * height;
    let result = weight / h_2;
    return roundDecimal(result, 2);
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


})();