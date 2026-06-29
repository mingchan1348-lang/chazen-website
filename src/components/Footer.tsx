import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="museum-site-footer">
      <div className="container">
        <div className="museum-footer-brand">
          <p className="display-title">{site.name}</p>
          <h2>Tea. Return. Stillness.</h2>
          <p>
            A modern cultural tea house for ritual, origin, stillness, and meaningful gifts.
          </p>
        </div>
        <div className="museum-footer-grid">
          <div>
            <p>Explore</p>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p>Signature Focus</p>
            <span>Chinese tea culture</span>
            <span>Song restraint</span>
            <span>Meditative sound</span>
            <span>Premium gifting</span>
          </div>
          <div>
            <p>Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>Private cultural gifting by inquiry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
