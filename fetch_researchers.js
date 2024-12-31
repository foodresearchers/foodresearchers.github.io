document.addEventListener('DOMContentLoaded', async function() {
  const response = await fetch('https://api.github.com/repos/sourovps/foodresearchers.github.io/contents/data');
  const files = await response.json();

  files.forEach(async file => {
    const fileResponse = await fetch(file.download_url);
    const fileContent = await fileResponse.text();
    const lines = fileContent.split('\n');
    
    const name = lines[0].split(': ')[1];
    const studentId = lines[1].split(': ')[1];
    const batch = lines[2].split(': ')[1];
    const interests = lines[3].split(': ')[1];

    const researcherCard = document.createElement('div');
    researcherCard.className = 'researcher-card';
    
    const imgElement = document.createElement('img');
    imgElement.src = `images/${studentId}.png`;  // Assuming the image is stored in the images folder
    imgElement.alt = name;
    imgElement.width = 100;

    const cardContent = document.createElement('div');
    cardContent.innerHTML = `<h3>${name}</h3>
                             <p>Student ID: ${studentId}</p>
                             <p>Batch: ${batch}</p>
                             <p>Research Interests: ${interests}</p>`;

    researcherCard.appendChild(imgElement);
    researcherCard.appendChild(cardContent);
    
    document.getElementById('researcher-cards').appendChild(researcherCard);
  });
});
