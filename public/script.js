async function loadStudents() {
  try {
      const res = await fetch('http://localhost:3000/api/students');
      const data = await res.json();

      const list = document.getElementById('list');
      list.innerHTML = ''; // Clear the list before adding new items

      // Loop through the students and create list items
      data.forEach((student) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${student.id} - Name: ${student.name} - Year Level: ${student.yearLevel}`;

          // Create Update button
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.onclick = () => updateStudent(student.id);

          // Create Delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = () => deleteStudent(student.id);

          li.appendChild(updateButton);
          li.appendChild(deleteButton);

          list.appendChild(li);
      });
  } catch (error) {
      console.error('Error loading students:', error);
      alert('Failed to load students.');
  }
}

// Add a new student
async function addStudent() {
  const name = document.getElementById('name').value;
  const yearLevel = document.getElementById('yearLevel').value;

  if (!name || !yearLevel) {
      alert('Please provide both name and year level.');
      return;
  }

  try {
      const res = await fetch('http://localhost:3000/api/students', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, yearLevel }),
      });

      const data = await res.json();
      console.log('New student added:', data);
      loadStudents(); // Reload the student list after adding
  } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student.');
  }
}

// Update a student's details
async function updateStudent(id) {
  const name = prompt('Enter new name:');
  const yearLevel = prompt('Enter new year level:');

  if (!name || !yearLevel) {
      alert('Please provide both name and year level.');
      return;
  }

  try {
      const res = await fetch(`http://localhost:3000/api/students/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, yearLevel }),
      });

      const data = await res.json();
      console.log('Student updated:', data);
      loadStudents(); // Reload the student list after update
  } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student.');
  }
}

// Delete a student
async function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
      try {
          const res = await fetch(`http://localhost:3000/api/students/${id}`, {
              method: 'DELETE',
          });

          const data = await res.json();
          console.log('Student deleted:', data);
          loadStudents(); // Reload the student list after deletion
      } catch (error) {
          console.error('Error deleting student:', error);
          alert('Failed to delete student.');
      }
  }
}