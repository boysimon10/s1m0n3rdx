<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title><xsl:value-of select="/rss/channel/title" /> · RSS</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;800;900&amp;family=Geist+Mono:wght@500;600&amp;display=swap" />
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; background: #f4f3ef; color: #0b0b0b; font-family: "Schibsted Grotesk", sans-serif; -webkit-font-smoothing: antialiased; }
          main { max-width: 760px; margin: 0 auto; padding: clamp(20px, 5vw, 56px) clamp(16px, 4vw, 32px); display: flex; flex-direction: column; gap: 18px; }
          .mono { font-family: "Geist Mono", monospace; font-weight: 500; font-size: 12px; line-height: 1.4; }
          .note { background: #0b0b0b; color: #f4f3ef; padding: 14px 18px; }
          .note b { color: #ff7a70; }
          h1 { margin: 0; font-weight: 900; font-size: clamp(48px, 10vw, 84px); line-height: 0.85; letter-spacing: -0.05em; }
          h1 span { color: #e5352b; }
          .desc { margin: 0; font-size: 17px; line-height: 1.5; color: #333; }
          a { color: inherit; }
          .item { display: flex; flex-direction: column; gap: 8px; padding: 20px 22px; background: #fff; border: 3px solid #0b0b0b; text-decoration: none; }
          .item:hover { box-shadow: 6px 6px 0 #e5352b; }
          .item h2 { margin: 0; font-weight: 800; font-size: 24px; line-height: 1.1; letter-spacing: -0.02em; }
          .item p { margin: 0; font-size: 15px; line-height: 1.45; color: #333; }
          .date { color: #e5352b; }
        </style>
      </head>
      <body>
        <main>
          <p class="note mono"><b>RSS</b> · This is a feed. Copy the URL into your reader to follow new posts.</p>
          <h1><xsl:value-of select="/rss/channel/title" /><span>.</span></h1>
          <p class="desc"><xsl:value-of select="/rss/channel/description" /></p>
          <a class="mono" href="{/rss/channel/link}">← <xsl:value-of select="/rss/channel/link" /></a>
          <xsl:for-each select="/rss/channel/item">
            <a class="item" href="{link}">
              <span class="mono date"><xsl:value-of select="substring(pubDate, 6, 11)" /></span>
              <h2><xsl:value-of select="title" /></h2>
              <p><xsl:value-of select="description" /></p>
            </a>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
