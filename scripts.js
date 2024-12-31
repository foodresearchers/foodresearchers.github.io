document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const studentId = document.getElementById('student-id').value;
  const password = document.getElementById('password').value;
  
  // Check credentials
  if (studentId === '1807052' && password === '1807052') {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('student-profile').style.display = 'block';
  } else {
    alert('Invalid Student ID or Password!');
  }
});

document.getElementById('profile-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const name = document.getElementById('profile-name').value;
  const studentId = document.getElementById('profile-id').value;
  const batch = document.getElementById('profile-batch').value;
  const interests = document.getElementById('profile-interests').value;
  const image = document.getElementById('profile-image').files[0];

  // Check for duplicates
  const existingCard = document.querySelector(`.student-card[data-id="${studentId}"]`);
  if (existingCard) {
    alert('Student ID already exists!');
    return;
  }

  // Create a student card
  const studentCard = document.createElement('div');
  studentCard.className = 'student-card';
  studentCard.setAttribute('data-id', studentId);
  
  const imgElement = document.createElement('img');
  imgElement.src = URL.createObjectURL(image);
  imgElement.alt = name;
  imgElement.width = 100;
  
  const cardContent = document.createElement('div');
  cardContent.innerHTML = `<h3>${name}</h3>
                           <p>Student ID: ${studentId}</p>
                           <p>Batch: ${batch}</p>
                           <p>Research Interests: ${interests}</p>`;
  
  studentCard.appendChild(imgElement);
  studentCard.appendChild(cardContent);
  
  document.getElementById('student-cards').appendChild(studentCard);

  // Convert image to Base64 for upload
  const reader = new FileReader();
  reader.onloadend = async function() {
    const base64Image = reader.result.split(',')[1];

    // Send input to GitHub Actions
    const response = await fetch('https://api.github.com/repos/sourovps/foodresearchers.github.io/dispatches', {
      method: 'POST',
      headers: {
        'Authorization': 'token YOUR_GITHUB_TOKEN',  // Replace this with your actual GitHub PAT
        'Accept': 'application/vnd.github.everest-preview+json'
      },
      body: JSON.stringify({
        event_type: 'add-input',
        client_payload: {
          name: name,
          studentId: studentId,
          batch: batch,
          interests: interests,
          imageName: `${studentId}.png`,
          imageContent: base64Image
        }
      })
    });

    const result = await response.json();
    console.log(result);
  };
  reader.readAsDataURL(image);

  // Reset form
  document.getElementById('profile-form').reset();
});
