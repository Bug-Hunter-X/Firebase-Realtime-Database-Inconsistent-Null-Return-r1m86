function fetchData(path) {
  return db.ref(path).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Validate data structure here to avoid unexpected nulls
        if (data === null || typeof data !== 'object' ){
          console.error('Unexpected null or invalid data type received from Firebase');
          return null; // or throw an error
        } 
        return data;
      } else {
        console.log('No data exists at this path');
        return null; // Explicitly return null if no data
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null; // Handle errors appropriately
    });
}

// Example usage:
fetchData('/users/uid/profile')
  .then(profile => {
    if(profile) { 
        console.log('Profile data:', profile); 
    }
  });