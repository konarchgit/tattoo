export const blogPosts = [
    {
        id: 1,
        type: 'standard',
        title: 'MAGICAL SUGGESTIONS',
        author: 'JANET',
        date: '03/04/2018',
        category: 'INNOVATION',
        comments: 0,
        image: 'https://images.unsplash.com/photo-1510250005500-b6e9a6560934?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Quisque rutrum, aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus maecenas tempus, tellus eget condimen. Rhoncus sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante...'
    },
    {
        id: 2,
        type: 'quote',
        quote: '"PROIN GRAVIDA NIBH VEL VELIT AUCTOR ALIQUET. AENEAN SOLLICITUDIN, LOREM QUIS BIBENDUM AUCTOR, NISI ELIT CONSEQUAT IPSUM NIHIL."',
        author: 'Holden Caulfield'
    },
    {
        id: 3,
        type: 'video', // Using image placeholder for demo
        title: 'FRESHLY INKED SKIN CARE',
        author: 'JANET',
        date: '03/04/2018',
        category: 'STYLE',
        comments: 0,
        image: 'https://images.unsplash.com/photo-1542332213-31f8714b7961?auto=format&fit=crop&w=1200&q=80',
        excerpt: 'Quisque rutrum, aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus maecenas tempus, tellus eget condimen. Rhoncus sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante...'
    },
    {
        id: 4,
        type: 'link',
        title: 'PICK A TATTOO FOR YOURSELF',
        url: '#'
    }
];

export const sidebarData = {
    author: {
        name: 'PETRA WILSON',
        bio: 'Etiam quis bibendum auctor, nisi elit.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        socials: ['facebook', 'twitter', 'instagram']
    },
    categories: ['Art', 'Design', 'Innovation', 'News', 'Style'],
    latestPosts: [
        { date: '03/04/2018', title: 'Magical Suggestions' },
        { date: '03/04/2018', title: 'Skin Art Techniques' },
        { date: '03/04/2018', title: 'Freshly Inked Skin Care' },
        { date: '03/04/2018', title: 'Pick A Tattoo For Yourself' }
    ],
    tags: ['ART', 'DESIGN', 'STYLE']
};
