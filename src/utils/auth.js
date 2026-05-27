export const getRole = (user) => {
  return (
    user?.role || 
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  );
};

export const getUsername = (user) => {
  return (
    user?.sub ||
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  );
};