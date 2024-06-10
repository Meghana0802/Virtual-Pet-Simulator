// Initail variables
let happy = 50; // Initial happiness level
let hunger = 50; // Initial hunger level
let energy = 40; // Initial energy level
let toggle = false;
let bowlDisplayed = false;
let ballDisplayed = false;
let instructions =
  "Welcome to Virtual Pet Simulator! Take care of your virtual pet by feeding, playing, and putting it to sleep.";

let feedInstruction =
  "Feed: Click the 'Feed' button to feed your pet. This will decrease hunger, increase happiness, and decrease energy.";

let playInstruction =
  "Play: Click the 'Play' button to play with your pet. This will increase hunger, decrease happiness, and decrease energy.";

let sleepInstruction =
  "Sleep: Click the 'Sleep' button to put your pet to sleep. This will decrease hunger, decrease happiness, and increase energy.";

let finalInstruction =
  "Keep an eye on your pet's hunger, happiness, and energy levels to ensure it stays healthy and happy!";

// Toggle-button
let toggleButton = document.getElementById("toggle-button");

//popup variables
var popUp = document.getElementById("popUp");
var popupHeading = document.getElementById("popupHeading");
var popupInnerContent = document.getElementById("popupInnerContent");
var popupButton = document.getElementById("popupButton");

