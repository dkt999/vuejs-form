export const vRipple = {
    mounted(el) {
      el.style.position = "relative";
      el.style.overflow = "hidden";
  
      el.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
  
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  
        el.appendChild(ripple);
  
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    },
};