import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { COVER_FALLBACK } from "@/tools/thumbnail-tester/constants";

/**
 * @param {{
 *   cards: Array<Record<string, unknown>>,
 *   gridLoadError: string | null,
 *   blurGrid: boolean,
 *   darkMode: boolean,
 *   carouselMode: boolean,
 * }} props
 */
export function ResourceGrid({
  cards,
  gridLoadError,
  blurGrid,
  darkMode,
  carouselMode,
}) {
  return (
    <section
      className={cn(
        "market-left",
        blurGrid && "is-blurred",
        darkMode && "dark",
      )}
      aria-label={
        darkMode ? "Listing grid preview, dark mode" : "Listing grid preview"
      }
    >
      <div className="ct-ab-surface min-h-0 min-w-0 flex-1">
        <div className="resource-grid structItemContainer" data-type="resource">
          {cards.map((card) => (
            <article
              key={card.id}
              className="resource-card structItem structItem--resource structItem--resource-state-visible"
            >
              <div className="structItem--resourceInner">
                <div className="thumb-wrap structItem-cell structItem-cell--icon structItem-iconContainer">
                  <img
                    src={card.image || COVER_FALLBACK}
                    alt=""
                    className="thumb-image resourceCoverImage"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = COVER_FALLBACK;
                    }}
                  />
                  {carouselMode && card.id === "user-resource" ? (
                    <>
                      <button
                        type="button"
                        className="carousel-arrow left"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="carousel-arrow right"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  ) : null}
                  {card.salePercent ? (
                    <span className="sale-badge">{card.salePercent}% OFF</span>
                  ) : null}
                  <span className="price-badge">
                    {card.price}
                    {card.originalPrice ? (
                      <span className="old-price">{card.originalPrice}</span>
                    ) : null}
                  </span>
                </div>

                <div className="resource-body structItem-cell structItem-cell--main">
                  <h3 className="resource-title structItem-title">
                    {card.url ? (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {card.title}
                      </a>
                    ) : (
                      card.title
                    )}
                  </h3>
                  <p className="resource-subtitle structItem-minor">
                    {card.author}
                  </p>
                  <p className="resource-desc structItem-resourceTagLine">
                    {card.description}
                  </p>
                </div>
                {card.showMeta !== false ? (
                  <div className="resource-meta structItem-cell structItem-cell--resourceMeta">
                    <span className="rating ratingStarsRow ratingStarsRow--justified">
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star off" />
                      {card.reviews != null && (
                        <span>{card.reviews} ratings</span>
                      )}
                    </span>
                    {card.purchases != null && (
                      <span>{card.purchases.toLocaleString()} purchases</span>
                    )}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
