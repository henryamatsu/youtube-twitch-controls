let video;
const findVideo = setInterval(() => {
    video = document.querySelector('video');
    if (video) {
        clearInterval(findVideo)
    };
}, 500);

const site = window.location.host;

document.addEventListener('keydown', e => {
    if (!(e.target.localName === 'input'
    && e.target.type !== 'range')
    && e.target.id !== 'contenteditable-root'
    ) {

        if (site === 'www.twitch.tv') {
            if (e.code === 'Space') {
                e.preventDefault();
                e.stopImmediatePropagation();
    
                video.paused ? video.play() : video.pause();
            }

            if (e.code === 'ArrowRight') {
                e.preventDefault();
                e.stopImmediatePropagation();

                video.currentTime + 5 > video.duration
                ? video.currentTime = video.duration
                : video.currentTime += 5; 
            }

            if (e.code === 'ArrowLeft') {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                video.currentTime - 5 < 0
                ? video.currentTime = 0
                : video.currentTime -= 5; 
            }

            if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                if (document.activeElement.localName !== 'input') {
                    e.preventDefault();
                }

                const sliders = document.querySelectorAll('.ScRangeInput-sc-q01wc3-0.iYcBIB.tw-range');
                sliders[0].focus();

                sliders.forEach(e => e.setAttribute('step', .05));
            }
        }
        else {

            if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
                if (!document.activeElement.classList.contains('ytp-progress-bar')) {
                    e.preventDefault();
                }

                const runtime = document.querySelector('.ytp-progress-bar');
                runtime.focus();
            }

            if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                if (!document.activeElement.classList.contains('ytp-volume-panel')) {
                    e.preventDefault();
                }

                const volume = document.querySelector('.ytp-volume-panel');
                volume.focus();
            }
        }
    }
}, {capture: true})

if (site === 'www.twitch.tv') {
    const videoDiv = document.querySelector('.InjectLayout-sc-1i43xsx-0.click-handler.fjEAlz')
    videoDiv.style.cursor = 'pointer';
    videoDiv.addEventListener('click', () => video.pause());
}