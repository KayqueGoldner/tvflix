const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION!,
  }
};

export const fetcher = (url: string) => 
  fetch(url, { ...options, next: { revalidate: 18000 } }).then(res => res.json());