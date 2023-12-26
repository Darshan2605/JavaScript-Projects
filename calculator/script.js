function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

/*
In this code, we have an input field where the user can type. We have added an event listener for the onkeypress event. The isNumberKey() function checks whether the pressed key is a number key. If the pressed key is not a number key, it prevents the input by returning false. If the pressed key is a number key, it allows the input by returning true. This ensures that the user can only input numbers into the input field. */
