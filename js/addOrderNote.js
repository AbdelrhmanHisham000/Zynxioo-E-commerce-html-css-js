function addOrderNote() {
    //? Start Add order Note
    // Get elements by their ID
    const addNoteBtn = document.getElementById("addNoteBtn");
    const orderNote = document.getElementById("orderNote");
    const closeNoteBtn = document.getElementById("closeNote");
  
    // Show the order note section when the "Add Order Note" button is clicked
    addNoteBtn.addEventListener("click", function () {
      orderNote.style.display = "block"; // Show the note div
    });
    // Hide the order note section when the "X" button is clicked
    closeNoteBtn.addEventListener("click", function () {
      orderNote.style.display = "none"; // Hide the note div
    });
    //? End Add order Note
  }

  addOrderNote()