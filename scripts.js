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

document.getElementById('profile-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('profile-name').value;
  const studentId = document.getElementById('profile-id').value;
  const batch = document.getElementById('profile-batch').value;
  const interests = document.getElementById('profile-interests').value;
  const image = document.getElementById('profile-image').files[0];

  // Create a student card
  const studentCard = document.createElement('div');
  studentCard.className = 'student-card';
  
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

  // Reset form
  document.getElementById('profile-form').reset();
});
