/**
 * Scrolls the page smoothly to the section with the specified ID, with a 97-pixel offset from the top.
 *
 * @param {string} id - The ID of the section to scroll to.
 */
function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 97;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export default scrollToSection;
