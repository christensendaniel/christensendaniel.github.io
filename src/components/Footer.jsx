import React from 'react'

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Daniel Christensen
          </p>
          <a 
            href="https://github.com/christensendaniel/christensendaniel.github.io" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
