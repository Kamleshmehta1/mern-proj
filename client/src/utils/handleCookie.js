export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function delete_cookie(name) {
  if (Array.isArray(name)) {
    name.forEach((ele) => {
      document.cookie =
        ele + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    });
  } else {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
