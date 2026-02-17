import React from 'react'

function Footer() {
  return (
    <footer className="border-t bg-background" data-testid="site-footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="copyright-text">
            © {new Date().getFullYear()} Daniel Christensen
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:contact@christensendaniel.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="email-link"
            >
              contact@christensendaniel.com
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://github.com/christensendaniel/christensendaniel.github.io" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="github-link"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
