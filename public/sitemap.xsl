<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Pixel Maker</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #080808;
            color: #d4d4d8;
            min-height: 100vh;
          }

          header {
            background: #111111;
            border-bottom: 1px solid #27272a;
            padding: 20px 40px;
            display: flex;
            align-items: center;
            gap: 14px;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .logo {
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.02em;
          }

          .logo span {
            color: #7c3aed;
          }

          .divider {
            width: 1px;
            height: 20px;
            background: #3f3f46;
          }

          .header-label {
            font-size: 13px;
            color: #71717a;
          }

          .count-badge {
            margin-left: auto;
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 6px;
            padding: 4px 12px;
            font-size: 12px;
            color: #a1a1aa;
          }

          .count-badge strong {
            color: #e4e4e7;
          }

          main {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 24px 60px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
          }

          thead th {
            text-align: left;
            padding: 10px 16px;
            color: #52525b;
            font-weight: 500;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            border-bottom: 1px solid #1f1f22;
          }

          tbody tr {
            border-bottom: 1px solid #141417;
            transition: background 0.1s;
          }

          tbody tr:hover {
            background: #111113;
          }

          td {
            padding: 11px 16px;
            vertical-align: middle;
          }

          td a {
            color: #a78bfa;
            text-decoration: none;
            font-size: 13px;
            word-break: break-all;
          }

          td a:hover {
            color: #c4b5fd;
            text-decoration: underline;
          }

          .lastmod {
            color: #52525b;
            font-size: 12px;
            white-space: nowrap;
          }

          .freq {
            font-size: 12px;
            color: #3f3f46;
          }

          .priority {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            padding: 3px 0;
            border-radius: 5px;
            font-size: 12px;
            font-weight: 600;
          }

          .p-critical { background: #3b0764; color: #c084fc; }
          .p-high     { background: #14532d; color: #4ade80; }
          .p-med      { background: #1e3a5f; color: #60a5fa; }
          .p-low      { background: #1c1c1f; color: #52525b; }

          footer {
            text-align: center;
            padding: 32px;
            color: #3f3f46;
            font-size: 12px;
            border-top: 1px solid #141417;
          }
        </style>
      </head>
      <body>
        <header>
          <div class="logo">Pixel<span>Maker</span></div>
          <div class="divider"/>
          <span class="header-label">Sitemap XML</span>
          <div class="count-badge">
            <strong><xsl:value-of select="count(sm:urlset/sm:url)"/></strong> URLs
          </div>
        </header>

        <main>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Modificado</th>
                <th>Frecuencia</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td>
                    <a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a>
                  </td>
                  <td class="lastmod"><xsl:value-of select="sm:lastmod"/></td>
                  <td class="freq"><xsl:value-of select="sm:changefreq"/></td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sm:priority = 1.0 or sm:priority = '1'">
                        <span class="priority p-critical"><xsl:value-of select="sm:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sm:priority >= 0.8">
                        <span class="priority p-high"><xsl:value-of select="sm:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sm:priority >= 0.6">
                        <span class="priority p-med"><xsl:value-of select="sm:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority p-low"><xsl:value-of select="sm:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>

        <footer>
          pixelmaker.com.ar — Este sitemap es solo para humanos. Google lo lee en formato XML puro.
        </footer>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
