// Detecta URLs de vídeo do YouTube (youtu.be/<id> ou youtube.com/watch?v=<id>,
// com ou sem parâmetros extras) e devolve a URL de embed correspondente.
// Retorna null pra qualquer outra URL (arquivo de vídeo direto), pra quem
// chama decidir usar <video src> nesse caso.
export function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    let videoId: string | null = null;
    if (host === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.slice("/embed/".length);
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.slice("/shorts/".length);
      }
    }

    videoId = videoId?.split("/")[0]?.split("?")[0] ?? null;
    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
}
