const startTokenRefresh = async () => {
    try {
      const response = await fetch('/api/auth/access_token', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Token refreshing error:', response.statusText);
      }
    } catch (error) {
      console.error('Token refreshing error', error);
    }
  };
  
  export default startTokenRefresh;
  