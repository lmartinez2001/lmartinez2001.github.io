function updateAnimationSteps() {
  document.querySelectorAll("[data-anim]").forEach((section) => {
    const name = section.dataset.anim;
    const steps = section.querySelectorAll(".fragment.visible").length;
    section.classList.remove(
      "title-teaser", "dance-motivation", "baselines", "world-model",
      "jepa-rescue", "latent-jepa", "dataset", "inference", "music-jepa", "training-flow", "results", "comparison", "usecases",
      "step-0", "step-1", "step-2", "step-3", "step-4", "step-5", "inference-zoomed"
    );
    section.classList.add(name);
    section.classList.toggle("inference-zoomed", Boolean(section.querySelector(".inference-zoom-trigger.visible")));
    for (let i = 0; i <= steps; i += 1) {
      section.classList.add(`step-${i}`);
    }
  });
}

function restartVisibleVideos() {
  document.querySelectorAll(".present video").forEach((video) => {
    video.play().catch(() => { });
  });
}

Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  slideNumber: "c/t",
  showSlideNumber: "all",
  center: false,
  width: 1200,
  height: 750,
  margin: 0.005,
  minScale: 0.2,
  maxScale: 3.0,
  transition: "fade",
  backgroundTransition: "fade",
});

Reveal.on("ready", () => {
  updateAnimationSteps();
  restartVisibleVideos();
  updateWaveAnimation();
});
Reveal.on("slidechanged", () => {
  updateAnimationSteps();
  restartVisibleVideos();
  updateWaveAnimation();
});
Reveal.on("fragmentshown", updateAnimationSteps);
Reveal.on("fragmenthidden", updateAnimationSteps);

// Animate the wave-strip on the motivation slide with a pseudo-audio pulse.
function updateWaveAnimation() {
  // clear previous inline animations
  document.querySelectorAll('.wave-strip').forEach((ws) => {
    ws.classList.remove('wave-animate');
    ws.querySelectorAll('i').forEach((bar) => {
      bar.style.animation = '';
    });
  });

  const slide = document.querySelector('.present');
  if (!slide) return;
  // target the motivation lead strip specifically (left column)
  const wave = slide.querySelector('.motivation-lead .wave-strip, .motivation-slide .wave-strip');
  if (!wave) return;

  wave.classList.add('wave-animate');

  // randomize per-bar timing for a more organic feel
  wave.querySelectorAll('i').forEach((bar, idx) => {
    const dur = 0.9 + Math.random() * 1.2; // 0.9 - 2.1s
    const delay = -(Math.random() * 1.2);
    bar.style.animation = `motivation-wave ${dur}s ease-in-out ${delay}s infinite`;
    // provide an initial transform so layout doesn't jump
    bar.style.transform = 'scaleY(0.6)';
    bar.style.transformOrigin = 'center';
  });
}
