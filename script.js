document.addEventListener('DOMContentLoaded', function() {
  
  fetch('db.json')
    .then(response => response.json())
    .then(dbData => {
      const comments = dbData.comments || [];
      const commentList = document.getElementById('comment-list');
      commentList.innerHTML = '';
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
      });
    })
    .catch(error => {
      console.error(error);
    });
});


document.getElementById('like-button').addEventListener('click', function() {
  alert('You liked this!');
});


document.getElementById('comment-button').addEventListener('click', function(event) {
  event.preventDefault();
  const commentInput = document.getElementById('comment-input');
  const comment = commentInput.value.trim();

  if (comment !== '') {
    
    fetch('db.json')
      .then(response => response.json())
      .then(dbData => {
        dbData.comments = dbData.comments || [];
        dbData.comments.push(comment);
        return fetch('db.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dbData)
        });
      })
      .then(() => {
        const commentList = document.getElementById('comment-list');
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
        commentInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
  }
});


document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  

  var formData = {
    username: username,
    email: email,
    broker: broker,
    age: age,
    quiz: quiz,
    answer: answer,
    bio: bio
  };

  fetch('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function(data) {
      console.log(data);

      
      fetch('db.json')
        .then(response => response.json())
        .then(dbData => {
          dbData.users.push(formData);
          return fetch('db.json', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData)
          });
        })
        .then(() => {
          var successMessage = document.getElementById('success-message');
          successMessage.textContent = 'Form submitted successfully!';
        })
        .catch(error => {
          console.error(error);
        });

      var forexRatesContainer = document.getElementById('forex-rates');
      forexRatesContainer.textContent = JSON.stringify(data);

      // ...
    })
    .catch(function(error) {
      console.error(error);
    });
});









