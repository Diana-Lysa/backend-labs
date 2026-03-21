async function fetchGorestPosts() {
    const url = 'https://gorest.co.in/public/v2/posts';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();

        const simplifiedPosts = posts.map(post => ({
            id: post.id,
            title: post.title,
            user_id: post.user_id
        }));

        console.log(' Отримані пости:', simplifiedPosts);
        
    } catch (error) {
        console.error(' Помилка при завантаженні даних:', error.message);
    }
}

fetchGorestPosts();