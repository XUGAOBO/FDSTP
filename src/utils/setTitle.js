import {
    isiOS
} from './isAPP';

const iframeLoad = src => {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = src
    document.body.appendChild(iframe)
    iframe.addEventListener('load', function () {
        setTimeout(function () {
            iframe.remove()
        }, 0)
    })
}

const setTitle = title => {
    document.title = title;
    if (isiOS()) {
        iframeLoad('data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==');
    }
}

export default setTitle