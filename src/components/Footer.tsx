import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { buildInquiryPath } from "@/lib/inquiry";

export function Footer() {
  return (
    <footer className="museum-site-footer">
      <div className="container">
        <div className="museum-footer-brand">
          <p className="display-title">{site.name}</p>
          <h2>Chazen is a modern Chinese tea culture experience.</h2>
          <p>
            Chazen is a modern Chinese tea culture experience designed for calm,
            connection, and self-understanding.
          </p>
          <p lang="zh-Hant">
            Chazen 是一個現代中國茶文化體驗品牌，為平靜、連結與自我理解而設。
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
            <span>AI Tea State Test</span>
            <span>Gaiwan ritual education</span>
            <span>Tea boxes and cultural gifts</span>
          </div>
          <div>
            <p>Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href={buildInquiryPath({ source: "Site footer" })}>
              Private cultural gifting inquiry
            </Link>
            <span>Instagram</span>
            <span>YouTube</span>
            <form className="museum-footer-newsletter">
              <label htmlFor="footer-email">Newsletter</label>
              <div>
                <input id="footer-email" type="email" placeholder="Email address" />
                <button type="submit">Join</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
