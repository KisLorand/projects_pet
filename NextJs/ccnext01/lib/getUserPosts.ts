export default async function getUserPosts(userId: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { cache: 'force-cache'}); // force caching is the default
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}
