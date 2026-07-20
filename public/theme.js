(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

  if (!toggle) return;

  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem("dailybit-theme");
      return saved === "light" || saved === "dark" ? saved : null;
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem("dailybit-theme", theme);
    } catch {
      // Storage can be blocked; the current page theme still changes.
    }
  };

  const applyTheme = (theme, persist = false) => {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";
    root.style.colorScheme = isLight ? "light" : "dark";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute("aria-label", isLight ? "다크 모드로 전환" : "화이트 모드로 전환");
    toggle.setAttribute("title", isLight ? "다크 모드" : "화이트 모드");

    if (themeColor) {
      themeColor.setAttribute("content", isLight ? "#ffffff" : "#0b0e13");
    }

    if (persist) saveTheme(isLight ? "light" : "dark");
  };

  applyTheme(root.dataset.theme === "light" ? "light" : "dark");

  toggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "light" ? "dark" : "light", true);
  });

  const handleSystemThemeChange = (event) => {
    if (!getSavedTheme()) applyTheme(event.matches ? "light" : "dark");
  };

  if (typeof systemTheme.addEventListener === "function") {
    systemTheme.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemTheme.addListener === "function") {
    systemTheme.addListener(handleSystemThemeChange);
  }
})();
