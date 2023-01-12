export function hashRepostsNumber(posts){
    const hashTable= {};
    posts.forEach((post) => hashTable[post["post_id"]] = post["total_reposts"]);
    return hashTable;
}