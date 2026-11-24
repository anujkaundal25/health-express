import Image from "next/image";
import Link from "next/link";
import { footerServices, site } from "@/components/data/site";

export function Footer() {
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 18 }}>
              <Image className="logo-img" src="/images/logo-coin.png" alt="Health Express Ambulette logo" width={130} height={130} />
              <span>Health Express<small>AMBULETTE</small></span>
            </Link>
            <h4 style={{ marginTop: 22 }}>Follow Us</h4>
            <div className="social">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/ambuletteService">Ambulette Service Brooklyn</Link></li>
              <li><Link href="/southBrooklyn">South Brooklyn</Link></li>
              <li><Link href="/faq">F.A.Q</Link></li>
              <li><Link href="/driverForm">Apply as Driver</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>{footerServices.map((service) => <li key={service.href}><Link href={service.href}>{service.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={site.phoneHref}>📞 {site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>📧 {site.email}</a></li>
              <li><a href={site.mapLink} target="_blank" rel="noopener noreferrer">📍 {site.address.full}</a></li>
              <li>🕒 Open 24/7</li>
            </ul>
          </div>
        </div>
        <p className="tags">ambulette transportation, wheelchair assistance, private ride NYC, medicaid pickup, safe travel</p>
        <p className="copy">©{new Date().getFullYear()} {site.legalName} All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fab">
      <a href={site.whatsapp} className="fab-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>
      <a href={site.phoneHref} className="fab-call" aria-label={`Call ${site.phone}`}>📞</a>
    </div>
  );
}
