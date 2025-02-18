const handleLogin = async (values) => {
  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, values);
    localStorage.setItem('token', response.data.token);
    // Redirect or update state
  } catch (error) {
    console.error('Login failed:', error);
  }
}; 