import React from 'react'

const Footer = () => {
  return (
    <>
    <footer aria-label="Footer" style={{borderTop: '1px solid #e6e6e6'}}>
        <div style={{maxWidth: 1100, margin: '0 auto', padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                <span style={{fontWeight: 600}}>Loud City</span>
                <small style={{color: '#6b6b6b'}}>© {new Date().getFullYear()} Loud City — All rights reserved</small>
            </div>

            <nav aria-label="Footer navigation" style={{display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'}}>
                <a href="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</a>
                <a href="/about" style={{color: 'inherit', textDecoration: 'none'}}>About</a>
                <a href="/contact" style={{color: 'inherit', textDecoration: 'none'}}>Contact</a>
                <a href="/privacy" style={{color: 'inherit', textDecoration: 'none'}}>Privacy</a>
            </nav>

            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{color: 'inherit'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.53 8.53 0 0 1-2.7 1.03A4.24 4.24 0 0 0 12 8.47c0 .33.04.66.11.97A12.03 12.03 0 0 1 3.15 5.1a4.22 4.22 0 0 0-.57 2.13c0 1.48.75 2.79 1.89 3.56a4.21 4.21 0 0 1-1.92-.53v.05c0 2.06 1.47 3.78 3.42 4.17-.36.1-.74.15-1.13.15-.28 0-.55-.03-.82-.08.55 1.72 2.15 2.97 4.05 3.01A8.5 8.5 0 0 1 2 19.54 12 12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0 0 22.46 6z"/>
                    </svg>
                </a>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{color: 'inherit'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.44-4.04-1.44a3.18 3.18 0 0 0-1.34-1.77c-1.09-.74.08-.72.08-.72a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.57 2.57 0 0 1 .77-1.61c-2.67-.3-5.47-1.33-5.47-5.91a4.62 4.62 0 0 1 1.23-3.21 4.3 4.3 0 0 1 .12-3.17s1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.82.24 3.2.12 3.54a4.62 4.62 0 0 1 1.23 3.21c0 4.59-2.8 5.6-5.47 5.9a2.88 2.88 0 0 1 .82 2.24v3.32c0 .32.22.7.82.58A12 12 0 0 0 12 0z"/>
                    </svg>
                </a>
            </div>
        </div>
    </footer>

    </>
  )
}

export default Footer
