# YTM

Just another Unofficial YouTube Music Desktop made with Electron.

## Why

Why not [ytmdesktop](https://github.com/ytmdesktop/ytmdesktop)? 
In sort: too much stuff, too much code, too much bugs.

At the time I started working on this, the ytmdesktop login wasn't working and the companionServer code looked
very unsafe.

So I made this, with only the features I needed (login and tray). As a bonus,
[no JavaScript "eval" is called](https://github.com/ytmdesktop/ytmdesktop/blob/7039e8d50e01e0133df15de7d6595f0971755a55/src/providers/infoPlayerProvider.js#L443) here.

## Features

- YouTube Music: everything that youtube music has
- Tray icon: hide the window to the system tray
- Discord integration: let your internet friends know what you listening to
- MPRIS integration: if you use Linux, enjoy a sweet and complete MPRIS integration
- Custom CSS support: you can make it match your style! Just place a css file inside `~/.config/ytm/etc/style.css`; 

## License

[MIT](./LICENSE).
