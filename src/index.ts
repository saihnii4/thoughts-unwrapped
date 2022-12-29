import anime from "animejs";
import barba from "@barba/core";
import { absrand, err } from "./utils";

interface AnimatedSpan {
  innerHTML: string;
  className: string;
  animate: (self: HTMLSpanElement & AnimatedSpan) => void;
}

window._transition = () => barba.go("./spotify.html"); // idk man

window.onload = () => {
  const el = document.getElementById("sample");
  if (!el) return err("Bruh!");

  const letters = Array.from("Thoughts Wrapped").map((ltr) =>
    Object.assign(document.createElement("span"), {
      textContent: ltr,
      className: "_ltr",
      animate: (self: HTMLSpanElement & AnimatedSpan) => {
        const theta = absrand(90);
        const [_trans_x, _trans_y] = [absrand(1000), Math.random() * 200 + 100];
        anime({
          targets: self,
          easing: "easeInQuad",
          duration: 1500,
          rotate: `${theta}deg`,
          opacity: 0,
          translateX: _trans_x,
          translateY: _trans_y,
          direction: "reverse",
          changeComplete: () => {
            console.log("bruh")
            anime({
              targets: "#开始",
              opacity: 1, 
              translateY: -100,
              duration: 10000,
              direction: "reverse"
            });
          },
        });
      },
    })
  );

  const aggregate = letters.map((letter) => {
    const _shadow = <HTMLSpanElement>letter.cloneNode(true);
    _shadow.className = "";
    _shadow.style.visibility = "hidden";
    const _div = Object.assign(document.createElement("div"), {
      className: "_ltr_container",
    });

    if (letter.innerHTML === " ") _div.style.marginRight = "16px"; // b r u h
    _div.append(letter);
    _div.append(_shadow);
    return _div;
  });

  el.append(...aggregate);

  letters.forEach((ltr) => ltr.animate(ltr));
};

barba.init({
  transitions: [
    {
      name: "intro",
      beforeLeave: console.log,
      leave: (data) => {
        console.log(data);
      },
      // from: {
      //   namespace: ['intro']
      // }
    },
  ],
});
