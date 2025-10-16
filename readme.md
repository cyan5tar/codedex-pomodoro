# Focus Timer – Pomodoro App

This is a simple Pomodoro timer web app that helps you stay productive and organize your work in focused intervals.

## Features

- **Pomodoro Timer:** 25 minutes focus, 5 minutes short break, 15 minutes long break
- **Visual Progress Indicator:** Circular progress bar
- **Tab Navigation:** Easily switch between focus, short break, and long break
- **Start/Pause/Reset:** Control the timer with a single click
- **Counter:** Shows the number of completed focus sessions
- **Responsive Design:** Optimized for desktop and mobile devices (Tailwind CSS)

## Installation & Usage

1. **Download or clone:**
   ```sh
   git clone git@github.com:cyan5tar/codedex-pomodoro.git
   ```
2. **Open the `index.html` file** in your browser.

No additional dependencies or installations required.

## Files

- [`index.html`](index.html): Main HTML file with UI and Tailwind CSS integration
- [`script.js`](script.js): Contains all timer logic and interactions

## Customization

You can change the focus and break durations in the `times` object in [`script.js`](script.js):

```js
let times = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};
```

## License

This project is licensed under the MIT License.

---

Good luck with your focused work!