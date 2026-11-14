document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-placeholder");

    if (headerContainer) {
        fetch("header.html")
            .then(response => {
                if (!response.ok) throw new Error("No se pudo cargar header.html");
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                // Extraemos el bloque del menú y el footer por separado
                const navHeaderWrapper = tempDiv.querySelector("#nav-header-wrapper");
                const footerEl = tempDiv.querySelector("#main-footer");

                // Insertamos header y nav arriba
                if (navHeaderWrapper) {
                    headerContainer.innerHTML = navHeaderWrapper.innerHTML;
                }

                // Insertamos el footer al final absoluta del body
                if (footerEl) {
                    document.body.appendChild(footerEl);
                }

                marcarPestanaActiva();
            })
            .catch(error => console.error("Error cargando la cabecera:", error));
    }
});

function marcarPestanaActiva() {
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const enlaces = document.querySelectorAll("nav ul li a");

    enlaces.forEach(enlace => {
        const href = enlace.getAttribute("href");
        if (href === paginaActual) {
            enlace.classList.add("active");
        }
    });
}