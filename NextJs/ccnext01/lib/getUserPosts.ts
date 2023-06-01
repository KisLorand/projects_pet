export default async function getUserPosts(userId: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: { revalidate: 60 } }); 
    //cache: 
    // force-cache is the default
    // no-store is the opposite, not store the data
    // incrementaly - ISR - Incramental Static Regeneration
    // { next: { revalidate: 60 } }
    if (!response.ok) throw undefined;
    return response.json();
}
