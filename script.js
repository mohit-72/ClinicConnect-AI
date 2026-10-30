
// =====================================
// CLINICCONNECT AI
// APPOINTMENT MANAGEMENT SYSTEM
// =====================================

const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("patientName").value.trim();
  const email = document.getElementById("patientEmail").value.trim();
  const date = document.getElementById("appointmentDate").value;
  const doctor = document.getElementById("doctor").value;

  // Validate form fields
  if (!name || !email || !date || !doctor) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  // Validate appointment date
  const selectedDate = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    formMessage.textContent = "Please select a future date.";
    return;
  }

  // Get existing appointments
  let appointments = [];

  try {
    appointments = JSON.parse(
      localStorage.getItem("clinicAppointments") || "[]"
    );

    if (!Array.isArray(appointments)) {
      appointments = [];
    }
  } catch (error) {
    console.error("Unable to read appointment records:", error);
    formMessage.textContent = "Unable to access appointment storage.";
    return;
  }

  // Create new appointment
  const newAppointment = {
    id: Date.now(),
    name: name,
    email: email,
    date: date,
    doctor: doctor,
    status: "Pending",
    submittedAt: new Date().toISOString()
  };

  // Save appointment
  appointments.push(newAppointment);

  try {
    localStorage.setItem(
      "clinicAppointments",
      JSON.stringify(appointments)
    );
  } catch (error) {
    console.error("Unable to save appointment:", error);
    formMessage.textContent = "Unable to save your request.";
    return;
  }

  formMessage.textContent =
    `Thank you ${name}! Your demo appointment request has been saved successfully.`;

  appointmentForm.reset();
});


// =====================================
// CLINIC FAQ ASSISTANT
// =====================================

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function getBotResponse(question) {

  const text = question.toLowerCase();

  if (
    text.includes("timing") ||
    text.includes("hours") ||
    text.includes("open")
  ) {
    return "Our demo clinic hours are Monday to Saturday, 9 AM to 6 PM.";
  }

  if (
    text.includes("appointment") ||
    text.includes("book")
  ) {
    return "You can request an appointment using the appointment form on our website.";
  }

  if (text.includes("doctor")) {
    return "Our demo clinic has Dr. Rahul Sharma (General Physician) and Dr. Priya Mehta (Cardiology).";
  }

  if (
    text.includes("location") ||
    text.includes("address")
  ) {
    return "This is a demo clinic website. A real clinic address has not been configured.";
  }

  if (
    text.includes("service") ||
    text.includes("treatment")
  ) {
    return "Our listed demo services include general consultation, heart health information and health guidance.";
  }

  return "I can help with clinic timings, doctors, services and appointment requests. Please try asking about one of these topics.";
}


// Handle chatbot messages

chatForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const question = chatInput.value.trim();

  if (!question) return;

  // Display user message
  const userMessage = document.createElement("p");

  userMessage.className = "user-message";
  userMessage.textContent = question;

  chatMessages.appendChild(userMessage);

  // Generate bot response
  const botMessage = document.createElement("p");

  botMessage.className = "bot-message";
  botMessage.textContent = getBotResponse(question);

  chatMessages.appendChild(botMessage);

  // Clear input
  chatInput.value = "";

  // Scroll to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;

});