//Function for showing a popup
function showPopup(heading, content, buttonValue) {
  popupHeading.textContent = heading;
  popupInnerContent.textContent = content;
  popupButton.textContent = buttonValue;

  popUp.style.display = "block";

  popupButton.addEventListener("click", () => {
    popUp.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial popup-1
  showPopup("Start Game", instructions, "start game");

  popupButton.addEventListener("click", () => {
    // Inital popup-2
    showPopup("FEED BUTTON", feedInstruction, "NEXT");

    popupButton.addEventListener("click", () => {
      // Initial popup-3
      showPopup("PLAY BUTTON", playInstruction, "NEXT");

      popupButton.addEventListener("click", () => {
        // Inital popup-4
        showPopup("SLEEP BUTTON", sleepInstruction, "LET'S GO");
      });
    });
  });
});

// Register event listener for feed button
document
  .getElementById("feed-button")
  .addEventListener("click", performFeedFunction);

// Register event listener for play button
document
  .getElementById("play-button")
  .addEventListener("click", performPlayFunction);

// Register event listener for sleep button
document
  .getElementById("sleep-button")
  .addEventListener("click", performSleepFunction);

// Function to perform feeding
function performFeedFunction() {
  // Check if the bowl is not already displayed
  if (!bowlDisplayed) {
    document.getElementById("dog-image").classList.remove("dog-running");

    document.getElementById("dog-image").src = "./images/Hungry.png"; 
    document.getElementById("dog-image").classList.add("dog-center");
    let bowlImage = document.createElement("img");
    bowlImage.src = "./images/Food_icon.png";
    bowlImage.classList.add("food-bowl");
    document.querySelector(".ground").prepend(bowlImage); // Display food bowl
    bowlDisplayed = true;
  }
  hunger -= 10; // Decrease hunger after feeding
  energy -= 10; // Consume energy during feeding
  happy += 10; // Increase happiness after feeding

  // Update attribute values in HTML
  updateAttributes();

  // Remove the ball image if it's displayed
  if (ballDisplayed) {
    document
      .querySelector(".ground")
      .removeChild(document.querySelector(".dog-ball"));
    ballDisplayed = false;
  }

  //Check the levels
  energyLevel();
  hungerLevel();
  happinessLevel();

  //check Achievements
  checkAchievements();
}

// Function to perform playing
function performPlayFunction() {
  // Check if the ball is not already displayed
  if (!ballDisplayed) {
    document.getElementById("dog-image").src = "./images/Happy.png"; // Change dog image to happy
    let ballImage = document.createElement("img");
    ballImage.src = "./images/Dog_ball.png";
    ballImage.classList.add("dog-ball");
    document.querySelector(".ground").append(ballImage); // Display ball
    ballDisplayed = true;
  }
  document.getElementById("dog-image").src = "./images/Playing.png"; // Change dog image to playing
  document.getElementById("dog-image").classList.add("dog-running"); // Add running animation to dog

  energy -= 20; // Consume more energy while playing
  hunger += 10; // Increase hunger while playing
  happy -= 5; // Slightly decrease happiness after playing

  // Update attribute values in HTML
  updateAttributes();

  // Remove the food bowl if it's displayed
  if (bowlDisplayed) {
    document
      .querySelector(".ground")
      .removeChild(document.querySelector(".food-bowl"));
    bowlDisplayed = false;
  }

  //Check the levels
  energyLevel();
  hungerLevel();
  happinessLevel();

  //check Achievements
  checkAchievements();
}

// Function to perform sleeping
function performSleepFunction() {
  // Remove the running animation class from the dog image
  document.getElementById("dog-image").classList.remove("dog-running");

  // Change dog image to sleepy
  document.getElementById("dog-image").src = "./images/Sleepy.png";
  document.getElementById("dog-image").classList.add("dog-center");
  energy += 20; // Increase in energy while sleeping
  happy -= 10; // Happiness decrease a little bit while sleeping
  hunger -= 10; // Hunger also decreases while sleeping

  // Update attribute values in HTML
  updateAttributes();

  // Remove the ball image if it's displayed
  if (ballDisplayed) {
    document
      .querySelector(".ground")
      .removeChild(document.querySelector(".dog-ball"));
    ballDisplayed = false;
  }

  // Remove the food bowl if it's displayed
  if (bowlDisplayed) {
    document
      .querySelector(".ground")
      .removeChild(document.querySelector(".food-bowl"));
    bowlDisplayed = false;
  }

  //Check the levels
  energyLevel();
  hungerLevel();
  happinessLevel();

  //check Achievements
  checkAchievements();
}

// Function to update attribute values in HTML
function updateAttributes() {
  // Ensure attributes stay within bounds (0-100)
  hunger = Math.max(0, Math.min(100, hunger));
  energy = Math.max(0, Math.min(100, energy));
  happy = Math.max(0, Math.min(100, happy));

  // Update attribute values in HTML
  document.getElementById("hunger-value").textContent = `${hunger}`;
  document.getElementById("happiness-value").textContent = `${happy}`;
  document.getElementById("energy-value").textContent = `${energy}`;
}

// Function to check the range of energy levels
function energyLevel() {
  if (energy == 0) {
    showPopup(
      `Energy:${energy}`,
      "There are no energy levels.Put the dog to sleep.",
      "OK"
    );
  }
}

// Function to check the range of hunger levels
function hungerLevel() {
  if (hunger == 100) {
    showPopup(
      `Hunger:${hunger}`,
      "The huner levels are high.Feed the dog.",
      "OK"
    );
  }
}

// Function to check the happiness levels
function happinessLevel() {
  if (happy == 0) {
    showPopup(
      `Happiness:${happy}`,
      "The happiness levels are low.Feed the dog.",
      "OK"
    );
  }
}

// Define achievements and rewards
let diamonds = 0;
let fireBadge = 0;
let prevHunger = 100;
let prevhappiness = 50;

function checkAchievements() {
  if (happy - prevhappiness >= 40) {
    // Display achievement unlocked message
    showPopup(
      `Diamond unlocked`,
      "You have continually increased the happiness!",
      "OK"
    );
    diamonds += 1;
    document.getElementById("points").textContent = `${diamonds}`;
    if (diamonds % 3 == 0) {
      fireBadge += 1;
      document.getElementById("badges").textContent = `${fireBadge}`;
      showPopup(`New badge Unlocked`, "Congratulations!", "OK");
    }
    prevhappiness = happy;
  }
  if (hunger == 0 && prevHunger > 0) {
    // Display achievement unlocked message
    showPopup(`Diamond unlocked`, "Your pet is no more hungry!", "OK");
    diamonds += 1;
    document.getElementById("points").textContent = `${diamonds}`;
    if (diamonds % 3 == 0) {
      fireBadge += 1;
      document.getElementById("badges").textContent = `${fireBadge}`;
      showPopup(`New badge Unlocked`, "Congratulations!", "OK");
    }
  }
  prevHunger = hunger;
}

/*  Register event for toggle button */
toggleButton.addEventListener("click", () => {
  if (toggleButton.textContent === "Night Mode") {
    toggleButton.textContent = "Day Mode";
    document.querySelector(".sky").style.backgroundColor = "#02022b";
    document.querySelector(".fa-frown").style.color = "#c9c9f4";
    let sun = document.querySelector(".sun");
    if (sun) {
      sun.classList.remove("sun");
      sun.classList.add("moon");
    }
    let ground = document.querySelector(".ground");
    if (ground) {
      ground.style.backgroundColor = "#014101";
    }
    document.querySelector(".hunger").style.color = "#ffffff";
    document.querySelector(".happiness").style.color = "#ffffff";
    document.querySelector(".energy").style.color = "#ffffff";
    toggleButton.style.background = "linear-gradient(to bottom right, #00FF00, #008000)";
  } else if (toggleButton.textContent === "Day Mode") {
    toggleButton.textContent = "Night Mode";
    document.querySelector(".sky").style.backgroundColor = "#87cefa";
    document.querySelector(".fa-frown").style.color = "#02022b";
    let sun = document.querySelector(".moon");
    if (sun) {
      sun.classList.remove("moon");
      sun.classList.add("sun");
    }
    let ground = document.querySelector(".ground");
    if (ground) {
      ground.style.backgroundColor = "greenyellow";
    }
    document.querySelector(".hunger").style.color = "#000000";
    document.querySelector(".happiness").style.color = "#000000";
    document.querySelector(".energy").style.color = "#000000";
    toggleButton.style.background = "linear-gradient(to bottom right, #04011a, #280af0)";
  }
});
