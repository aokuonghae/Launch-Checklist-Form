window.addEventListener("load", function() {
   const form = document.getElementById("launchForm");
   const flight = document.getElementById("faultyItems");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const destination = document.getElementById("missionTarget");
         let index=Math.floor(Math.random() * json.length);
         destination.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}"></img>
            `
      });
   });

      form.addEventListener("submit", function(evt) {
         evt.preventDefault()
         let mainPilot = document.querySelector("input[name=pilotName]").value;
         let coPilot = document.querySelector("input[name=copilotName]").value;
         let fuel = document.querySelector("input[name=fuelLevel]").value;
         let massCargo = document.querySelector("input[name=cargoMass]").value;
         let houstonWeAreGo = document.getElementById("launchStatus");
         let fuelGo = true;
         let cargoGo = true;

         if (mainPilot === "" || coPilot === "" || fuel === "" || massCargo === "") {
            alert("All fields are required!");
            event.preventDefault();
         } else if (/^[a-zA-Z ]+$/.test(mainPilot) === false || /^[a-zA-Z ]+$/.test(coPilot) === false) {
            alert("Please enter a valid name");
            event.preventDefault();
         } else if (/^[0-9/.]+$/.test(fuel) === false || /^[0-9/.]+$/.test(massCargo) === false) {
            alert("Please enter a valid number");
            event.preventDefault();
         } else {
            document.getElementById("pilotStatus").innerHTML = `${mainPilot} is ready for launch`;
            document.getElementById("copilotStatus").innerHTML = `${coPilot} is ready for launch.`;
            if (fuel < 10000) {
               fuelGo = false;
               document.getElementById("fuelStatus").innerHTML = `Fuel level not enough for launch.`;
            } else {
               document.getElementById("fuelStatus").value;              
            }
            if (massCargo > 10000) {
               cargoGo = false;
               document.getElementById("cargoStatus").innerHTML = `Too much mass for launch.`;
            }else{
               document.getElementById("cargoStatus").innerHTML=`Cargo mass low enough for launch`;               
            }
            if (fuelGo === false || cargoGo === false) {
               flight.style.visibility = "visible";
               houstonWeAreGo.style.color = "red";
               houstonWeAreGo.innerHTML = `Shuttle not ready for launch`;
            } else {
               flight.style.visibility = "hidden";
               houstonWeAreGo.style.color = "green";
               houstonWeAreGo.innerHTML = `Shuttle is ready for launch`;
            }
         }  
      });
   });