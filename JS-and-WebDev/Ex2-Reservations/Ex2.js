const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true },
};

const checkReservation = function () {
  const input = document.getElementById("name");
  const nameInput = input.value;
  const reservationName = capitalizeFirstLetter(nameInput.toLowerCase());
  const messageElement = document.getElementById("message");

  if (reservations[reservationName]) {
    if (!reservations[reservationName].claimed) {
      messageElement.innerText = `Welcome, ${reservationName}`;
    } else {
      messageElement.innerText =
        "Hmm, someone already claimed this reservation";
    }
  } else {
    messageElement.innerText = "You have no reservation";
  }
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
