import { getStyleString } from '../../../utils/utils'

const baseStylesObj = {
    "color": "#fff",
    "font-family": "ui-sans, \"Helvetica Neue\", Arial, sans-serif",
    "text-align": "left",
}
console.log('%c-->\tJonathan\'s Chrome Extension is active', getStyleString(baseStylesObj));

// handle json responses in browser
const reformatJson = () => {
    const updateTitle = () => {
        // Create title tag
        const title = document.createElement('title');
        title.textContent = "JSON viewer | Jonathan's Chrome Extension"
        // Add it to head
        document.head.prepend(title);
    }
    const onlyPreTag = document && document.body.children.length === 1 && document.body.children[0].tagName === 'PRE' && document.body.children[0];
    if (onlyPreTag){
        let parsed;
        let formatted;
        try {
            parsed = JSON.parse(onlyPreTag.textContent)
        } catch {
            console.error(new Error(`Failed to json parse content of page with only one pre tag`));
        }
        try {
            formatted = JSON.stringify(JSON.parse(onlyPreTag.textContent), null, 2);
        } catch (err) {
            console.error(new Error(`Failed to json stringify content of page with only one pre tag`));
        }

        if (formatted && parsed){
            onlyPreTag.classList.add('prettyprint');
            onlyPreTag.textContent = formatted;
            updateTitle();

            // append scripts
            ['prettify.bundle.js'].forEach(src => {
                const script = document.createElement('script');
                script.src = chrome.runtime.getURL(src);
                document.body.appendChild(script);
            });

            // append styles
            ['prettify.css'].forEach(href => {
                const link = document.createElement('link');
                link.href = chrome.runtime.getURL(href);
                link.rel = "stylesheet";
                document.head.appendChild(link);
            });
            
            console.log(parsed);
        }
    }
}
reformatJson();

