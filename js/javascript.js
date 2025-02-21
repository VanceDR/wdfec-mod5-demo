let albums = [
    {
        title: 'It All Began with Loneliness',
        artist: 'The Anchoret',
        year: '2023',
        cover: 'images/anchoret.jpg',
        review: "What made me like this album is the seamless blend of flutes, saxophone, with the heavy and melodic guitar riffs. Additionally, the transitions between heavy and soft are perfectly blended to give space and let the music breathe. What I don't like about this album is that the tones are a little bit repetitive, but the variety of instruments and the overall production of the album makes up for it.",
        score: '4',
        sample: '<iframe  width="100%" height="100%" src="https://www.youtube.com/embed/g8XhYYEPlz4?si=Kle4ymNnDN91Aq9s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        links: {
            website: 'https://www.theanchoret.com/',
            bandcamp: 'https://theanchoretofficial.bandcamp.com/album/it-all-began-with-loneliness',
            spotify: 'https://open.spotify.com/album/4Wbzq8JDJIY6g1CQI3cDrC',
            apple: 'https://music.apple.com/us/album/it-all-began-with-loneliness/1677582161',
            youtube: 'https://www.youtube.com/playlist?list=OLAK5uy_mKOWQx76BizCgsBIsVPacsaejE3VXiFmk',
        }
    },
    {
        title: 'Cool World',
        artist: 'Chat Pile',
        year: '2024',
        cover: 'images/chatpile.jpg',
        review: "Chat Pile's music embodies raw and unfiltered emotions people. The album has heavy grooves with spoken poetry lyrical delivery. What I like about this album is the textural rawness of the lyrical delivery accompanied with the heavy and groovy basslines that are accented with haunting guitars. While the album is a great listen, some of the songs seems, specifically in the middle of the album, like it is just added to fill the album.",
        score: '4',
        sample: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/h8YoyzosPDw?si=pEGL8XSYuAb7p1A-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        links: {
            website: 'https://chatpile.net/',
            bandcamp: 'https://chatpile.bandcamp.com/album/cool-world',
            spotify: 'https://open.spotify.com/album/3k7GhMNdQ0KXGkC84qVRf2',
            apple: 'https://music.apple.com/us/album/cool-world/1750294553',
            youtube: 'https://www.youtube.com/playlist?list=OLAK5uy_lVbCplKuIzME9ocBvaidVo5atObFnWadM',
        }
    },
]

function createAlbumCards(year) {
    let list = albums.filter(a => a.year == year);
    let container = document.getElementById(`${year}-list`)
    container.innerHTML = `${list.map(a => createCard(a)).join('')}`;
}

function createCard(album) {
    return `
    <div class="card">
        <div class="content items">
            <div class="card-top item">
                <div class="card-image image">
                    <img src="${album.cover}" alt="${album.title} Album Cover">
                </div>
                <div class="content">
                    <div><div class="ui rating" data-rating="${album.score}" data-max-rating="5"> </div></div>
                    <div class="album-title"><span>${album.title}</span> <span>(${album.year})</span></div>
                    <div class="album-artist"><span>${album.artist}</span></div>
                </div>
            </div>
        </div>
        <div class="extra content"><p>${album.review}</p></div>
        <div class="extra content">
            <details class="ui card-links-con" > 
                <summary style="cursor: pointer;" title="Show Links">Links</summary>
                <div class="menu text card-links">
                    ${Object.keys(album.links).map(a => `<a href="${album.links[a]}" target="_blank" class="item" title="${a} link">${a} <i class="ui icon ${a == 'website' ? 'linkify' : a}"></i></a>`).join('')}
                    ${album.sample ? ` <a data-album="${album.title}" onclick="openPopover(event, this);" target="_blank" class="item" title="sample"><i class="icon music"></i></a>` : ''}
                </div>
            </details>
        </div>
    </div>
    `
}

function openPopover(event, element) {
    event.preventDefault();
    let popover = document.getElementById('sampleMusicPopover');
    let con = document.getElementById('sampleMusicCon');
    popover.showPopover();
    con.innerHTML = albums.find(a => a.title == element.dataset.album).sample;
}

function checkBreakpoint() {
    // Check if the screen is less than 768px

    // Get the navigation element
    let navigation = document.getElementById('navigation');
    // Get the dropdown element
    let dropdown = navigation.querySelector('#top-menu');
    // Get the icon element
    let icon = dropdown.querySelector('i');
    // Get the heading element
    let nav_heading = navigation.querySelector('h1');
    // Get the menu element
    let menu = dropdown.querySelector('.menu');
    if (window.innerWidth >= 768) {
        // Set dropdown styles and classes
        dropdown.style.position = 'static';
        dropdown.style.width = 'fit-content';
        dropdown.classList.remove('floating', 'dropdown');
        dropdown.classList.add('text', 'menu')
        // Set heading styles
        nav_heading.style.margin = '0';
        // Set icon styles
        icon.style.display = 'none';
        // Set menu styles
        menu.classList.add('text')
        menu.style.gap = '1em';
        menu.querySelectorAll('.item').forEach((a) => {
            a.style.width = 'fit-content';
        });
    } else {
        // Revert dropdown styles and classes
        dropdown.style.position = 'absolute';
        dropdown.classList.add('floating', 'dropdown');
        dropdown.classList.remove('text', 'menu')
        // Revert heading styles
        nav_heading.style.margin = '0 auto';
        // Revert icon styles
        icon.style.display = '';
        // Revert menu styles
        menu.classList.remove('text')
        menu.style.gap = '0';
        menu.querySelectorAll('li').forEach((a) => {
            a.style.width = 'inherit';
        });
    }
}


function init() {
    // Get the menu element
    let menu = document.querySelector('ul.menu');
    // Add event listener to the menu anchors
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', (e) => {
        // Remove the active class from anchors with active class
        e.target.parentElement.parentElement.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
        // Add the active class to the clicked anchor
        e.target.classList.add('active');
    }));
    // Add event listener to the window resize event
    window.addEventListener('resize', checkBreakpoint);
    // Call the checkBreakpoint function
    checkBreakpoint()
    // Set Darkmode
    DarkReader.setFetchMethod(window.fetch);
    window.isDarkMode = localStorage.getItem('isDarkMode');
    if (isDarkMode == 'true') {
        DarkReader.enable();
        darkModeBtn.innerHTML = '<i class="sun icon"></i>';
    } else {
        DarkReader.disable();
        darkModeBtn.innerHTML = '<i class="moon icon"></i>';
    }
    createAlbumCards("2024")
    createAlbumCards("2023")
    $('.ui.rating')
        .rating('disable')
    ;
}

function toggleDarkMode() {
    isDarkMode = !JSON.parse(isDarkMode);
    if (isDarkMode) {
        DarkReader.enable();
        darkModeBtn.innerHTML = '<i class="sun icon"></i>';
    } else {
        DarkReader.disable();
        darkModeBtn.innerHTML = '<i class="moon icon"></i>';
    }
    localStorage.setItem('isDarkMode', isDarkMode); // Save theme preference
}

